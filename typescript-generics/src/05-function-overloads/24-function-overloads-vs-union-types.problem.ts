import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

type Func<R> = (...args: any) => R

function runGenerator<R>(generator: Func<R>): R
function runGenerator<R>(generator: { run: Func<R> }): R
function runGenerator<R>(generator: Func<R> | { run: Func<R> }): R {
  if (typeof generator === "function") {
    return generator()
  }

  return generator.run()
}

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator({
    run: () => "hello",
  })

  expect(result).toBe("hello")

  type test1 = Expect<Equal<typeof result, string>>
})

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator(() => "hello")

  expect(result).toBe("hello")

  type test1 = Expect<Equal<typeof result, string>>
})

function runGenerator2<R>(generator: Func<R> | { run: Func<R> }): R {
  if (typeof generator === "function") {
    return generator()
  }

  return generator.run()
}

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator2({
    run: () => "hello",
  })

  expect(result).toBe("hello")

  type test1 = Expect<Equal<typeof result, string>>
})

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator2(() => "hello")

  expect(result).toBe("hello")

  type test1 = Expect<Equal<typeof result, string>>
})
