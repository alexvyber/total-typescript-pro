import { Equal, Expect } from "../helpers/type-utils"

type CreateDataShape<TData, TError> = {
  data: TData
  error: TError
}

export type tests = [
  Expect<
    Equal<
      CreateDataShape<string, TypeError>,
      {
        data: string
        error: TypeError
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<number, Error>,
      {
        data: number
        error: Error
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<boolean, SyntaxError>,
      {
        data: boolean
        error: SyntaxError
      }
    >
  >,
]
