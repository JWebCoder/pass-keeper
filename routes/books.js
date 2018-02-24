import { Router } from 'express'
import bookController from 'controllers/book'

// middleware
import { isAuth } from 'middleware/auth'
import { sendJson } from 'middleware/response'

const router = Router();

export default function () {
  /* Lists all books. */
  router.get('/',
    isAuth(),
    bookController.getAll,
    sendJson
  )

  return router
}
