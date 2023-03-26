import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

function youSayGoodbyeISayHello<T extends "hello" | "goodbye">(
  greeting: T,
): T extends "goodbye" ? "hello" : "goodbye" {
  return (greeting === "goodbye" ? "hello" : "goodbye") as any
}

function youSayGoodbyeISayHello2<T extends "hello" | "goodbye">(
  greeting: T,
): Exclude<"hello" | "goodbye", T> {
  return (greeting === "goodbye" ? "hello" : "goodbye") as any
}

it("Should return goodbye when hello is passed in", () => {
  const result = youSayGoodbyeISayHello("hello")
  const result2 = youSayGoodbyeISayHello2("hello")

  type test = [Expect<Equal<typeof result, "goodbye">>]
  type test2 = [Expect<Equal<typeof result2, "goodbye">>]

  expect(result).toEqual("goodbye")
  expect(result2).toEqual("goodbye")
})

it("Should return hello when goodbye is passed in", () => {
  const result = youSayGoodbyeISayHello("goodbye")
  const result2 = youSayGoodbyeISayHello("goodbye")

  type test = [Expect<Equal<typeof result, "hello">>]
  type test2 = [Expect<Equal<typeof result2, "hello">>]

  expect(result).toEqual("hello")
  expect(result2).toEqual("hello")
})
