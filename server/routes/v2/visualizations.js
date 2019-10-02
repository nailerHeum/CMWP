const { Router } = require('express')

const router = Router()

const jsonStrings = {
    title: 'Communities Monitoring Works Portal V2',
    msg_ok: 'ok',
    msg_notFound: 'Intelligence Not Found'
}

router.get('/v2/visualize/wordcloud', (req, res) => {
    
})

router.get('/v2/visualize/metric', (req, res) => {
    
})

router.get('/v2/visualize/bar', (req, res) => {
    
})

router.get('/v2/visualize/pie', (req, res) => {
    
})

router.get('/v2/visualize/map', (req, res) => {
    
})

module.exports = router