import { Equal, Expect } from "../helpers/type-utils"

type UserPath = "/users/:id"
type SomePath = "/users/asdfasdfid/asdfasdf/as/df/asdf/asdf/"

type UserOrganisationPath = "/users/:id/organisations/:organisationId"
type GetIdsTuple<
  T extends string,
  Acc extends string[] = [],
> = T extends `${string}:${infer Param}/${infer Rest}`
  ? GetIdsTuple<Rest, [...Acc, Param]>
  : T extends `${string}:${infer Param}`
  ? [...Acc, Param]
  : never

type R = GetIdsTuple<UserOrganisationPath>

type GetIds<T extends string> = {
  [key in GetIdsTuple<T>[number]]: string
}

type Result = GetIds<UserOrganisationPath>

declare const emptyObjectSymbol: unique symbol
type EmptyObject = { [emptyObjectSymbol]?: never }
// type IsEmptyObject<T> = T extends EmptyObject ? true : false

// !!!:
// NOTE:
type GetIdsWithNeverCase<T extends string> = GetIds<T> extends infer P
  ? P extends EmptyObject
    ? never
    : P
  : never

type R2 = GetIdsWithNeverCase<SomePath>

export type tests = [
  Expect<Equal<GetIdsWithNeverCase<SomePath>, never>>,
  Expect<Equal<GetIds<UserPath>, { id: string }>>,
  Expect<Equal<GetIds<UserOrganisationPath>, { id: string; organisationId: string }>>,
]
