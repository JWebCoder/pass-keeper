import { userModel, bookModel } from 'db/models'

class UserController {
  constructor() {
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
