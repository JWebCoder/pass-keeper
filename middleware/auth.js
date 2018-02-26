import passport from 'passport'

// makes sure that the user is logged in
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

// runs the login function from passport to register the user in the session
const login = (req, res, next, user) => {
  req.login(
    user,
    (err) => {
      if (err) {
        next(err)
      }
      res.data = {
        ...res.data,
        user
      }
      next()
    }
  )
}

// middleware to check if the user is logged in
export function isAuth(req, res, next) {
  return ensureLoggedIn()
}

// middleware to authenticate the user based on the target passport strategy passed
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

// middleware to logout the user
export function logout(req, res, next) {
  req.logout()
  res.data = {
    status: 200,
    message: 'user logged out',
  }
  next()
}
