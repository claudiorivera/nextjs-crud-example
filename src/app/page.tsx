import { revalidatePath } from "next/cache";
import { CreateCatForm } from "~/src/app/create-cat-form";
import { catSchema } from "~/src/lib/createCatSchema";
import { db } from "~/src/lib/db";
import { FormState } from "~/src/types";

export default async function Home({
	searchParams,
}: {
	searchParams: {
		name?: string;
		minAge?: string;
		maxAge?: string;
	};
}) {
	const data = await db.cat.findMany({
		where: {
			AND: [
				{
					name: {
						contains: searchParams.name || undefined,
						mode: "insensitive",
					},
				},
				{
					age: {
						gte: Number(searchParams.minAge) || undefined,
						lte: Number(searchParams.maxAge) || undefined,
					},
				},
			],
		},
	});

	async function deleteCat(id: string) {
		"use server";
		const cat = await db.cat.delete({
			where: {
				id,
			},
		});

		if (cat) {
			revalidatePath("/");
		}
	}

	async function createCat(_initialState: FormState, formData: FormData) {
		"use server";
		const entries = Object.fromEntries(formData.entries());

		const validation = catSchema.safeParse(entries);

		if (!validation.success)
			return {
				fieldErrors: validation.error.flatten().fieldErrors,
				formErrors: validation.error.flatten().formErrors,
			};

		const cat = await db.cat.create({
			data: validation.data,
		});

		if (cat) {
			revalidatePath("/");
		}
	}

	return (
		<main>
			<h1>Home</h1>

			<hr />

			<h2>Search Cats</h2>
			<form>
				<label>
					Name
					<input type="search" name="name" defaultValue={searchParams.name} />
				</label>
				<label>
					Min Age
					<input
						type="number"
						inputMode="numeric"
						name="minAge"
						defaultValue={searchParams.minAge}
					/>
				</label>
				<label>
					Max Age
					<input
						type="number"
						inputMode="numeric"
						name="maxAge"
						defaultValue={searchParams.maxAge}
					/>
				</label>
				<button type="reset">Reset</button>
				<button type="submit">Search</button>
			</form>

			<h3>Results</h3>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Age</th>
					</tr>
				</thead>
				<tbody>
					{data.map((cat) => (
						<tr key={cat.id}>
							<td>{cat.name}</td>
							<td>{cat.age}</td>
							<td>
								<a href={`/cats/${cat.id}`}>View</a>
							</td>
							<td>
								<form action={deleteCat.bind(null, cat.id)}>
									<button type="submit">Delete</button>
								</form>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<hr />

			<h2>New Cat</h2>
			<CreateCatForm createCat={createCat} />
		</main>
	);
}
