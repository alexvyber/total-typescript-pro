import { Equal, Expect } from "../helpers/type-utils"

interface FruitMap {
  apple: "red"
  banana: "yellow"
  orange: "orange"
}

type TransformedFruit = {
  [key in keyof FruitMap]: `${key}:${FruitMap[key]}`
}[keyof FruitMap]

export type tests = [
  Expect<Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">>,
]
