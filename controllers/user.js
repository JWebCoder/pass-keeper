import { userModel, passwordModel } from 'db/models'

// user controller, to treat all the users data
class UserController {
  // creates a new user and adds the user to res.data.user
  // TODO: needs to encrypt the password and save it
  createUser(req, res, next) {
    userModel.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      }
    ).then(
      user => {
        res.data = {
          ...res.data,
          user,
        }
        next()
      }
    )
  }

  // adds the user profile data to res.data.user
  getProfile(req, res, next) {
    userModel.findOne(
      {
        where: {
          id: req.user.id,
        },
        attributes: [
          'id',
          'firstName',
          'lastName',
          'email',
        ],
        include: [{
          model: passwordModel,
          attributes: ['name', 'password'],
          through: {
            attributes: [],
          },
        }],
      }
    ).then(
      user => {
        res.data = {
          ...res.data,
          user,
        }
        next()
      }
    )
  }

  // adds a list of all users to res.data.users
  getAll(req, res, next) {
    userModel.all().then(
      users => {
        res.data = {
          ...res.data,
          users,
        }
        next()
      }
    )
  }
}

const userController = new UserController()

export default userController
