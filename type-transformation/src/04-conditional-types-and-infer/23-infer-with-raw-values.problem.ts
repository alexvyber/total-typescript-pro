import { Equal, Expect } from "../helpers/type-utils";

type GetDataValue<T> = T extends { data: infer D } ? D : never;
type GetDataValueTwo<T> = T extends { data: unknown } ? T["data"] : never;

type tests = [
  Expect<Equal<GetDataValue<{ data: "hello" }>, "hello">>,
  Expect<Equal<GetDataValue<{ data: { name: "hello" } }>, { name: "hello" }>>,
  Expect<
    Equal<
      GetDataValue<{ data: { name: "hello"; age: 20 } }>,
      { name: "hello"; age: 20 }
    >
  >,
  // Expect that if you pass in string, it
  // should return never
  Expect<Equal<GetDataValue<string>, never>>
];

type tests2 = [
  Expect<Equal<GetDataValueTwo<{ data: "hello" }>, "hello">>,
  Expect<
    Equal<GetDataValueTwo<{ data: { name: "hello" } }>, { name: "hello" }>
  >,
  Expect<
    Equal<
      GetDataValueTwo<{ data: { name: "hello"; age: 20 } }>,
      { name: "hello"; age: 20 }
    >
  >,
  // Expect that if you pass in string, it
  // should return never
  Expect<Equal<GetDataValueTwo<string>, never>>
];
