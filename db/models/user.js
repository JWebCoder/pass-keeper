import { sequelize } from 'db'
import Sequelize from 'sequelize'
import { bookModel } from 'db/models/book'

let userModel = null

export function initUserModel() {
  userModel = sequelize.define(
    'user',
    {
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
    {
      indexes: [
        // Create a unique index on email
        {
          unique: true,
          fields: ['email']
        }
      ]
    }
  )
}

export function createUserRelations() {
  userModel.belongsToMany(bookModel, { through: 'usersBooks' })
}

export { userModel }
