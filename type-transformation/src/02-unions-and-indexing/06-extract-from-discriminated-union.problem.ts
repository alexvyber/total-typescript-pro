import { Equal, Expect } from "../helpers/type-utils";

export type Event =
  | {
      type: "click";
      event: MouseEvent;
    }
  | {
      type: "focus";
      event: FocusEvent;
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
    };

type ClickEvent = Extract<Event, { type: "click" }>;

// type ClickEvent_ = Event extends { type: "click" } ? Event : never;

type tests = [Expect<Equal<ClickEvent, { type: "click"; event: MouseEvent }>>];
