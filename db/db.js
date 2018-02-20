const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  'fightingFantasy',
  'root',
  'caralhao',
  {
    host: 'localhost',
    dialect: 'mysql',
  }
)

export default sequelize
