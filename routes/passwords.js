import { Router } from 'express'
import passwordController from 'controllers/password'

// middleware
import { isAuth } from 'middleware/auth'
import { sendJson } from 'middleware/response'

const router = Router()

export default function() {
  /* Lists all books. */
  router.get('/',
    isAuth(),
    passwordController.getAll,
    sendJson('books')
  )

  return router
}
