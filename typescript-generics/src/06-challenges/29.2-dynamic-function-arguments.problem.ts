import { it } from "vitest"

interface Events {
  click: {
    x: number
    y: number
  }
  focus: undefined
  hover: [{ do: "stuff"; other: ":sdfa" }, { dontDo: "other stuff" }]
  other: null
}

type T = [a: string, b: string]
type Tuple0<EventsType, KeyType extends keyof EventsType> = {
  [Key in keyof EventsType]: EventsType[KeyType] extends Array<{}>
    ? [EventsType[KeyType][number]]
    : EventsType[KeyType]
}[KeyType]

type O = Tuple0<Events, "hover">

export const sendEvent = <EventKey extends keyof Events>(
  event: EventKey,
  ...args: Events[EventKey] extends Array<{}>
    ? Events[EventKey]
    : Events[EventKey] extends {}
    ? [payload: Events[EventKey]]
    : []
) => {
  // Send the event somewhere!
}

it("Should force you to pass a second argument when you choose an event with a payload", () => {
  // @ts-expect-error
  sendEvent("click")

  sendEvent("click", {
    // @ts-expect-error
    x: "oh dear",
  })

  sendEvent(
    "click",
    // @ts-expect-error
    {
      y: 1,
    },
  )

  sendEvent("click", {
    x: 1,
    y: 2,
  })
})

it("Should prevent you from passing a second argument when you choose an event without a payload", () => {
  sendEvent("focus")

  sendEvent(
    "focus",
    // @ts-expect-error
    {},
  )
})

it("...", () => {
  sendEvent("hover", { do: "stuff", other: ":sdfa" }, { dontDo: "other stuff" })

  sendEvent(
    "hover",
    // @ts-expect-error
    {},
    {},
  )
  sendEvent(
    "hover",
    { do: "stuff", other: ":sdfa" },
    // @ts-expect-error
    {},
  )
})

it("...", () => {
  sendEvent("other")

  sendEvent(
    "other",
    // @ts-expect-error
    {},
  )
})
