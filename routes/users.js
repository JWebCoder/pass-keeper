import { Router } from 'express'
import userController from 'controllers/user'

const router = Router();

/* GET users listing. */
router.put('/', function(req, res) {
  userController.createUser(req, res)
})

export default router
