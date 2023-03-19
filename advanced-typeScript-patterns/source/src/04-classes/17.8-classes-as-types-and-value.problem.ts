import { Equal, Expect } from "../helpers/type-utils"

class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message)
    this.name = "CustomError"
  }
}

const err = new CustomError("Some", 111)

// How do we type the 'error' parameter?
const handleCustomError = (error: CustomError) => {
  console.error(error.code)

  type test = Expect<Equal<typeof error.code, number>>
}

handleCustomError(err)
handleCustomError({
  message: "asdfasdf",
  code: 123,
  name: "asdfasdf",
})

export {}
