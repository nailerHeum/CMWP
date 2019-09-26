const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
    
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        (email, password, done) => {
            User.findOne({ email }, (err, user) => {
                if (err) return done(err)
                if (!user) return done(null, false, { message: '해당되는 계정이 존재하지 않습니다.' })
                user.comparePassword(password, (err, isMatch) => {
                    if (err) return done(err)
                    if (!isMatch) return done(null, false, { message: '패스워드가 잘못되었습니다.' })
                    done(null, user)
                })
            })
        }
    ))
}

