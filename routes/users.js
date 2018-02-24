import { Router } from 'express'
import userController from 'controllers/user'

// middleware
import { isAuth } from 'middleware/auth'
import { sendJson } from 'middleware/response'

const router = Router();

export default function () {
  /* Create a new user. */
  router.put('/',
    userController.createUser,
    sendJson
  )

  /* Lists all users. */
  router.get('/',
    isAuth(),
    userController.getAll,
    sendJson
  )

  /* Retreive all the logged in user data. */
  router.get('/me',
    isAuth(),
    userController.getProfile,
    sendJson
  )

  return router
}
