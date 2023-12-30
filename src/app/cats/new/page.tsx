import { redirect } from "next/navigation";
import { CreateCatForm } from "~/src/app/cats/new/create-cat-form";
import { catSchema } from "~/src/lib/createCatSchema";
import { db } from "~/src/lib/db";
import { FormState } from "~/src/types";

export default function NewCat() {
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
      redirect("/");
    }
  }

  return (
    <>
      <h1>New Cat</h1>

      <CreateCatForm createCat={createCat} />
    </>
  );
}
