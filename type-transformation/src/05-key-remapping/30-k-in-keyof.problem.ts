import { Equal, Expect } from "../helpers/type-utils"

interface Attributes {
  firstName: string
  lastName: string
  age: number
}

type AttributeGetters = { [key in keyof Attributes]: () => Attributes[key] }

type SomeRandomShit = { [key in keyof Attributes]: Record<key, key> }
type MoreRandomShit = {
  [key in keyof Attributes]: Record<`${key}${Capitalize<key>}`, key>
}

const obj = {
  age: {
    age: "age",
  },
  lastName: {
    lastName: "lastName",
  },
} satisfies Partial<SomeRandomShit>

const more: Partial<MoreRandomShit> = {
  age: {
    ageAge: "age",
  },
}

export type tests = [
  Expect<
    Equal<
      AttributeGetters,
      {
        firstName: () => string
        lastName: () => string
        age: () => number
      }
    >
  >,
]
