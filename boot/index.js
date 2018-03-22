import { userModel, passwordModel } from 'db/models'

/* boot script for development
** create a user
** adds a book to the user created
*/
export default function() {
  console.log(userModel)
  userModel.create({
    firstName: 'John',
    lastName: 'Hancock',
    email: 'admin@gmail.com',
    password: 'password',
  }).then(
    user => {
      passwordModel.create({
        name: 'gmail',
        password: 'password',
      }).then(
        password => {
          user.addPasswords(password)
        }
      )
    }
  )
}
