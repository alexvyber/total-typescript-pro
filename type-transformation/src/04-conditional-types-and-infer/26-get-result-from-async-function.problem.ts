import { Equal, Expect } from "../helpers/type-utils"

const getServerSideProps = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1")
  const json: { title: string } = await data.json()
  return {
    props: {
      json,
    },
  }
}

type InferPropsFromServerSideFunction<
  T extends (...args: any) => any,
  U = Awaited<ReturnType<T>>,
> = U extends { props: infer P } ? P : never

type InferPropsFromServerSideFunctionTwo<T> = T extends (
  ...args: any
) => Promise<{ props: infer P }>
  ? P
  : never

export type tests = [
  Expect<
    Equal<InferPropsFromServerSideFunction<typeof getServerSideProps>, { json: { title: string } }>
  >,
  Expect<
    Equal<
      InferPropsFromServerSideFunctionTwo<typeof getServerSideProps>,
      { json: { title: string } }
    >
  >,
]
