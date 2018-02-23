import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'

// passport
import { initStrategies } from 'passportStrategies'

// routes
import index from 'routes/index'
import users from 'routes/users'

// database
import { initDB } from 'db'

class App {
  constructor() {
    initDB()
    this.server = express()

    // view engine setup
    this.server.set('views', path.join(__dirname, 'views'))
    this.server.set('view engine', 'jade')

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    this.server.use(logger('dev'))
    this.server.use(bodyParser.json())
    this.server.use(bodyParser.urlencoded({ extended: false }))
    this.server.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
    this.server.use(cookieParser())
    this.server.use(express.static(path.join(__dirname, 'public')))

    // Initialize Passport and restore authentication state, if any, from the
    // session.
    const passport = initStrategies()
    this.server.use(passport.initialize())
    this.server.use(passport.session())

    this.server.use('/', index())
    this.server.use('/users', users())

    // catch 404 and forward to error handler
    this.server.use(
      (req, res, next) => {
        var err = new Error('Not Found')
        err.status = 404
        next(err)
      }
    );

    // error handler
    this.server.use(
      (err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {}

        // render the error page
        res.status(err.status || 500)
        res.render('error')
      }
    )
  }
}

export default App
