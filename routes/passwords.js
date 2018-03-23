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
    (...params) => passwordController.getAll(...params),
    sendJson('passwords')
  )

  router.put('/',
    isAuth(),
    (...params) => passwordController.addPassword(...params),
    sendJson('password')
  )

  router.delete('/',
    isAuth(),
    (...params) => passwordController.deletePassword(...params),
    sendJson('password')
  )

  return router
}
