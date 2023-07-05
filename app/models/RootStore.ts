import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AppStoreModel } from "./AppStore/AppStore"
import { AuthStoreModel } from "./AuthStore/AuthStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  appStore: types.optional(AppStoreModel, {}),
  authStore: types.optional(AuthStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
