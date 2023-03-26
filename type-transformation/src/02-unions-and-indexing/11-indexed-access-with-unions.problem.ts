import { Equal, Expect } from "../helpers/type-utils"

export const programModeEnumMap = {
  GROUP: "group",
  ANNOUNCEMENT: "announcement",
  ONE_ON_ONE: "1on1",
  SELF_DIRECTED: "selfDirected",
  PLANNED_ONE_ON_ONE: "planned1on1",
  PLANNED_SELF_DIRECTED: "plannedSelfDirected",
} as const

type OtherSolution = (typeof programModeEnumMap)[
  | "ONE_ON_ONE"
  | "PLANNED_ONE_ON_ONE"
  | "SELF_DIRECTED"
  | "PLANNED_SELF_DIRECTED"]

export type IndividualProgram = Exclude<
  (typeof programModeEnumMap)[keyof typeof programModeEnumMap],
  "group" | "announcement"
>

export type MoreSolution = (typeof programModeEnumMap)[Exclude<
  keyof typeof programModeEnumMap,
  "GROUP" | "ANNOUNCEMENT"
>]

export type tests = [
  Expect<Equal<IndividualProgram, "1on1" | "selfDirected" | "planned1on1" | "plannedSelfDirected">>,
  Expect<Equal<OtherSolution, "1on1" | "selfDirected" | "planned1on1" | "plannedSelfDirected">>,
  Expect<Equal<MoreSolution, "1on1" | "selfDirected" | "planned1on1" | "plannedSelfDirected">>,
]
