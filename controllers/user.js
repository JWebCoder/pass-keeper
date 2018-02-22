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

  getAll(req, res) {
    console.log(userModel)
    userModel.all({ include: [ bookModel ] }).then(
      users => {
        res.json(users)
      }
    )
  }
}

const userController = new UserController()

export default userController
