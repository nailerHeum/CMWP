const { Router } = require('express')
const router = Router()

const Twitter = require('twitter')
const client = new Twitter({
  consumer_key: 'IYcHRQsc3q4Hzf5htAnliS2tP',
  consumer_secret: 'NtDQFFpcCDkcfRGkAC4Msjll0PHJfZ8ZuY7SRm9rfeV60Vuh4s',
  access_token_key: '919807899077025792-8csQOJ34fOCGzb7lmE3G51nUT5YelRq',
  access_token_secret: 'sfC1teXh8X8GWUnW13TatRTPkJpQUKsyohu3s6m9l7b5x'
})

router.get('/v2/social/twitter/:keyword', (req, res, next) => {
  client.get('search/tweets', { q: req.params.keyword, count: 100, result_type: 'recent', lang: 'ko' }, (error, tweets, response) => {
    if (error) res.json({ result: false, status: { code: 500, message: error } })
    let items = []
    for (let item of JSON.parse(response.body).statuses) {
      let obj = {
        meta: {
          int_type: 'INTSOCIAL',
          code: 'ST01',
          site: '트위터',
          site_thumb_url: 'https://upload.wikimedia.org/wikipedia/ko/thumb/9/9e/%ED%8A%B8%EC%9C%84%ED%84%B0_%EB%A1%9C%EA%B3%A0_%282012%29.svg/1200px-%ED%8A%B8%EC%9C%84%ED%84%B0_%EB%A1%9C%EA%B3%A0_%282012%29.svg.png'
        },
        details: item
      }
      items.push(obj)
    }
    if (response.statusCode === 200) res.json({ status: { code: response.statusCode, count: items.length }, items: items })
    else res.json({ result: false, status: { code: 500, message: 'failed' } })
  })
})

module.exports = router
