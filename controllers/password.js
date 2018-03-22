import { passwordModel } from 'db/models'

// passwords controller, to treat all the passwords data
class PasswordController {
  constructor() {
  }

  // adds a list of all passwords to res.data.passwords
  getAll(req, res, next) {
    passwordModel.all({
      attributes: ['name', 'password'],
    }).then(
      passwords => {
        res.data = {
          ...res.data,
          passwords,
        }
        next()
      }
    )
  }
}

const passwordController = new PasswordController()

export default passwordController
