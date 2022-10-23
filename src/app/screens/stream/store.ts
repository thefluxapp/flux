import axios from "axios"
import { makeAutoObservable, runInAction } from "mobx"
import { StreamData } from "../streams/data"
import { MessageData } from "./data"

export class StreamStore {
  // streamsStore: StreamsStore
  initialized = false
  stream?: StreamData
  messages?: MessageData[] = []

  constructor(stream_id: string) {
    makeAutoObservable(this)

    this.initialize(stream_id)
  }

  load = async (stream_id: string) => {
    const { data } = await axios.get(`/streams/${stream_id}`)

    runInAction(() => {
      this.stream = data.stream
      this.messages = data.messages
    })
  }

  initialize = async (stream_id: string) => {
    await this.load(stream_id)

    runInAction(() => {
      this.initialized = true
    })
  }
}
