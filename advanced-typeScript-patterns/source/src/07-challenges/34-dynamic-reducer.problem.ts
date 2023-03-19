import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

/**
 * It turns a record of handler information into a discriminated union:
 *
 * | { type: "LOG_IN", username: string, password: string }
 * | { type: "LOG_OUT" }
 */
type PayloadsToDiscriminatedUnion<T extends Record<string, any>> = {
  [K in keyof T]: { type: K } & T[K]
}[keyof T]

type TestingPayloadsToDiscriminatedUnion = PayloadsToDiscriminatedUnion<{
  LOG_IN: { username: string; password: string }
  LOG_OUT: {}
}>

export class DynamicReducer<State, PayloadMap extends Record<string, any> = {}> {
  private handlers = {} as Record<string, (state: State, action: any) => State>

  addHandler<Type extends string, Payload extends object>(
    type: Type,
    handler: (state: State, payload: Payload) => State,
  ): DynamicReducer<State, PayloadMap & Record<Type, Payload>> {
    this.handlers[type] = handler

    return this as any
  }

  reduce(state: State, action: PayloadsToDiscriminatedUnion<PayloadMap>): State {
    const handler = this.handlers[action.type]
    if (!handler) {
      return state
    }

    return handler(state, action) as any
  }
}

interface State {
  username: string
  password: string
  // more: number
}

const reducer = new DynamicReducer<State>()
  .addHandler("LOG_IN", (state, action: { username: string; password: string }) => {
    return {
      username: action.username,
      password: action.password,
    }
  })
  .addHandler("LOG_OUT", () => {
    return {
      username: "",
      password: "",
    }
  })
  .addHandler("SOME_STUFF", () => {
    return {
      username: "",
      password: "",
    }
  })
  .addHandler("DO_NOTHING", (state, action) => ({ ...state }))
  .addHandler("DO_UPPERCASE", (state, action) => {
    return Object.fromEntries(
      (
        Object.entries(state) as unknown as Array<
          [key: keyof typeof state, value: typeof state[keyof typeof state]]
        >
      ).map(([key, value]) => [key, value.toUpperCase()]),
    ) as Record<keyof State, string>
  })

it("Should return the new state after LOG_IN", () => {
  const state = reducer.reduce(
    { username: "", password: "" },
    { type: "LOG_IN", username: "foo", password: "bar" },
  )

  type test = [Expect<Equal<typeof state, State>>]

  expect(state).toEqual({ username: "foo", password: "bar" })
})

it("Should return the new state after LOG_OUT", () => {
  const state = reducer.reduce({ username: "foo", password: "bar" }, { type: "LOG_OUT" })

  type test = [Expect<Equal<typeof state, State>>]

  expect(state).toEqual({ username: "", password: "" })
})

it("Should error if you pass it an incorrect action", () => {
  const state = reducer.reduce(
    { username: "foo", password: "bar" },
    {
      // @ts-expect-error
      type: "NOT_ALLOWED",
    },
  )
})

it("Should error if you pass an incorrect payload", () => {
  const state = reducer.reduce(
    { username: "foo", password: "bar" },
    // @ts-expect-error
    {
      type: "LOG_IN",
    },
  )
})

it("Should return the same state after DO_NOTHING", () => {
  const baseState = { username: "asdfasdf", password: "asdfasdf" }
  const state = reducer.reduce(baseState, { type: "DO_NOTHING" })

  type test = [Expect<Equal<typeof state, State>>]

  expect(state).toEqual(baseState)
})

it("Should return state with all values uppercased after DO_NOTHING", () => {
  const baseState = { username: "asdfasdf 123 asdfasdaewrrqwer", password: "asdfasdf" }
  const uppercasedState = {
    username: baseState.username.toUpperCase(),
    password: baseState.password.toUpperCase(),
  }
  const state = reducer.reduce(baseState, { type: "DO_UPPERCASE" })

  type test = [Expect<Equal<typeof state, State>>]

  expect(state).toEqual(uppercasedState)
})
