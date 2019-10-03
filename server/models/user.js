const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "형식에 알맞은 이메일 주소를 입력하여주세요."],
        required: '이메일 입력은 필수입니다.',
        trim: false
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return password && password.length >= 6;
            }, '패스워드는 6자리 이상이어야 합니다.'
        ],
        required: true
    },
    mode: {
        type: String,
        enum: ['관리자', '일반'],
        default: '일반'
    },
    usable: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })
    })
})
  
userSchema.methods.comparePassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return next(err)
        next(null, isMatch)
    })
}

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)