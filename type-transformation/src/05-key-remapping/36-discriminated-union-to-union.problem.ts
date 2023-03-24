import { Equal, Expect } from "../helpers/type-utils"

type Fruit =
  | {
      name: "apple"
      color: "red"
    }
  | {
      name: "banana"
      color: "yellow"
    }
  | {
      name: "orange"
      color: "orange"
    }

type Result = { [N in Fruit as N["name"]]: `${N["name"]}:${N["color"]}` }[Fruit["name"]]

type TransformedFruit = Result

export type tests = [
  Expect<Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">>,
]
