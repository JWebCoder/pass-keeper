import passport from 'passport'
import { Strategy as LocalStrategy } from "passport-local";
import { userModel } from 'db/models'

export function initStrategies() {
  console.log('starting login strategies')
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, cb) => {
      return userModel.findOne(
        {
          where: {
            email
          }
        }
      ).then(
        user => {
          if (!user) {
            return cb(null, false)
          }
          if (user.password !== password) {
            return cb(null, false)
          }
          console.log('user found')
          return cb(null, user)
        }
      ).catch(
        err => {
          return cb(err)
        }
      )
    }
  ))


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(
    (user, cb) => {
      cb(null, user.id)
    }
  )

  passport.deserializeUser(
    (id, cb) => {
      userModel.findById(id).then(
        user => {
          cb(null, user)
        }
      ).catch(
        err => {
          return cb(err)
        }
      )
    }
  )

  return passport
}
