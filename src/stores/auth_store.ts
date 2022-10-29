import { makeAutoObservable, runInAction } from "mobx"
import { RootStore } from "./root_store"
import EncryptedStorage from "react-native-encrypted-storage"
import axios from "axios"

export class AuthStore {
  rootStore: RootStore
  jwt: string | undefined | null
  initialized = false

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })

    this.rootStore = rootStore
    this.initialize()
  }

  autoLogin = async () => {
    const { data } = await axios.post<{ id: string; token: string }>("/session/auth")
    console.log("qqq", data)

    try {
      await EncryptedStorage.setItem("jwt", data.token)
    } catch (e) {
      console.log(e)
    }

    runInAction(() => {
      this.jwt = data.token
    })
  }

  initialize = async () => {
    const jwt = await EncryptedStorage.getItem("jwt")

    if (!jwt) this.autoLogin()

    runInAction(() => {
      this.jwt = jwt
      this.initialized = true
    })
  }
}
