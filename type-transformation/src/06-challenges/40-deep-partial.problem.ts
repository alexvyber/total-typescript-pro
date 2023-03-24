import { Equal, Expect } from "../helpers/type-utils"

type O = {
  a: Array<{
    b: string
  }>
}
type S = never extends any ? true : false
type T = any extends never ? false : true
type DeepPartial<T> = {
  [key in keyof T]?: T[key] extends Array<object>
    ? Array<{ [k in keyof T[key][number]]?: T[key][number][k] }>
    : T[key] extends Array<any>
    ? T[key]
    : T[key] extends object
    ? DeepPartial<T[key]>
    : T[key]
}

type DeepPartialTwo<T> = T extends Array<infer U>
  ? Array<DeepPartialTwo<U>>
  : { [K in keyof T]?: DeepPartialTwo<T[K]> }

const po: DeepPartial<O> = {
  a: [
    {
      b: "asdasdf",
    },
    {},
  ],
}

const po2: DeepPartial<O> = {}

type MyType = {
  a: string
  b: number
  c: {
    d: string
    e: {
      f: string

      g: {
        h: string
        i: string
      }[]
      k: string[]
      // j: { jj: never; ii: Array<{ i?: string }>; obj: { a?: string } }[]
      // m: { jj: never; ii: { i: string; other: { s: number } }[] }[]
      n: {
        jj: never
        // ii: Array<{ i: string }>
        obj: { a: string; b: Array<never>; c: { some: never; other: {} }[] }
        arr: { a: string; b: Array<never>; c: { some: never; other: {} }[] }[]
        shit: MyType
      }[]
    }
  }
}

type Result = DeepPartial<MyType>
type ResultTwo = DeepPartialTwo<MyType>

export type tests = [
  // Expect<
  //   Equal<
  //     Result,
  //     {
  //       a?: string
  //       b?: number
  //       c?: {
  //         d?: string
  //         e?: {
  //           f?: string
  //           g?: {
  //             h?: string
  //             i?: string
  //           }[]
  //           k?: string[]
  //           n?: {
  //             jj?: never
  //             obj?: { a?: string; b?: Array<never>; c?: { some?: never; other?: {} }[] }
  //             ii?: Array<{ i?: string }>
  //           }[]
  //           // j?: { jj?: never; ii?: Array<{ i: string }> }[]
  //           // m?: { jj?: never; ii?: { i: string; other: { s: number } }[] }[]
  //         }
  //       }
  //     }
  //   >
  // >,
  Expect<
    Equal<
      ResultTwo,
      {
        a?: string
        b?: number
        c?: {
          d?: string
          e?: {
            f?: string
            g?: {
              h?: string
              i?: string
            }[]
            k?: string[]
            n?: {
              jj?: never
              obj?: { a?: string; b?: Array<never>; c?: { some?: never; other?: {} }[] }
              arr?: { a?: string; b?: Array<never>; c?: { some?: never; other?: {} }[] }[]
              shit?: DeepPartialTwo<MyType>
              // ii?: Array<{ i?: string }>
            }[]
            // j?: { jj?: never; ii?: Array<{ i: string }> }[]
            // m?: { jj?: never; ii?: { i: string; other: { s: number } }[] }[]
          }
        }
      }
    >
  >,
]

const r: ResultTwo = {
  c: {
    e: { n: {} },
  },
}
