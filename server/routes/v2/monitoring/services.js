const request = require('request')
const { Router } = require('express')
const Horseman = require('node-horseman')

const router = Router()

const jsonStrings = {
  title: '커뮤니티게시물모니터링포털',
  msg_ok: 'ok',
  msg_notFound: 'Intelligence Not Found',
  msg_created: 'Successfully Created'
}

router.get('/v2/service/screenshot', async (req, res, next) => {
  if (req.query.url !== undefined) {
    const data = await new Horseman().open(req.query.url).screenshotBase64('JPEG')
    res.json({
        title: jsonStrings.title,
        status: {
            code: 200,
            message: jsonStrings.msg_ok
        },
        result: 'data:image/jpeg;base64,' + data
    })
  }
})

module.exports = router
