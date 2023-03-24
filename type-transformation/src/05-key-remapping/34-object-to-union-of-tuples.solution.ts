import { Equal, Expect } from "../helpers/type-utils"

interface Values {
  email: string
  firstName: string
  lastName: string
}

type ValuesAsUnionOfTuples = {
  [V in keyof Values]: [V, Values[V]]
}[keyof Values]

export type tests = [
  Expect<
    Equal<ValuesAsUnionOfTuples, ["email", string] | ["firstName", string] | ["lastName", string]>
  >,
]
