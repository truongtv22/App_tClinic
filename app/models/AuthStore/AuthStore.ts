import { Instance, flow, types } from "mobx-state-tree"
import { api } from "../../services/api"
import { withAppStore } from "../helpers/withAppStore"

const UserModel = types.model({
  _id: types.maybeNull(types.string),
})
export interface User extends Instance<typeof UserModel> {}

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    token: types.maybeNull(types.string),
    user: types.maybeNull(UserModel),
  })
  .extend(withAppStore)
  .views((self) => ({
    get isAuthenticated() {
      return !!self.token
    },
  }))
  .actions((self) => ({
    setToken: (token?: string) => {
      self.token = token
    },
    setUser: (user: User) => {
      self.user = user
    },
    logout: () => {
      self.token = null
      self.user = null
    },
  }))
  .actions((self) => ({
    login: flow(function* (username: string, password: string) {
      self.appStore.setLoading(true)
      const data = yield api.login(username, password)
      if (data) {
        self.setToken(data.token)
        self.setUser(data.user)
      }
      self.appStore.setLoading(false)
    }),
  }))
export interface AuthStore extends Instance<typeof AuthStoreModel> {}
