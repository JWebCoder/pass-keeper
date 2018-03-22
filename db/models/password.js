import { sequelize } from 'db'
import Sequelize from 'sequelize'
import { userModel } from 'db/models/user'

let passwordModel = null

export function initPasswordModel() {
  passwordModel = sequelize.define(
    'password',
    {
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      indexes: [
        {
          fields: ['name'],
        },
      ],
    },
  )
}

export function createPasswordRelations() {
  passwordModel.belongsTo(userModel)
}

export { passwordModel }
