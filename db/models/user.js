import sequelize from 'db/db'
import Sequelize from 'sequelize'

const userModel = sequelize.define(
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

// force: true will drop the table if it already exists
userModel.sync({force: true}).then(() => {
  // Table created
  return userModel.create({
    firstName: 'John',
    lastName: 'Hancock',
    email: 'john.hancock@gmail.com',
  })
})

export default userModel
