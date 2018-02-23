import { Router } from 'express'
import userController from 'controllers/user'

const router = Router();

export default function () {
  /* Create a new user. */
  router.put('/', function(req, res) {
    userController.createUser(req, res)
  })

  /* Lists all users. */
  router.get('/',
    ensureLoggedIn(),
    (req, res) => {
      userController.getAll(req, res)
    }
  )

  /* Retreive all the logged in user data. */
  router.get('/me',
    ensureLoggedIn(),
    (req, res) => {
      userController.getProfile(req, res)
    }
  )

  return router
}
