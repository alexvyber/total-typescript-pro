import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

type Params<T extends object> = {
  [key in keyof T]-?: T[key]
}

const returnBothOfWhatIPassIn = <T1, T2>(params: { a: T1; b: T2 }) => {
  return {
    first: params.a,
    second: params.b,
  }
}

const returnBothOfWhatIPassInTwo = (
  params: Params<{ a: string; b: number; z?: { some: string } }>,
) => {
  return {
    first: params.a,
    second: params.b,
    third: params.z,
  }
}

it("Should return an object where a -> first and b -> second", () => {
  const result = returnBothOfWhatIPassIn({
    a: "a",
    b: 1,
  })

  const resultTwo = returnBothOfWhatIPassInTwo({
    a: "a",
    b: 1,
    z: {
      some: "some",
    },
  })

  expect(result).toEqual({
    first: "a",
    second: 1,
  })

  type test1 = Expect<
    Equal<
      typeof result,
      {
        first: string
        second: number
      }
    >
  >
})
