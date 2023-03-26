import { Equal, Expect } from "../helpers/type-utils"

const makeStatus = <const Statuses extends readonly string[]>(statuses: Statuses) => {
  return statuses
}

const makeStatus2 = <Statuses extends string[]>(statuses: [...Statuses]) => {
  return statuses
}

const makeStatus3 = <S extends string>(statuses: Array<S>) => {
  return statuses
}

const statuses = makeStatus(["INFO", "DEBUG", "ERROR", "WARNING"])
const statuses2 = makeStatus2(["INFO", "DEBUG", "ERROR", "WARNING"])
const statuses3 = makeStatus3(["INFO", "DEBUG", "ERROR", "WARNING"])

type tests = [Expect<Equal<typeof statuses, readonly ["INFO", "DEBUG", "ERROR", "WARNING"]>>]
type tests2 = [Expect<Equal<typeof statuses2, ["INFO", "DEBUG", "ERROR", "WARNING"]>>]
type tests3 = [Expect<Equal<typeof statuses3, Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">>>]
