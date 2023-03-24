import { expect, it } from "vitest"
import { Equal, Expect } from "../helpers/type-utils"

const fetchData = async <T>(url: string): Promise<T> => {
  const data = await fetch(url).then(response => response.json())
  return data
}

const fetchData2 = async <T>(url: string) => {
  const data = (await fetch(url).then(response => response.json())) as T
  return data
}

const fetchData3 = async <T>(url: string) => {
  const data: T = await fetch(url).then(response => response.json())
  return data
}

const fetchData4 = async <T>(url: string) => {
  const data = await fetch(url).then(response => response.json() as T)
  return data
}

const fetchData5 = async <T>(url: string) => {
  const data = await fetch(url).then((response): Promise<T> => response.json())
  return data
}

it("Should fetch data from an API", async () => {
  const data = await fetchData<{ name: string }>("https://swapi.dev/api/people/1")
  const data2 = await fetchData2<{ name: string }>("https://swapi.dev/api/people/1")
  const data3 = await fetchData3<{ name: string }>("https://swapi.dev/api/people/1")
  const data4 = await fetchData4<{ name: string }>("https://swapi.dev/api/people/1")
  const data5 = await fetchData5<{ name: string }>("https://swapi.dev/api/people/1")
  expect(data.name).toEqual("Luke Skywalker")

  type tests = [
    Expect<Equal<typeof data, { name: string }>>,
    Expect<Equal<typeof data2, { name: string }>>,
    Expect<Equal<typeof data3, { name: string }>>,
    Expect<Equal<typeof data4, { name: string }>>,
    Expect<Equal<typeof data5, { name: string }>>,
  ]
})
