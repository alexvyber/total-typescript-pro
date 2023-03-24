import { Equal, Expect } from "../helpers/type-utils"

declare const brand: unique symbol
type Branded<T, Brand> = T & { [brand]: Brand }
type BrandedId = Branded<string, "Id">

interface Example {
  name: string
  age: number
  id: string
  idSomething: string
  organisationId: string
  groupId: string
  someId: BrandedId
  someIdInTheMiddle: BrandedId
  middle: "middle"
}

type SearchFroIds = `id${string}` | `${string}Id${string}`
type OnlyIdKeys<T> = {
  [key in keyof T as key extends SearchFroIds ? key : never]: T[key]
}

type Result = OnlyIdKeys<Example>
type EmptyResult = OnlyIdKeys<{}>

export type tests = [
  Expect<
    Equal<
      OnlyIdKeys<Example>,
      {
        id: string
        organisationId: string
        idSomething: string
        groupId: string
        someId: BrandedId
        someIdInTheMiddle: BrandedId
      }
    >
  >,
  Expect<Equal<OnlyIdKeys<{}>, {}>>,
]
