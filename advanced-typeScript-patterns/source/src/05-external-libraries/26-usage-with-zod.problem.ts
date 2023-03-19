import { expect, it } from "vitest"
import { z } from "zod"

const makeZodSafeFunction = <Value, Result>(
  schema: z.Schema<Value>,
  func: (args: Value) => Result,
) => {
  return (args: Value) => {
    const result = schema.parse(args)
    return func(result)
  }
}

const addTwoNumbersArg = z.object({
  a: z.number(),
  b: z.number(),
})

const addConcatTwoStringArg = z.object({
  one: z.string(),
  two: z.string(),
})

const addTwoNumbers = makeZodSafeFunction(addTwoNumbersArg, args => args.a + args.b)
const addConcatTwoString = makeZodSafeFunction(addConcatTwoStringArg, args => args.one + args.two)

it("Should error on the type level AND the runtime if you pass incorrect params", () => {
  expect(() =>
    addTwoNumbers(
      // @ts-expect-error
      { a: 1, badParam: 3 },
    ),
  ).toThrow()

  expect(() =>
    addConcatTwoString(
      // @ts-expect-error
      { one: "asdf", three: "qwer" },
    ),
  ).toThrow()
})

it("Should succeed if you pass the correct type", () => {
  expect(addTwoNumbers({ a: 1, b: 2 })).toBe(3)
  expect(addConcatTwoString({ one: "asdf", two: "qwer" })).toBe("asdfqwer")
})
