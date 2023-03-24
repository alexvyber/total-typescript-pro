// Might come in handy!
// import { S } from "ts-toolbelt";
// https://millsp.github.io/ts-toolbelt/modules/string_split.html

import { S } from "ts-toolbelt";
import { Equal, Expect } from "../helpers/type-utils";
// type SS = S.Split;
type Path = "Users/John/Documents/notes.txt";

type Split<T, C extends string = "/"> = T extends `${infer A}${C}${infer B}`
  ? B extends `${string}${C}${string}`
    ? [A, ...Split<B, C>]
    : [A, B]
  : [T];
type A = Split<Path, "/">;

type SplitPath = Split<Path, "/">;

type tests = [
  Expect<Equal<SplitPath, ["Users", "John", "Documents", "notes.txt"]>>
];
