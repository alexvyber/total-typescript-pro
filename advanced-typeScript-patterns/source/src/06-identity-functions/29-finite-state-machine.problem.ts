import { F } from "ts-toolbelt"

/**
 * Clue: F.NoInfer is part of the solution!
 *
 * You'll need to modify the interface below
 * to get it to work.
 */
interface FSMConfig<State extends string> {
  initial: F.NoInfer<State>
  states: Record<
    State,
    {
      onEntry?: () => void
    }
  >
}

export const makeFiniteStateMachine = <State extends string>(config: FSMConfig<State>) => config

const config = makeFiniteStateMachine({
  initial: "a",
  states: {
    a: {
      onEntry: () => {
        console.log("a")
      },
    },
    // b should be allowed to be specified!
    b: {},
  },
})

const config2 = makeFiniteStateMachine({
  // c should not be allowed! It doesn't exist on the states below
  // @ts-expect-error
  initial: "c",
  states: {
    a: {},
    // b should be allowed to be specified!
    b: {},
    d: {},
  },
})

config2.states.a.onEntry?.()
