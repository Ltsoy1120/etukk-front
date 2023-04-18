import {SchemaLot} from "infrastructure/persistence/api/data/schemas"

export interface Event {
  time: string
  event_name: string
  text: string
  data: SchemaLot | null
  user_id: number | null
}
