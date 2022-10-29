export interface MessageData {
  id: string
  text: string
  stream?: {
    id: string
    text: string
  }
}
