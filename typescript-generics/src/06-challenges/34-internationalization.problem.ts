import { expect, it } from "vitest"

type GetKeysTuple<
  T extends string,
  Acc extends string[] = [],
> = T extends `${string}{${infer Param}}${infer Rest}`
  ? GetKeysTuple<Rest, Param extends "" ? Acc : [...Acc, Param]>
  : Acc

type S = GetKeysTuple<"You have {count} unread messages. {otherCount}! {}moreCount">[number]
type SS = GetKeysTuple<"Click me!">[number] extends never ? true : false

type GetParamKeys<TTranslation extends string> = TTranslation extends ""
  ? []
  : TTranslation extends `${string}{${infer Param}}${infer Tail}`
  ? [Param, ...GetParamKeys<Tail>]
  : []

type GetParamKeysAsUnion<TTranslation extends string> = GetParamKeys<TTranslation>[number]

const translate = <
  TKey extends string,
  Translation extends Record<string, string>,
  DynamicKeysType extends any[] = GetKeysTuple<Translation[TKey]>,
  // Example = [Example: Translation[TKey]],
>(
  translations: Translation,
  key: TKey,
  ...args: DynamicKeysType extends [] ? [] : [Record<DynamicKeysType[number], string>]
) => {
  const translation = translations[key]
  const params = args[0] || ({} as Record<DynamicKeysType[number], string>)

  return translation.replace(/{(\w+)}/g, (_, key: DynamicKeysType[number]) => params[key])
}

// TESTS

const translations = {
  title: "Hello, {name}!",
  subtitle: "You have {count} unread messages. {otherCount}!",
  button: "Click me!",
} as const

it("Should translate a translation without parameters", () => {
  const buttonText = translate(translations, "button")

  expect(buttonText).toEqual("Click me!")
})

it("Should translate a translation WITH parameters", () => {
  const subtitle = translate(translations, "subtitle", {
    count: "asdfasdf",
    otherCount: "123123",
  })

  expect(subtitle).toEqual("You have 2 unread messages.")
})

it("Should force you to provide parameters if required", () => {
  // translate(translations, "title")

  // @ts-expect-error
  translate(translations, "title")
})

it("Should not let you pass parameters if NOT required", () => {
  // @ts-expect-error
  translate(translations, "button", {})
})
