import { makeAutoObservable } from "mobx"
import { StreamsStore } from "../app/screens/streams/store"
import { AppStore } from "./app_store"
import { AuthStore } from "./auth_store"

export class RootStore {
  authStore: AuthStore
  appStore: AppStore
  streamsStore: StreamsStore

  constructor() {
    makeAutoObservable(this)

    this.appStore = new AppStore(this)
    this.authStore = new AuthStore(this)
    this.streamsStore = new StreamsStore(this)
  }

  get isInitialized(): boolean {
    return this.appStore.initialized && this.authStore.initialized
  }
}
