const { Router } = require('express')
const router = Router()

router.get('/v2', (req, res, next) => {
    res.json({
        title: 'Communities Monitoring Works Portal API v2',
        doc_url: '/api/v2/doc',
        status: {
            code: 200,
            message: 'ok'
        }
    })
})

module.exports = router