import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AppStoreModel } from "./AppStore/AppStore"
import { AuthStoreModel } from "./AuthStore/AuthStore"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { EpisodeStoreModel } from "./EpisodeStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  appStore: types.optional(AppStoreModel, {}),
  authStore: types.optional(AuthStoreModel, {}),
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
