const { Router } = require('express')
const router = Router()

router.get('/', (req, res, next) => {
    res.json({
        title: 'Communities Monitoring Works Portal API',
        doc_url: '/api/:version/doc',
        versions: ['v1', 'v2'],
        status: {
            code: 200,
            message: 'ok'
        }
    })
})

module.exports = router