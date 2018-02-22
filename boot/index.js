import { userModel, bookModel } from 'db/models'



export default function() {
  console.log(userModel)
  userModel.create({
    firstName: 'John',
    lastName: 'Hancock',
    email: 'john.hancock@gmail.com',
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
