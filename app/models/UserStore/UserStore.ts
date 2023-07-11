import { Instance, types, flow } from "mobx-state-tree"
import { api } from "app/services/api"
import * as LoadingService from "app/components/Loading"

export const UserModel = types.model({
  _id: types.maybeNull(types.string),
  hoten: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  dienthoai: types.maybeNull(types.string),
  ngaysinh: types.maybeNull(types.string),
})
export interface User extends Instance<typeof UserModel> {}

export const UserStoreModel = types
  .model("UserStore")
  .props({ user: types.optional(UserModel, {}) })
  .actions((self) => ({
    setUser: (user: User) => {
      self.user = user
    },
  }))
  .actions((self) => ({
    getUserInfo: async () => {
      LoadingService.show()
      const user = await api.getUserInfo()
      self.setUser(user)
      LoadingService.hide()
    },
  }))
