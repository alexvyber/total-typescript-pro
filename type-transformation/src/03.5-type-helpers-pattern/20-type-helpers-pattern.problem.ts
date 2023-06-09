import { Equal, Expect } from "../helpers/type-utils"

type ReturnWhatIPassIn<T = any> = T

export type tests = [
  Expect<Equal<ReturnWhatIPassIn<1>, 1>>,
  Expect<Equal<ReturnWhatIPassIn<"1">, "1">>,
  Expect<Equal<ReturnWhatIPassIn<true>, true>>,
  Expect<Equal<ReturnWhatIPassIn<false>, false>>,
  Expect<Equal<ReturnWhatIPassIn<null>, null>>,
  Expect<Equal<ReturnWhatIPassIn, any>>,
]
