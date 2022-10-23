import axios from "axios"
import { makeAutoObservable, runInAction } from "mobx"
import { RootStore } from "../../../stores/root_store"
import { StreamData } from "./data"

export class StreamsStore {
  rootStore: RootStore
  initialized = false
  streams: StreamData[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })

    this.rootStore = rootStore
    this.initialize()
  }

  load = async () => {
    const { data } = await axios.get("/streams")

    runInAction(() => {
      this.streams = data.streams
    })
  }

  initialize = async () => {
    await this.load()

    runInAction(() => {
      this.initialized = true
    })
  }
}
