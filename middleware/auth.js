import passport from 'passport'

function ensureLoggedIn(options) {
  if (typeof options == 'string') {
    options = { redirectTo: options }
  }
  options = options || {};

  var url = options.redirectTo || '/login';
  var setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;

  return function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (setReturnTo && req.session) {
        req.session.returnTo = req.originalUrl || req.url
      }
      const err = new Error('Authentication required')
      err.status = 403
      return next(err)

    } else {
      next()
    }
  }
}

const login = (req, res, next, user) => {
  req.logIn(
    user,
    (err) => {
      if (err) {
        next(err)
      }
      res.data = user
      next()
    }
  )
}

export function isAuth(req, res, next) {
  return ensureLoggedIn()
}

export function auth(target) {
  return (req, res, next) => {
    passport.authenticate(
      target,
      (err, user, info) => {
        if (err) {
          return next(err)
        }
        if (!user) {
          const error = new Error('Username or password incorrect')
          err.status = 403
          return res.json(error)
        }
        login(req, res, next, user)
      }
    )(req, res)
  }
}

export function logout(req, res, next) {
  req.logout()
  res.data = {
    status: 200,
    message: 'user logged out',
  }
  next()
}
