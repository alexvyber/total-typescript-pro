/**
 * In this example we have a Select component. Through some magic, we're
 * attempting to strongly type the children of the Select component so
 * that you can only pass 'Option' elements to it.
 *
 * 1. Try to understand the type of OptionType. What's the __brand property
 * for?
 *
 * 2. There's an error happening at <Option /> below. Why is that?
 *
 * 3. Try changing <Option /> to {Option()}. This appears to work. Why?
 * And why is this NOT a good idea?
 *
 * 4. Is what we're attempting to do even possible?
 */

declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };
type Branded<T, B> = T & Brand<B>;

// type OptionType = {
// 	__brand: "OPTION_TYPE";
// } & React.ReactNode;

type OptionType = Branded<React.ReactNode, "OPTION_TYPE">;

function Option(): OptionType {
	return (<option></option>) as any;
}

function renderOption(): OptionType {
	return (<Option />) as any;
}

const Select = (props: { children: OptionType | OptionType[] }) => {
	return <select>{props.children}</select>;
};

<>
	<div>
		<Option />
	</div>

	<Select>
		{
			[
				<Option />,
				<Option />,
				<Option />,
				<Option />,
				<Option />,
				<Option />,
				<Option />,
				<Option />,
				<Option />,
				<Option />,
			] as OptionType[]
		}
	</Select>
</>;
