import { passwordModel, userModel } from 'db/models'

// passwords controller, to treat all the passwords data
class PasswordController {
  constructor() {
    this.addPassword = this.addPassword.bind(this)
  }
  // adds a list of all passwords to res.data.passwords
  getAll(req, res, next) {
    passwordModel.all({
      attributes: ['name', 'password', 'extraFields'],
    }).then(
      passwords => {
        if (!res.data) {
          res.data = {}
        }

        res.data = {
          ...res.data,
          passwords,
        }
        next()
      }
    )
  }

  createPassword(userInstance, req, res, next) {
    passwordModel.create({
      password: req.body.password || null,
      name: req.body.name || null,
      extraFields: req.body.extraFields || null,
    }).then(
      password => {
        if (!res.data) {
          res.data = {}
        }

        res.data = {
          ...res.data,
          password,
        }

        userInstance.addPasswords(password)
        next()
      }
    )
  }

  addPassword(req, res, next) {
    userModel.findOne(
      {
        where: {
          id: req.user.id,
        },
      }
    ).then(
      user => {
        if (!user) {
          const err = new Error('Authentication required')
          err.status = 403
          Promise.reject(err)
        }
        console.log('user', this)
        return user
      }
    ).then(
      user => this.createPassword(user, req, res, next)
    ).catch(
      next
    )
  }

  deletePassword(req, res, next) {
    passwordModel.destroy({
      where: {
        userId: req.user.id,
        id: req.body.passwordId,
      },
    }).then(
      count => {
        if (count > 0) {
          res.data = {
            ...res.data,
            password: {
              status: 'OK',
            },
          }
          next()
        } else {
          const err = new Error('Password not found')
          err.status = 404
          next(err)
        }
      }
    )
  }
}

const passwordController = new PasswordController()

export default passwordController
