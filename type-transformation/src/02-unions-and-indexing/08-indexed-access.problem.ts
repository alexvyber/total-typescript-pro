import { Equal, Expect } from "../helpers/type-utils"

export const fakeDataDefaults = {
  String: "Default string",
  Int: 1,
  Float: 1.14,
  Boolean: true,
  ID: "id",
  Some: {
    some: "string",
  },
}

type Defaults = typeof fakeDataDefaults

export type StringType = Defaults["String"]
export type IntType = Defaults["Int"]
export type FloatType = Defaults["Float"]
export type BooleanType = Defaults["Boolean"]
export type IDType = Defaults["ID"]
export type SomeType = Defaults["Some"]

export type tests = [
  Expect<Equal<StringType, string>>,
  Expect<Equal<IntType, number>>,
  Expect<Equal<FloatType, number>>,
  Expect<Equal<BooleanType, boolean>>,
  Expect<Equal<IDType, string>>,
  Expect<
    Equal<
      SomeType,
      {
        some: string
      }
    >
  >,
]
