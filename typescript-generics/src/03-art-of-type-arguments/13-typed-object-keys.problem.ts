import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

/**
 * There are two possible solutions to this problem - and it's
 * to do with the way you specify the generic. Can you get
 * both solutions?
 */
const typedObjectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>
}

const typedObjectKeys2 = <Key extends string>(obj: Record<Key, any>) => {
  return Object.keys(obj) as Array<Key>
}

it("Should return the keys of the object", () => {
  const result1 = typedObjectKeys({
    a: 1,
    b: 2,
  })

  const result2 = typedObjectKeys2({
    a: 1,
    b: 2,
  })

  expect(result1).toEqual(["a", "b"])
  expect(result2).toEqual(["a", "b"])

  type test = Expect<Equal<typeof result1, Array<"a" | "b">>>
  type test2 = Expect<Equal<typeof result2, Array<"a" | "b">>>
})
