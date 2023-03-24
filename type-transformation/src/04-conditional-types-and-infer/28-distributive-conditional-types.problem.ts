import { Equal, Expect } from "../helpers/type-utils";

type Fruit = "apple" | "banana" | "orange";

type AppleOrBanana = Fruit extends "apple" | "banana"
  ? "apple" | "banana"
  : never;

type Get<T> = T extends "apple" | "banana" ? "apple" | "banana" : never;
type Result = Get<Fruit>;

type ResultTwo = Fruit extends infer T
  ? T extends "apple" | "banana"
    ? "apple" | "banana"
    : never
  : never;

type tests = [
  Expect<Equal<AppleOrBanana, "apple" | "banana">>,
  Expect<Equal<Result, "apple" | "banana">>,
  Expect<Equal<ResultTwo, "apple" | "banana">>
];
