import { initUserModel, createUserRelations } from 'db/models/user'
import { initBookModel, createBookRelations } from 'db/models/book'

export function initModels() {
  initUserModel()
  initBookModel()

  createUserRelations()
  createBookRelations()
}

export { userModel } from 'db/models/user'
export { bookModel } from 'db/models/book'
