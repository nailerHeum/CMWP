const { Router } = require('express')
const bcrypt = require('bcrypt')
const router = Router()
var Intelligences = require('../../models/intelligence')
var Users = require('../../models/user')

const jsonStrings = {
    title: 'Communities Monitoring Works Portal V2',
    msg_ok: 'ok',
    msg_notFound: 'Intelligence Not Found'
}

// Intelligences DB Handler
router.get('/v2/intelligences', (req, res) => {
    if (req.query.by) {
        Intelligences.find({ 'item.created_by': req.query.by }, (err, intelligences) => {
            if (err) {
                res.status(500).send({
                    title: jsonStrings.title,
                    status: {
                        code: 500,
                        message: err
                    }
                })
            } else {
                res.json({
                    title: jsonStrings.title,
                    status: {
                        code: 200,
                        message: jsonStrings.msg_ok
                    },
                    result: intelligences
                })
            }
        })
    } else {
        Intelligences.find((err, intelligences) => {
            if (err) {
                res.status(500).send({
                    title: jsonStrings.title,
                    status: {
                        code: 500,
                        message: err
                    }
                })
            } else {
                res.json({
                    title: jsonStrings.title,
                    status: {
                        code: 200,
                        message: jsonStrings.msg_ok
                    },
                    result: intelligences
                })
            }
        })
    }
})

router.get('/v2/intelligences/:intelligence_id', (req, res) => {
    Intelligences.findOne({ _id: req.params.intelligence_id }, (err, intelligence) => {
        if (err) {
            res.status(500).send({
                title: jsonStrings.title,
                status: {
                    code: 500,
                    message: err
                }
            })
        }
        if (!intelligence) {
            return res.status(404).json({
                title: jsonStrings.title,
                status: {
                    code: 404,
                    message: jsonStrings.msg_notFound
                }
            })
        }
        res.json({
            title: jsonStrings.title,
            status: {
                code: 200,
                message: 'ok'
            },
            result: intelligence
        })
    })
})

router.post('/v2/intelligences/', (req, res) => {
    Intelligences.findOne({ identifier: req.body.identifier }, (err, data) => {
        if (err) {
            res.status(500).json({
                title: jsonStrings.title,
                status: {
                    code: 500,
                    message: err
                }
            })
        }
        if (data) {
            res.status(409).json({
                title: jsonStrings.title,
                status: {
                    code: 409,
                    message: jsonStrings.msg_conflict
                }
            })
        } else {
            new Intelligences(req.body).save().then((item) => {
                res.status(201).json({
                    title: jsonStrings.title,
                    status: {
                        code: 201,
                        message: jsonStrings.msg_created
                    },
                    result: item
                })
            }).catch((err) => {
                res.status(400).json({
                    title: jsonStrings.title,
                    status: {
                        code: 400,
                        message: err
                    }
                })
            })
        }
    })
})

router.delete('/v2/intelligences/:intelligence_id', (req, res) => {
    Intelligences.deleteOne({ _id: req.params.intelligence_id }, (err, data) => {
        if (err) {
            res.status(500).json({
                title: jsonStrings.title,
                status: {
                    code: 500,
                    message: err
                }
            })
        }
        if (data) {
            res.status(200).json({
                title: jsonStrings.title,
                status: {
                    code: 200,
                    message: data
                },
                message: data
            })
        }
    })
})

// User DB Handler
router.get('/v2/users/', (req, res) => {
    Users.find((err, users) => {
        if (err) {
            res.status(500).send({
                title: jsonStrings.title,
                status: {
                    code: 500,
                    message: err
                }
            })
        } else {
            res.json({
                title: jsonStrings.title,
                status: {
                    code: 200,
                    message: jsonStrings.msg_ok
                },
                result: users
            })
        }
    })
})

router.put('/v2/user/:account/usable', (req, res) => {
    Users.updateOne({ email: req.params.account }, { $set: { usable: true } }, (err, data) => {
        if (err) {
            res.status(500).json({
                title: jsonStrings.title,
                status: {
                    code: 500,
                    message: err
                }
            })
        }
        if (data) {
            res.status(200).json({
                title: jsonStrings.title,
                status: {
                    code: 200,
                    message: data
                },
                message: data
            })
        }
    })
})

router.put('/v2/user/:account/password', async (req, res) => {
    let resetPW = `CMWPservice_${req.params.account.split('@')[0]}`
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(resetPW, salt)
    
    Users.updateOne({ email: req.params.account }, { $set: { password: hash } }, (err, data) => {
        if (err) {
            res.status(500).json({
                title: jsonStrings.title,
                status: {
                    code: 500,
                    message: err
                }
            })
        }
        if (data) {
            res.status(200).json({
                title: jsonStrings.title,
                status: {
                    code: 200,
                    message: data
                },
                message: data
            })
        }
    })
})

router.delete('/v2/user/:account', (req, res) => {
    Users.deleteOne({ email: req.params.account }, (err, data) => {
        if (err) {
            res.status(500).json({
                title: jsonStrings.title,
                status: {
                    code: 500,
                    message: err
                }
            })
        }
        if (data) {
            res.status(200).json({
                title: jsonStrings.title,
                status: {
                    code: 200,
                    message: data
                },
                message: data
            })
        }
    })
})

module.exports = router