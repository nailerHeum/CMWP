import { Router } from 'express'
import passport from 'passport'

import User from '../../../models/user'

const router = Router()

const jsonStrings = {
  title: 'Communities Monitoring Works Portal V2',
  msg_ok: 'ok',
  msg_alreadyExists: '이미 존재하는 계정입니다.',
  msg_logout: '성공적으로 로그아웃하였습니다.'
}

router.post('/v2/auth/register', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: '이메일과 패스워드 입력은 필수입니다.' })
  }
  const user = new User({ email, password })
  user.save(err => {
    if (err) {
      return res.status(409).json({
        title: jsonStrings.title,
        status: {
          code: 409,
          message: jsonStrings.msg_alreadyExists,
          err_details: err
        },
        message: jsonStrings.msg_alreadyExists
      })
    }
    req.logIn(user, (err) => {
      if (err) return res.sendStatus(500)
      user.password = undefined
      res.json(user)
    })
  })
})

router.post('/v2/auth/login', passport.authenticate('local', { 'session': true }), (req, res) => {
  req.user.password = undefined
  req.session.user = req.user
  res.json(req.user)
})

router.post('/v2/auth/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.json({
    title: jsonStrings.title,
    status: {
      code: 200,
      message: jsonStrings.msg_logout
    },
    message: jsonStrings.msg_logout
  })
})

router.patch('/v2/auth/', (req, res) => {
  if (!req.user || !req.user.id) return res.sendStatus(401)
  User.findById(req.user.id, (err, user) => {
    if (err) return res.sendStatus(404)
    user.comparePassword(req.body.currentPassword, (err, isMatch) => {
      if (err || !isMatch) return res.sendStatus(400)
      user.password = req.body.newPassword
      user.save(err => res.sendStatus(err ? 500 : 200))
    })
  })
})
  
module.exports = router