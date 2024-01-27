import { redirect } from "next/navigation";
import { UpdateCatForm } from "~/src/app/cats/[id]/update-cat-form";
import { catSchema } from "~/src/lib/createCatSchema";
import { db } from "~/src/lib/db";
import { FormState } from "~/src/types";

export default async function Cat({ params }: { params: { id: string } }) {
	const cat = await db.cat.findUniqueOrThrow({
		where: {
			id: params.id,
		},
	});

	async function updateCat(_initialState: FormState, formData: FormData) {
		"use server";
		const entries = Object.fromEntries(formData.entries());

		const validation = catSchema.safeParse(entries);

		if (!validation.success)
			return {
				fieldErrors: validation.error.flatten().fieldErrors,
				formErrors: validation.error.flatten().formErrors,
			};

		const updatedCat = await db.cat.update({
			where: {
				id: cat.id,
			},
			data: validation.data,
		});

		if (updatedCat) {
			return redirect("/");
		}
	}

	return (
		<>
			<h1>Cat Details</h1>

			<UpdateCatForm cat={cat} updateCat={updateCat} />
		</>
	);
}
