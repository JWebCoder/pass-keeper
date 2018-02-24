import { sequelize } from 'db'
import Sequelize from 'sequelize'
import { bookChapterModel } from 'db/models/bookChapter'

let chapterChoiceModel = null

export function initChapterChoiceModel() {
  chapterChoiceModel = sequelize.define(
    'chapterChoice',
    {
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }
  )
}

export function createChapterChoiceRelations() {
  chapterChoiceModel.belongsTo(bookChapterModel)
}

export { chapterChoiceModel }
