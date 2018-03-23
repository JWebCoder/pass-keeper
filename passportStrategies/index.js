import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { userModel } from 'db/models'
import bcrypt from 'bcrypt'

export function initStrategies() {
  console.log('starting login strategies')
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, cb) => {
      return userModel.findOne(
        {
          where: {
            email,
          },
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'password',
          ],
        }
      ).then(
        user => {
          if (!user) {
            return cb(null, false)
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return cb(null, false)
          }
          console.log(`user found: ${user.email}`)
          delete user.dataValues.password
          return cb(null, user)
        }
      ).catch(
        err => {
          return cb(err)
        }
      )
    }
  ))

  passport.serializeUser(
    (user, cb) => {
      cb(null, user.id)
    }
  )

  passport.deserializeUser(
    (id, cb) => {
      userModel.findById(
        id,
        {
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
          ],
        }
      ).then(
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
