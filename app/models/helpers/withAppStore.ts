import { IStateTreeNode } from "mobx-state-tree"
import { getRootStore } from "./getRootStore"
import { AppStore } from "../AppStore/AppStore"

/**
 * Adds a appStore property to the node for a convenient
 * and strongly typed way for stores to access other stores.
 */
export const withAppStore = (self: IStateTreeNode) => ({
  views: {
    get appStore(): AppStore {
      return getRootStore(self).appStore
    },
  },
})
