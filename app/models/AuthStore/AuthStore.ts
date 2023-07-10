import { Instance, flow, types } from "mobx-state-tree"
import { api } from "app/services/api"
import * as LoadingService from "app/components/Loading"

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    token: types.maybeNull(types.string),
  })
  .volatile(() => ({
    persist: true,
  }))
  .views((self) => ({
    get isAuthenticated() {
      return !!self.token
    },
  }))
  .actions((self) => ({
    setToken: (token?: string) => {
      self.token = token
    },
    logout: () => {
      self.token = null
    },
  }))
  .actions((self) => ({
    login: flow(function* (username: string, password: string) {
      LoadingService.show()
      const data = yield api.login(username, password)
      if (data) {
        self.setToken(data.token)
      }
      LoadingService.hide()
    }),
  }))
export interface AuthStore extends Instance<typeof AuthStoreModel> {}
