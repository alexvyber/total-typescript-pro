import { Equal, Expect } from "../helpers/type-utils"

export type Event =
  | {
      type: "click"
      event: MouseEvent
    }
  | {
      type: "focus"
      event: FocusEvent
    }
  | {
      type: "keydown"
      event: KeyboardEvent
    }

type EventType = Event["type"]

export type tests = [Expect<Equal<EventType, "click" | "focus" | "keydown">>]
