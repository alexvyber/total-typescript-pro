import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

const makeSafe =
  <T, A extends unknown[]>(func: (...args: A) => T) =>
  (
    ...args: A
  ):
    | {
        type: "success"
        result: T
      }
    | {
        type: "failure"
        error: Error
      } => {
    try {
      const result = func(...args)

      return {
        type: "success",
        result,
      }
    } catch (e) {
      return {
        type: "failure",
        error: e as Error,
      }
    }
  }

const makeSafe2 =
  <Func extends (...args: any[]) => any>(func: Func) =>
  (
    ...args: Parameters<Func>
  ):
    | {
        type: "success"
        result: ReturnType<Func>
      }
    | {
        type: "failure"
        error: Error
      } => {
    try {
      const result = func(args)

      return {
        type: "success",
        result,
      }
    } catch (e) {
      return {
        type: "failure",
        error: e as Error,
      }
    }
  }

it("Should return the result with a { type: 'success' } on a successful call", () => {
  const func = makeSafe(() => 1)
  const func2 = makeSafe2(() => 1)

  const result = func()
  const result2 = func()

  expect(result).toEqual({
    type: "success",
    result: 1,
  })
  expect(result2).toEqual({
    type: "success",
    result: 1,
  })

  type tests = [
    Expect<
      Equal<
        typeof result,
        | {
            type: "success"
            result: number
          }
        | {
            type: "failure"
            error: Error
          }
      >
    >,
    Expect<
      Equal<
        typeof result2,
        | {
            type: "success"
            result: number
          }
        | {
            type: "failure"
            error: Error
          }
      >
    >,
  ]
})

it("Should return the error on a thrown call", () => {
  const func = makeSafe(() => {
    if (1 > 2) {
      return "123"
    }
    throw new Error("Oh dear")
  })

  const func2 = makeSafe2(() => {
    if (1 > 2) {
      return "123"
    }
    throw new Error("Oh dear")
  })

  const result = func()
  const result2 = func2()

  expect(result).toEqual({
    type: "failure",
    error: new Error("Oh dear"),
  })
  expect(result2).toEqual({
    type: "failure",
    error: new Error("Oh dear"),
  })

  type tests = [
    Expect<
      Equal<
        typeof result,
        | {
            type: "success"
            result: string
          }
        | {
            type: "failure"
            error: Error
          }
      >
    >,
    Expect<
      Equal<
        typeof result2,
        | {
            type: "success"
            result: string
          }
        | {
            type: "failure"
            error: Error
          }
      >
    >,
  ]
})

it("Should properly match the function's arguments", () => {
  const func = makeSafe((a: number, b: string) => {
    return `${a} ${b}`
  })

  const func2 = makeSafe2((a: number, b: string) => {
    return `${a} ${b}`
  })
  // @ts-expect-error
  func()

  // @ts-expect-error
  func(1, 1)

  func(1, "1")

  // @ts-expect-error
  func2()

  // @ts-expect-error
  func2(1, 1)

  func2(1, "1")
})
