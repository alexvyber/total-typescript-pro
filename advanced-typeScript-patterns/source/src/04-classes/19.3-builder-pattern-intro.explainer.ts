import { Equal, Expect } from "../helpers/type-utils"

class BuilderTuple<List extends any[] = []> {
  list: List

  constructor() {
    this.list = [] as any
  }

  push<Item extends number>(item: Item): BuilderTuple<[...List, Item]> {
    this.list.push(item)

    return this as any
  }

  unshift<Item extends number>(item: Item): BuilderTuple<[Item, ...List]> {
    this.list.unshift(item)

    return this as any
  }
}

const builderBeforePush = new BuilderTuple()

const listBeforePush = builderBeforePush.list

const builderAfterPush = builderBeforePush.push(33).push(22).push(11)
console.log("🚀 ~ builderAfterPush:", builderAfterPush)

const builderAfterUnshift = builderBeforePush.push(33).unshift(22).unshift(11)
console.log("🚀 ~ builderAfterUnshift:", builderAfterUnshift)

const listAfterPush = builderAfterPush.list
console.log("🚀 ~ listBeforePush:", listBeforePush)
console.log("🚀 ~ listAfterPush:", listAfterPush)

type tests = [
  Expect<Equal<typeof builderBeforePush, BuilderTuple<[]>>>,
  Expect<Equal<typeof listBeforePush, []>>,
  Expect<Equal<typeof builderAfterPush, BuilderTuple<[33, 22, 11]>>>,
  Expect<Equal<typeof builderAfterUnshift, BuilderTuple<[11, 22, 33]>>>,
  Expect<Equal<typeof listAfterPush, [33, 22, 11]>>,
]
