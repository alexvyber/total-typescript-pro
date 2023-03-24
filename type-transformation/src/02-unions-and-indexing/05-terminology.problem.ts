/**
 * It's important to understand the terminology around unions:
 *
 * One of the type declarations below is a union.
 * One of the type declarations below is a discriminated union.
 * One of the type declarations below is an enum.
 *
 * Which is which?
 */

type A =
  | {
      type: "a";
      a: "Some";
    }
  | {
      type: "b";
      b: "Other";
    }
  | {
      type: "c";
      c: "More";
    };

function doStuff(a: A) {
  if (a.type === "a") {
    a.a;
  }

  if (a.type === "c") {
    a.c;
  }
}

type B = "a" | "b" | "c";

enum C {
  A = "a",
  B = "b",
  C = "c",
}

export {};
