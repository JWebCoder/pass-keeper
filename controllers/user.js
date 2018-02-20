import userModel from 'db/models/user'

class UserController {
  constructor(userModel) {
    this.userModel = userModel
  }

  createUser(req, res) {
    console.log(req.body)
    this.userModel.create(
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
}

const userController = new UserController(userModel)

export default userController
