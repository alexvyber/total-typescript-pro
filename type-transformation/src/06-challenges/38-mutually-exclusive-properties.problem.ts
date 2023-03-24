import { Equal, Expect } from "../helpers/type-utils"

interface Attributes {
  id: string
  email: string
  username: string
  other: number
}

/**
 * How do we create a type helper that represents a union
 * of all possible combinations of Attributes?
 */

type Get<T> = {
  [key in keyof T]: Record<key, T[key]>
}[keyof T]

type R = Get<Attributes>
type Result = Get<Attributes>
type MutuallyExclusive<T> = Get<T>

type ExclusiveAttributes = MutuallyExclusive<Attributes>

export type tests = [
  Expect<
    Equal<
      ExclusiveAttributes,
      | {
          id: string
        }
      | {
          email: string
        }
      | {
          username: string
        }
      | {
          other: number
        }
    >
  >,
]
