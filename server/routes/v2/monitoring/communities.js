const { Router } = require('express')
const request = require('request')
const iconv = require('iconv-lite')
const charset = require('charset')
const REQ_URL = require('../../../funcs/v2/req_url')
const PARSE_FUNCS = require('../../../funcs/v2/parse_funcs')
const GET_CONTENT = require('../../../funcs/v2/get_content')

const router = Router()

const jsonStrings = {
  title: 'Communities Monitoring Works Portal V2',
  msg_ok: 'Sites List Below:',
}

router.get('/v2/communities', (req, res, next) => {
  res.json({
    title: jsonStrings.title,
    status: {
      code: 200,
      message: jsonStrings.msg_ok
    },
    data: {
      "CT01": "일간베스트(일베)",
      "CT02": "클리앙",
      "CT03": "오늘의유머(사회)",
      "CT04": "와이고수",
      "CT05": "MLB파크",
      "CT06": "에펨코리아",
      "CT07": "뽐뿌",
      "CT08": "일간베스트(짤방)",
      "CT09": "더쿠",
      "CT10": "루리웹",
      "CT11": "개드립",
      "CT12": "워마드",
      "CT13": "오늘의유머(시사)",
    }
  })
})

router.get('/v2/communities/:site', (req, res, next) => {
  let resFunc = (error, response, body) => {
    if (error) res.json({ result: false, message: error })
    else res.json({ data: PARSE_FUNCS[req.params.site]['PARTIAL'](iconv.decode(Buffer.from(body), charset(response.headers, body))) })
  }
  if (req.query.keyword !== undefined && req.query.keyword.length > 0) {
    if (req.params.site === 'CT09' || req.params.site === 'CT12') {
      res.json({ data: { status: { code: 200, count: 0 }, items: [] } })
    } else {
      request({ url: REQ_URL[req.params.site]['KEYWORD_SEARCH'](req.query.keyword), encoding: null, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36' } }, resFunc)
    }
  } else {
    res.json({ data: { status: { code: 500, message: '크롤링 옵션이 빠졌습니다. (all / keyword / get_content)', count: 0 }, items: [] } })
  }
})

router.get('/v2/communities/:site/all', (req, res, next) => {
  let resFunc = (error, response, body) => {
    if (error) res.json({ result: false, message: error })
    res.json({ data: PARSE_FUNCS[req.params.site]['ALL'](iconv.decode(Buffer.from(body), charset(response.headers, body))) })
  }
  request({ url: REQ_URL[req.params.site]['ALL_LIST'], encoding: null, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36' } }, resFunc)
})

router.get('/v2/communities/:site/get_content', (req, res, next) => {
  let resFunc = (error, response, body) => {
    if (error) res.json({ result: false, message: error })
    res.json({ data: { status: { code: 200 }, content: GET_CONTENT[req.params.site](iconv.decode(Buffer.from(body), charset(response.headers, body))) } })
  }
  if (req.query.site_url !== undefined && req.query.site_url.length > 0) {
    request({ url: req.query.site_url, encoding: null, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36' } }, resFunc)
  } else {
    res.json({ data: { status: { code: 500, message: '게시물 주소 파라미터가 없습니다.' }, content: '' } })
  }
})

module.exports = router
