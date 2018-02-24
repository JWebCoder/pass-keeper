import { sequelize } from 'db'
import Sequelize from 'sequelize'

let chapterTypeModel = null

export function initChapterTypeModel() {
  chapterTypeModel = sequelize.define(
    'chapterType',
    {
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }
  )
}

export function createChapterTypeRelations() {
}

export { chapterTypeModel }
