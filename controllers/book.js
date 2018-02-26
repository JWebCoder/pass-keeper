import { bookModel } from 'db/models'

// book controller, to treat all the books data
class BookController {
  constructor() {
  }

  // adds a list of all books to res.data.books
  getAll(req, res, next) {
    bookModel.all({
      attributes: ['id', 'title'],
    }).then(
      books => {
        res.data = {
          ...res.data,
          books,
        }
        next()
      }
    )
  }
}

const bookController = new BookController()

export default bookController
