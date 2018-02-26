import { userModel, bookModel } from 'db/models'

// user controller, to treat all the users data
class UserController {
  constructor() {
  }

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
          id: req.user.id
        },
        attributes: [
          'id',
          'firstName',
          'lastName',
          'email',
        ],
        include: [{
          model: bookModel,
          attributes: ['id', 'title'],
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
    userModel.all({ include: [ bookModel ] }).then(
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
