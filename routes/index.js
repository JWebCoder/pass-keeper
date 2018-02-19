import { Router } from 'express'

const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.app.get('env'))
  res.render('index', { title: 'Express' });
});

export default router;
