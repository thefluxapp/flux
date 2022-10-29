import { createContext, useContext } from "react"
import { StreamStore } from "./store"

export const StreamContext = createContext({} as StreamStore)

export function useStreamContext(): StreamStore {
  return useContext(StreamContext)
}
