import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

// TODO: work it out
export const composeGeneric =
  <Rest extends ((...args: any[]) => any)[], LastReturn>(
    ...funcs: [...Rest, (input: any) => LastReturn]
  ) =>
  (input: any): LastReturn => {
    return funcs.reduce((acc, fn) => fn(acc), input)
  }

function compose<T1, T2>(func1: (arg1: T1) => T2): (arg: T1) => T2
function compose<T1, T2, T3, T4>(func1: (arg1: T1) => T2, func2: (arg2: T2) => T3): (arg: T1) => T3
function compose<T1, T2, T3, T4>(
  func1: (arg1: T1) => T2,
  func2: (arg2: T2) => T3,
  func3: (arg3: T3) => T4,
): (arg: T1) => T4
function compose<T1, T2, T3, T4, T5>(
  func1: (arg1: T1) => T2,
  func2: (arg2: T2) => T3,
  func3: (arg3: T3) => T4,
  func4: (arg4: T4) => T5,
): (arg: T1) => T5
function compose<T1, T2, T3, T4, T5, T6>(
  func1: (arg1: T1) => T2,
  func2: (arg2: T2) => T3,
  func3: (arg3: T3) => T4,
  func4: (arg4: T4) => T5,
  func5: (arg5: T5) => T6,
): (arg: T1) => T5
function compose<T1, T2, T3, T4, T5, T6, T7>(
  func1: (arg1: T1) => T2,
  func2: (arg2: T2) => T3,
  func3: (arg3: T3) => T4,
  func4: (arg4: T4) => T5,
  func5: (arg5: T5) => T6,
  func6: (arg6: T6) => T7,
): (arg: T1) => T7
function compose(...funcs: Array<(input: any) => any>) {
  return (input: any) => {
    return funcs.reduce((acc, fn) => fn(acc), input)
  }
}

const addOne = (num: number) => {
  return num + 1
}

const addTwoAndStringify = compose(addOne, addOne, String)

it("Should compose multiple functions together", () => {
  const result = addTwoAndStringify(4)

  expect(result).toEqual("6")

  type tests = [Expect<Equal<typeof result, string>>]
})

it("Should error when the input to a function is not typed correctly", () => {
  const stringifyThenAddOne = compose(
    // addOne takes in a number - so it shouldn't be allowed after
    // a function that returns a string!
    // @ts-expect-error
    String,
    addOne,
  )
})

it("...", () => {
  const myFunc = compose(
    addOne,
    addTwoAndStringify,
    String,
    arg => arg + arg,
    arg => !!arg,
    arg => arg.valueOf(),
  )

  const res = myFunc(123123)
  console.log("🚀 ~ it ~ res:", res)

  type tests = [Expect<Equal<typeof res, boolean>>]
})
