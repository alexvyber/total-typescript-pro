import { Equal, Expect } from "../helpers/type-utils"

type Route =
  | {
      route: "/"
      search: {
        page: string
        perPage: string
      }
    }
  | { route: "/about"; search: {} }
  | { route: "/admin"; search: {} }
  | { route: "/admin/users"; search: {} }

type Result = { [key in Route["route"]]: Extract<Route, { route: key }>["search"] }
type ResultTwo = {
  [R in Route as R["route"]]: R["search"]
}

type Some = {
  [key in PropertyKey]: any
}

export type tests = [
  Expect<
    Equal<
      Result,
      {
        "/": {
          page: string
          perPage: string
        }
        "/about": {}
        "/admin": {}
        "/admin/users": {}
      }
    >
  >,
  Expect<
    Equal<
      ResultTwo,
      {
        "/": {
          page: string
          perPage: string
        }
        "/about": {}
        "/admin": {}
        "/admin/users": {}
      }
    >
  >,
]
