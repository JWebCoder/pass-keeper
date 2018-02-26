import { userModel, bookModel } from 'db/models'

/* boot script for development
** create a user
** adds a book to the user created
*/
export default function() {
  console.log(userModel)
  userModel.create({
    firstName: 'John',
    lastName: 'Hancock',
    email: 'john.hancock@gmail.com',
    password: 'password'
  }).then(
    user => {
      bookModel.create({
        title: 'A cidadela do caos',
      }).then(
        book => {
          user.addBooks(book)
        }
      )
    }
  )
}
