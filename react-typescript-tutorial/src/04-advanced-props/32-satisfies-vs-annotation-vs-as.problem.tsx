import { ComponentProps } from "react";
import { Equal, Expect } from "../helpers/type-utils";

const buttonProps = {
	type: "button",
	// @ts-expect-error
	illegalProperty: "I AM ILLEGAL",
} satisfies React.ComponentPropsWithoutRef<"button">

function Some () {
	return <>
	<button {...buttonProps}>Click Me!</button>
</>;
}

const buttonPropType = buttonProps.type;

type test = Expect<Equal<typeof buttonPropType, "button">>;
