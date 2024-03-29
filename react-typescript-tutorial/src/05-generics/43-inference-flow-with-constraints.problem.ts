import { createUser } from "fake-external-lib";
import { useState } from "react";
import { Equal, Expect } from "../helpers/type-utils";

type Mutation<Args extends any[], Return> = (...args: Args) => Promise<Return>;

interface UseMutationReturn<Args extends any[], Return> {
	mutate: Mutation<Args, Return>;
	isLoading: boolean;
}

interface UseMutationOptions<Args extends any[], Return> {
	mutation: Mutation<Args, Return>;
}

export function useMutation<Args extends any[], Return>(
	opts: UseMutationOptions<Args, Return>,
): UseMutationReturn<Args, Return> {
	const [isLoading, setIsLoading] = useState(false);

	return {
		mutate: (async (...args) => {
			setIsLoading(true);

			try {
				const result = await opts.mutation(...args);
				return result;
			} catch (e) {
				throw e;
			} finally {
				setIsLoading(false);
			}
		}) satisfies (...args: Args) => Promise<Return>,
		isLoading,
	};
}

const mutation = useMutation({
	mutation: createUser,
});

mutation.mutate;

mutation.mutate({ name: "asdfasdf", email: "asdfasdf" });
mutation.isLoading;
//

mutation.mutate({ name: "John Doe", email: "john@doe.com" });

// @ts-expect-error email missing!
mutation.mutate({ name: "John Doe" });

mutation.mutate(
	{
		name: "John Doe",
		email: "john@doe.com",
	},
	{
		throwOnError: true,
		// @ts-expect-error extra prop
		extra: "oh dear",
	},
);

type test = [
	Expect<Equal<typeof mutation.isLoading, boolean>>,
	Expect<
		Equal<
			typeof mutation.mutate,
			(
				user: { name: string; email: string },
				opts?: {
					throwOnError?: boolean;
				},
			) => Promise<{
				id: string;
				name: string;
				email: string;
			}>
		>
	>,
];
