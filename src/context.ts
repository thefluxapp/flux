import { RootStore } from "./stores/root_store"

const rootStore = new RootStore()

export function useRootContext(): RootStore {
  return rootStore
}
