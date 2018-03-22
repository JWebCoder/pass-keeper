import { initUserModel, createUserRelations } from 'db/models/user'
import { initPasswordModel, createPasswordRelations } from 'db/models/password'

export function initModels() {
  initUserModel()
  initPasswordModel()

  createUserRelations()
  createPasswordRelations()
}

export { userModel } from 'db/models/user'
export { passwordModel } from 'db/models/password'
