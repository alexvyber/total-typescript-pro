import { Equal, Expect } from "../helpers/type-utils"

type Route =
  | {
      route: "/"
      search: {
        page: string
        perPage: string
      }
    }
  | { route: "/about" }
  | { route: "/admin" }
  | { route: "/admin/users" }

type Get<T extends { route: any }> = {
  [R in T as R["route"]]: R extends { search: infer S } ? S : never
}

type GetTwo<T extends { route: any }> = {
  [R in T as R["route"]]: R extends { search: any } ? R["search"] : never
}

type RoutesObject = Get<Route>
type RoutesObjectTwo = GetTwo<Route>

export type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": {
          page: string
          perPage: string
        }
        "/about": never
        "/admin": never
        "/admin/users": never
      }
    >
  >,
  Expect<
    Equal<
      RoutesObjectTwo,
      {
        "/": {
          page: string
          perPage: string
        }
        "/about": never
        "/admin": never
        "/admin/users": never
      }
    >
  >,
]
