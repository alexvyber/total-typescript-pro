import { Equal, Expect } from "../helpers/type-utils"

/**
 * This time, let's solve this with function overloads!
 */

// interface returnWhatIPassIn {
//   (arg: 1): 1
//   (arg: "matt"): "matt"
// }

function returnWhatIPassIn(arg: 1): 1
function returnWhatIPassIn(arg: "matt"): "matt"
function returnWhatIPassIn(t: unknown) {
  return t
}

const one = returnWhatIPassIn(1)
const matt = returnWhatIPassIn("matt")

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>]
