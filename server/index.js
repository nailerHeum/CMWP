console.log('=====================================\n    커뮤니티게시물모니터링포털 V2\n=====================================\n')

const dbServer = 'mongodb://127.0.0.1:27017/cmwp'
const mongoose = require('mongoose')

// Database Configuration
mongoose.connect(dbServer, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if (err) {
    console.log('[Database] Failed to be connected to ' + dbServer)
  } else {
    console.log('[Database] Successfully connected to ' + dbServer)
  }
})
mongoose.Promise = global.Promise

const express = require('express')
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const passportConfig = require('./passport')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const MongoStore = require('connect-mongo')(session)

// Create express instnace
const app = express()
app.use(cors())

passportConfig(passport)

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser('c0mmun1ty_m0n1t0r1n9_w0rks_p0rta1'))
app.use(session({
  secret: 'c0mmun1ty_m0n1t0r1n9_w0rks_p0rta1',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60,
    expires: 1000 * 60 * 60,
    httpOnly: true,
    secure: false
  },
  rolling: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    autoRemove: 'native'
  }),
  function (err) {
    console.error(err)
  }
}))

app.use(passport.initialize())
app.use(passport.session())

// Configure API routes
app.use(require('./routes/index'))
app.use(require('./routes/v2/index'))
app.use(require('./routes/v2/auth'))
app.use(require('./routes/v2/dbHandler'))
app.use(require('./routes/v2/visualizations'))
app.use(require('./routes/v2/monitoring/communities'))
app.use(require('./routes/v2/monitoring/social'))
app.use(require('./routes/v2/monitoring/services'))
app.use(require('./routes/intelligence/viewer'))
app.use('/v1/doc', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({ swaggerDefinition: require('./docs/v1/desc.json'), apis: [] })))
app.use('/v2/doc', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({ swaggerDefinition: require('./docs/v2/desc.json'), apis: [] })))

module.exports = {
  path: '/api',
  handler: app
}
