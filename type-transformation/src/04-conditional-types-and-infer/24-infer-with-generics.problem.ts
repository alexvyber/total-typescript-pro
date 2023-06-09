import { Equal, Expect } from "../helpers/type-utils"

interface MyComplexInterface<Event, Context, Name, Point> {
  getEvent: () => Event
  getContext: () => Context
  getName: () => Name
  getPoint: () => Point
}

type Example = MyComplexInterface<"click", "window", "my-event", { x: 12; y: 14 }>

type GetPoint<T> = T extends { getPoint: () => infer P } ? P : never
type GetPointTwo<T> = T extends MyComplexInterface<any, any, any, infer P> ? P : never

export type tests = [Expect<Equal<GetPoint<Example>, { x: 12; y: 14 }>>]
export type tests2 = [Expect<Equal<GetPointTwo<Example>, { x: 12; y: 14 }>>]
