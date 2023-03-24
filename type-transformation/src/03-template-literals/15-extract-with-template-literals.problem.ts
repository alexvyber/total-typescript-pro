import { Equal, Expect } from "../helpers/type-utils"

type Routes = "/users" | "/users/:id" | "/posts" | "/posts/:id"
type ExtendsId<T> = T extends `${string}:id` ? T : never
type DynamicRoutes = ExtendsId<Routes>
type DynamicRoutesTwo = Extract<Routes, `${string}:${string}`>

export type tests = [
  Expect<Equal<DynamicRoutes, "/users/:id" | "/posts/:id">>,
  Expect<Equal<DynamicRoutesTwo, "/users/:id" | "/posts/:id">>,
]
