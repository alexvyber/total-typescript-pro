import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

process.env.MY_ENV_VAR = "Hello, world!"

const requiredServerEnvs = [
  "NODE_ENV",
  "DATABASE_URL",
  "SOME_SHIT",
  "SESSION_SECRET",
  "ENCRYPTION_SECRET",
  "MY_ENV_VAR",
] as const

declare global {
  namespace NodeJS {
    type ProcessEnvType = {
      [key in (typeof requiredServerEnvs)[number]]: string
    }

    interface ProcessEnv extends ProcessEnvType {}
    // interface ProcessEnv {
    //   MY_ENV_VAR: string;
    // }
  }
}

it("Should be declared as a string", () => {
  expect(process.env.MY_ENV_VAR).toEqual("Hello, world!")
})

it("Should NOT have undefined in the type", () => {
  const myVar = process.env.MY_ENV_VAR
  type tests = [Expect<Equal<typeof myVar, string>>]
})

/*































































/**
 * Clues:
 *
 * 1. You'll need declare global again
 *
 * 2. You'll need to use the NodeJS namespace
 *
 * 3. Inside the NodeJS namespace, you'll need to add a
 * MY_ENV_VAR property to the ProcessEnv interface
 */
