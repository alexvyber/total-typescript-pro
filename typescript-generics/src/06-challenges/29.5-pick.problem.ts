import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

type PrettifyPickReturn<T> = T extends Pick<infer A, infer B> ? { [key in B]: A[key] } : T

const pick = <Obj, Keys extends keyof Obj>(obj: Obj, picked: Array<Keys>) => {
  return picked.reduce((acc, key) => {
    acc[key] = obj[key]
    return acc
  }, {} as Pick<Obj, Keys>) as PrettifyPickReturn<Pick<Obj, Keys>>
}

it("Should pick the keys from the object", () => {
  const result = pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    ["a", "b"],
  )

  expect(result).toEqual({ a: 1, b: 2 })

  type test = Expect<Equal<typeof result, { a: number; b: number }>>
})

it("Should not allow you to pass keys which do not exist in the object", () => {
  pick(
    {
      a: 1,
      b: 2,
      c: 3,
    },
    [
      "a",
      "b",
      // @ts-expect-error
      "d",
    ],
  )
})
