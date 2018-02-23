import { Router } from 'express'
import userController from 'controllers/user'

const router = Router();

export default function () {
  /* Create a new user. */
  router.put('/', function(req, res) {
    userController.createUser(req, res)
  })

  /* Lists all users. */
  router.get('/', function(req, res) {
    userController.getAll(req, res)
  })

  return router
}
