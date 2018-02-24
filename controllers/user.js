import { userModel, bookModel } from 'db/models'

class UserController {
  constructor() {
  }

  createUser(req, res, next) {
    userModel.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      }
    ).then(
      user => {
        res.data = user
        next()
      }
    )
  }

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
          'password',
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
        res.data = user
        next()
      }
    )
  }

  getAll(req, res, next) {
    userModel.all({ include: [ bookModel ] }).then(
      users => {
        res.data = users
      }
    )
  }
}

const userController = new UserController()

export default userController
