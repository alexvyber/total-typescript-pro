import { Equal, Expect } from "../helpers/type-utils"

export function makeEventHandlers<T>(obj: {
  [Key in keyof T]: (name: Key) => void
}) {
  return obj
}

const obj = makeEventHandlers({
  click: name => {
    console.log(name)

    type test = Expect<Equal<typeof name, "click">>
  },
  focus: name => {
    console.log(name)

    type test = Expect<Equal<typeof name, "focus">>
  },
})
