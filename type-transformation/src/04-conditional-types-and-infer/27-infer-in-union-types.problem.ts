import { Equal, Expect } from "../helpers/type-utils";

const parser1 = {
  parse: () => 1,
  more: "asdfasdf",
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
  some: "asdfasdf",
};

type GetParserResult<T> = T extends () => infer R
  ? R
  : T extends {
      [key in keyof T]: () => infer R2;
    }
  ? R2
  : never;

type GetParserResultTwo<T> = T extends
  | (() => infer R)
  | {
      parse: () => infer R;
    }
  | {
      extract: () => infer R;
    }
  ? R
  : never;

type tests = [
  // @ts-expect-error
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  // @ts-expect-error
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>
];

type tests2 = [
  Expect<Equal<GetParserResultTwo<typeof parser1>, number>>,
  Expect<Equal<GetParserResultTwo<typeof parser2>, string>>,
  Expect<Equal<GetParserResultTwo<typeof parser3>, boolean>>
];
