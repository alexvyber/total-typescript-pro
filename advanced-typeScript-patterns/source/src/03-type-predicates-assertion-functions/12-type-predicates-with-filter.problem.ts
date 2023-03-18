import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export const values = ["a", "b", undefined, "c", undefined, null, 12];

type NotNullOrUndefiend<T> = T extends undefined ? never : NonNullable<T>;

const predicate = (
  value: unknown
): value is NotNullOrUndefiend<typeof values[number]> => Boolean(value);

const filteredValues = values.filter(predicate);

it("Should filter out the undefined values", () => {
  expect(filteredValues).toEqual(["a", "b", "c"]);
});

it('Should be of type "string[]"', () => {
  // type test1 = Expect<Equal<typeof filteredValues, string[]>>;
  type test2 = Expect<Equal<typeof filteredValues, (string | number)[]>>;
});
