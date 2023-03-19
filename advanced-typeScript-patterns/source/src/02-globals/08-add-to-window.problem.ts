import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

declare global {
  interface Window {
    makeGreeting: () => string
  }
}

const window: Window & typeof globalThis = {} as Window & typeof globalThis

window.makeGreeting = () => "Hello, world!"

it("Should let you call makeGreeting from the window object", () => {
  expect(window.makeGreeting()).toBe("Hello, world!")

  type test1 = Expect<Equal<typeof window.makeGreeting, () => string>>
})

it("Should not be available on globalThis", () => {
  expect(
    // @ts-expect-error
    globalThis.makeGreeting,
  ).toBe(undefined)
})

/*




















































/**
 * Clues:
 *
 * 1. You'll need declare global again
 *
 * 2. Inside declare global, you'll need to modify the Window
 * interface to add a makeGreeting function
 */
