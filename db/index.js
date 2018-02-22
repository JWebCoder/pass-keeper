import { initModels } from 'db/models'

const Sequelize = require('sequelize')

let sequelize

export { sequelize }

export function initDB() {
  sequelize = new Sequelize(
    'fightingFantasy',
    'root',
    'caralhao',
    {
      host: 'localhost',
      dialect: 'mysql',
    }
  )

  initModels()
}
