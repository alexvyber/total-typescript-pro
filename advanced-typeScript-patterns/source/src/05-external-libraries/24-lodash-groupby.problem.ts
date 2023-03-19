import _ from "lodash"
import { expect, it } from "vitest"
import { doNotExecute, Equal, Expect } from "../helpers/type-utils"

/**
 * We've made a reusable function here to group
 * arrays of objects by age. I want you to:
 *
 * 1. Make sure that the errors (below) disappear
 * 2. Take a look at the typings for _.groupBy to
 * see if you can understand them.
 */
// const groupByAge = <T extends object>(array: T[], groupFactor: keyof T) => {
//   const grouped = _.groupBy<T>(array, groupFactor)

//   return grouped
// }

const groupByAge = <T extends object>(array: T[], iteratee: keyof T) => {
  const grouped = _.groupBy<T>(array, iteratee)

  return grouped
}

const result = groupByAge(
  [
    {
      name: "John",
      age: 20,
    },
    {
      name: "Jane",
      age: 20,
    },
    {
      name: "Mary",
      age: 30,
    },
  ],
  "age",
)

it("Should group the items by age", () => {
  expect(result).toEqual({
    20: [
      {
        name: "John",
        age: 20,
      },
      {
        name: "Jane",
        age: 20,
      },
    ],
    30: [
      {
        name: "Mary",
        age: 30,
      },
    ],
  })

  type tests = [Expect<Equal<typeof result, _.Dictionary<{ name: string; age: number }[]>>>]
})

it("Should not let you pass in an array of objects NOT containing age", () => {
  doNotExecute(() => {
    groupByAge(
      [
        {
          name: "John",
          age: 120,
        },

        {
          name: "Bill",
          age: 12,
        },
      ],
      "age",
    )
  })
})
