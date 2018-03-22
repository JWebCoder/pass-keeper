import { initModels } from 'db/models'

const Sequelize = require('sequelize')

let sequelize

export { sequelize }

export function initDB() {
  sequelize = new Sequelize(
    'pass_keep',
    'root',
    'admysql@2014',
    {
      host: 'localhost',
      dialect: 'mysql',
    }
  )

  initModels()
}
