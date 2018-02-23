import { userModel, bookModel } from 'db/models'

class UserController {
  constructor() {
  }

  createUser(req, res) {
    userModel.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      }
    ).then(
      user => {
        res.json(user);
      }
    )
  }

  getProfile(req, res) {
    userModel.findOne(
      {
        where: {
          id: req.user.id
        },
        include: [ bookModel ]
      }
    ).then(
      user => {
        res.json(user)
      }
    )
  }

  getAll(req, res) {
    userModel.all({ include: [ bookModel ] }).then(
      users => {
        res.json(users)
      }
    )
  }
}

const userController = new UserController()

export default userController
