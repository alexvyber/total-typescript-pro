import { Equal, Expect } from "../helpers/type-utils"

const getUser = () => {
  return Promise.resolve({
    id: "123",
    name: "John",
    email: "john@example.com",
  })
}

type ReturnValue = Awaited<ReturnType<typeof getUser>>

export type tests = [Expect<Equal<ReturnValue, { id: string; name: string; email: string }>>]
