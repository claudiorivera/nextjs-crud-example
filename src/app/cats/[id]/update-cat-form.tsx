"use client";

import { Cat } from "@prisma/client";
import { useFormState } from "react-dom";
import { FormState } from "~/src/types";

export function UpdateCatForm({
	cat,
	updateCat,
}: {
	cat: Cat;
	updateCat: (
		_initialState: FormState,
		formData: FormData,
	) => Promise<FormState>;
}) {
	const [state, formAction] = useFormState(updateCat, undefined);

	return (
		<form action={formAction}>
			<div>
				<label>
					Name
					<input type="text" name="name" defaultValue={cat.name} />
					{state?.fieldErrors?.name && <div>{state.fieldErrors.name}</div>}
				</label>
			</div>
			<div>
				<label>
					Age
					<input
						type="number"
						inputMode="numeric"
						name="age"
						defaultValue={cat.age}
					/>
					{state?.fieldErrors?.age && <div>{state.fieldErrors.age}</div>}
				</label>
			</div>

			<button type="submit">Save Changes</button>
		</form>
	);
}
