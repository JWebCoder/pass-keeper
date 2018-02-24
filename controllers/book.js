import { bookModel } from 'db/models'

class BookController {
  constructor() {
  }

  getAll(req, res, next) {
    bookModel.all({
      attributes: ['id', 'title'],
    }).then(
      books => {
        res.data = books
        next()
      }
    )
  }
}

const bookController = new BookController()

export default bookController
