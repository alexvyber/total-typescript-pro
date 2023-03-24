import { Equal, Expect } from "../helpers/type-utils"

interface FruitMap {
  apple: "red"
  banana: "yellow"
  orange: "orange"
}

type TransformedFruit = {
  [F in keyof FruitMap]: `${F}:${FruitMap[F]}`
}[keyof FruitMap]

export type tests = [
  Expect<Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">>,
]
