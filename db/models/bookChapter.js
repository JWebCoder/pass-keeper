import { sequelize } from 'db'
import Sequelize from 'sequelize'
import { bookModel } from 'db/models/book'
import { chapterTypeModel } from 'db/models/chapterType'
import { chapterChoiceModel } from 'db/models/chapterChoice'


let bookChapterModel = null

export function initBookChapterModel() {
  bookChapterModel = sequelize.define(
    'bookChapter',
    {
      text: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }
  )
}

export function createBookChapterRelations() {
  bookChapterModel.belongsTo(bookModel)
  bookChapterModel.belongsTo(chapterTypeModel)
  bookChapterModel.hasMany(chapterChoiceModel)
}

export { bookChapterModel }
