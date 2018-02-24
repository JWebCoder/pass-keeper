import { Router } from 'express'
import { auth, logout } from 'middleware/auth'
import { sendJson } from 'middleware/response'

const router = Router();

export default function () {
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  router.get('/login',
    (req, res) => {
      res.render('login');
    }
  )

  router.post('/login',
    auth('local'),
    sendJson
  )

  router.get('/logout',
    logout,
    sendJson
  )

  return router
};
