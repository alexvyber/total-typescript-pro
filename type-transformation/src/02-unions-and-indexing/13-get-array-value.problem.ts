import { Equal, Expect } from "../helpers/type-utils"

const fruits = ["apple", "banana", "orange"] as const

type AppleOrBanana = Exclude<Fruit, "orange">
type AppleOrBananaTwo = typeof fruits[0 | 1]
type Fruit = typeof fruits[number]

export type tests = [
  Expect<Equal<AppleOrBanana, "apple" | "banana">>,
  Expect<Equal<AppleOrBananaTwo, "apple" | "banana">>,
  Expect<Equal<Fruit, "apple" | "banana" | "orange">>,
]
