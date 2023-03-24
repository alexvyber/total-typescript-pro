import { Equal, Expect } from "../helpers/type-utils"

type Fruit = "apple" | "banana" | "orange"

type GetAppleOrBanana<T> = T extends "apple" | "banana" ? T : never

type AppleOrBanana = GetAppleOrBanana<Fruit>

export type tests = [Expect<Equal<AppleOrBanana, "apple" | "banana">>]
