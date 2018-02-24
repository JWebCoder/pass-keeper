import { sequelize } from 'db'
import Sequelize from 'sequelize'
import { userModel } from 'db/models/user'
import { bookChapterModel } from 'db/models/bookChapter'

let bookModel = null

export function initBookModel() {
  bookModel = sequelize.define(
    'book',
    {
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      indexes: [
        // Create a unique index on email
        {
          unique: true,
          fields: ['title'],
        },
      ],
    },
  )
}

export function createBookRelations() {
  bookModel.belongsToMany(userModel, {through: 'usersBooks'})
  bookModel.hasMany(bookChapterModel)
}

export { bookModel }
