import { Equal, Expect } from "../helpers/type-utils"

export const inferItemLiteral = <const T extends number | string>(t: T) => {
  return {
    output: t,
  }
}

export const inferItemLiteral2 = <T extends string | number>(t: T) => {
  return {
    output: t,
  }
}

const result1 = inferItemLiteral("a")
const result2 = inferItemLiteral(123)
const result3 = inferItemLiteral2("a")
const result4 = inferItemLiteral2(123)

type tests = [
  Expect<Equal<typeof result1, { output: "a" }>>,
  Expect<Equal<typeof result2, { output: 123 }>>,
  Expect<Equal<typeof result3, { output: "a" }>>,
  Expect<Equal<typeof result4, { output: 123 }>>,
]

// @ts-expect-error
const error1 = inferItemLiteral({
  a: 1,
})

// @ts-expect-error
const error2 = inferItemLiteral([1, 2])

// @ts-expect-error
const error3 = inferItemLiteral2({
  a: 1,
})

// @ts-expect-error
const error4 = inferItemLiteral2([1, 2])
