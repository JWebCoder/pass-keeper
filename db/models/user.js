import { sequelize } from 'db'
import Sequelize from 'sequelize'
import { passwordModel } from 'db/models/password'
import bcrypt from 'bcrypt'

const saltRounds = 10;
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
      ],
      hooks: {
        beforeCreate: (user, options) => {
          user.password = bcrypt.hashSync(user.password, saltRounds)
        },
      },
    }
  )
}

export function createUserRelations() {
  userModel.hasMany(passwordModel)
}

export { userModel }
