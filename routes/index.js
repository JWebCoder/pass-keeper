import { strategies } from 'passportStrategies'
import { Router } from 'express'
import { ensureLoggedIn } from 'connect-ensure-login'

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
    strategies.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      res.json({user: req.user})
    }
  )

  router.get('/logout',
    (req, res) => {
      req.logout()
      res.redirect('/')
    }
  )

  router.get('/profile',
    ensureLoggedIn(),
    (req, res) => {
      res.json({user: req.user})
    }
  )

  return router
};
