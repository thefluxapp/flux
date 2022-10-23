import { makeAutoObservable } from "mobx"
import type { RootStore } from "./root_store"

export class AppStore {
  rootStore: RootStore
  initialized = false

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })

    this.rootStore = rootStore
    this.initialize()
  }

  initialize = () => {
    this.initialized = true
  }
}
