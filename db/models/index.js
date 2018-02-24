import { initUserModel, createUserRelations } from 'db/models/user'
import { initBookModel, createBookRelations } from 'db/models/book'
import { initBookChapterModel, createBookChapterRelations } from 'db/models/bookChapter'
import { initChapterTypeModel, createChapterTypeRelations } from 'db/models/chapterType'
import { initChapterChoiceModel, createChapterChoiceRelations } from 'db/models/chapterChoice'

export function initModels() {
  initUserModel()
  initBookModel()
  initBookChapterModel()
  initChapterTypeModel()
  initChapterChoiceModel()

  createUserRelations()
  createBookRelations()
  createBookChapterRelations()
  createChapterTypeRelations()
  createChapterChoiceRelations()
}

export { userModel } from 'db/models/user'
export { bookModel } from 'db/models/book'
export { bookChapterModel } from 'db/models/bookChapter'
export { chapterTypeModel } from 'db/models/chapterType'
export { chapterChoiceModel } from 'db/models/chapterChoice'
