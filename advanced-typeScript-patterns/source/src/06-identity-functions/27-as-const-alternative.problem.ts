import { Equal, Expect } from "../helpers/type-utils"
import { F } from "ts-toolbelt"

/**
 * This is an identity function. It takes a value and returns the same value.
 * Except that it doesn't work great on arrays, or object values.
 *
 * Below, you can see that fruits is typed as
 *
 * { name: string; price: number }[]
 *
 * instead of [{ name: "apple"; price: 1 }, { name: "banana"; price: 2 }]
 *
 * We could handle this using 'as const', but sometimes that isn't possible.
 *
 * So, we can use F.Narrow from ts-toolbelt instead.
 */

type e = F.Narrow<{ name: "asdf" }>

export const asConst = <T>(t: F.Narrow<T>) => t
// export const asConst = <const T>(t: T) => t

const fruits = asConst([
  {
    name: "apple",
    price: 1,
  },
  {
    name: "banana",
    price: 2,
  },
])

const arr = [
  {
    name: "apple",
    price: 1,
  },
  {
    name: "banana",
    price: 2,
  },
] as const

type r = Readonly<typeof arr>

type tests = [
  Expect<
    Equal<
      typeof fruits,
      [
        {
          name: "apple"
          price: 1
        },
        {
          name: "banana"
          price: 2
        },
      ]
    >
  >,
]
