import { Equal, Expect } from "../helpers/type-utils"

export const createSet = <T = unknown>(initialValue?: T) => {
  // if (initialValue) {
  //   if (Array.isArray(initialValue)) return new Set<T>(initialValue)
  //   return new Set<T>([initialValue])
  // }

  return new Set<T>()
}

const stringSet = createSet<string>()
const numberSet = createSet<number>()
const unknownSet = createSet()
const more = createSet([1, 2, 3, 4, 5])
const asdf = more.values()

type tests = [
  Expect<Equal<typeof stringSet, Set<string>>>,
  Expect<Equal<typeof numberSet, Set<number>>>,
  Expect<Equal<typeof unknownSet, Set<unknown>>>,
  Expect<Equal<typeof unknownSet, Set<unknown>>>,
]
