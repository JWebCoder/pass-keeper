import { Router } from 'express'
import { auth, logout } from 'middleware/auth'
import { sendJson } from 'middleware/response'

const router = Router()

export default function() {
  // GET renders home page
  router.get('/', function(req, res) {
    res.render('index', { title: 'Express' })
    res.end()
  })

  // GET renders login page
  router.get('/login',
    (req, res) => {
      res.render('login')
    }
  )

  // POST creates a loggin session for a user
  router.post('/login',
    auth('local'),
    sendJson('user')
  )

  // GET logs out a user
  router.get('/logout',
    logout,
    sendJson()
  )

  return router
};
