import { Instance, types } from "mobx-state-tree"

export const AppStoreModel = types
  .model("AppStore")
  .props({
    loading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setLoading: (loading: boolean) => {
      self.loading = loading
    },
  }))
export interface AppStore extends Instance<typeof AppStoreModel> {}
