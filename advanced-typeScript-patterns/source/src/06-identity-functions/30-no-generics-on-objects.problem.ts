/**
 * fetchers is an object where you can optionally
 * pass keys that match the route names.
 *
 * BUT - how do we prevent the user from passing
 * fetchers that don't exist in the routes array?
 *
 * We'll need to change this to a function which takes
 * in the config as an argument.
 *
 * Desired API:
 *
 * const config = makeConfigObj(config);
 */

type ConfigObj<Route extends string> = {
  routes: Route[]
  fetchers: {
    [K in Route]?: () => any
  }
}

const makeConfigObj = <Route extends string>(config: ConfigObj<Route>) => config

// export const configObj = {
//   routes: ["/", "/about", "/contact"],
//   fetchers: {
//     // @ts-expect-error
//     "/does-not-exist": () => {
//       return {}
//     },
//   },
// }

const config2 = makeConfigObj({
  routes: ["/", "/about", "/contact"],
  fetchers: {
    // @ts-expect-error
    "/does-not-exist": () => {
      return {}
    },
  },
})

// const arr = ["asdf", "asdfff"]
// type S = keyof typeof arr[number]
