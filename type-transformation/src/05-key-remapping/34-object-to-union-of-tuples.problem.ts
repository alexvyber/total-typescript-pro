import { Equal, Expect } from "../helpers/type-utils"

interface Values {
  email: string
  firstName: string
  lastName: string
}

type ValuesAsUnionOfTuples = {
  [K in keyof Values]: [K, Values[K]]
}

type Result = ValuesAsUnionOfTuples[keyof ValuesAsUnionOfTuples]

export type tests = [
  Expect<Equal<Result, ["email", string] | ["firstName", string] | ["lastName", string]>>,
]
