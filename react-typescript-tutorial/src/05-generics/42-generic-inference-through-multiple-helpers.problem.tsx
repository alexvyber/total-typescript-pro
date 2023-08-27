import { Equal, Expect } from "../helpers/type-utils";

interface Button<T extends string | number> {
	value: T;
	label: string;
}

interface ButtonGroupProps<T extends string | number> {
	buttons: Button<T>[];
	onClick: (value: Button<T>["value"]) => void;
}

/**
 * In this exercise, we have a component called ButtonGroup. It takes an array
 * of buttons and a function to call when a button is clicked.
 *
 * We want to improve the type of the onClick function so that the value passed
 * to it is inferred from the buttons array.
 *
 * 1. Try to solve this problem using generics.
 */
function ButtonGroup<T extends string>(props: ButtonGroupProps<T>) {
	return (
		<div>
			{props.buttons.map((button) => {
				return (
					<button
						key={button.value}
						onClick={() => {
							props.onClick(button.value);
						}}
					>
						{button.label}
					</button>
				);
			})}
		</div>
	);
}

<>
	<ButtonGroup
		onClick={(value) => {
			type test = Expect<Equal<typeof value, "add" | "delete">>;
		}}
		buttons={[
			{
				value: "add",
				label: "Add",
			},
			{
				value: "delete",
				label: "Delete",
			},
		]}
	></ButtonGroup>
</>;
