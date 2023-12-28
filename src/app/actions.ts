"use server";
import { redirect } from "next/navigation";
import { createCatSchema } from "~/src/lib/createCatSchema";
import { db } from "~/src/lib/db";
import { updateCatSchema } from "~/src/lib/updateCatSchema";

export async function createCat(_initialState: unknown, formData: FormData) {
  const entries = Object.fromEntries(formData.entries());

  const validation = createCatSchema.safeParse(entries);

  if (!validation.success)
    return {
      fieldErrors: validation.error.flatten().fieldErrors,
      formErrors: validation.error.flatten().formErrors,
    };

  const cat = await db.cat.create({
    data: validation.data,
  });

  if (cat) {
    throw redirect("/");
  }
}

export async function updateCat(_initialState: unknown, formData: FormData) {
  const entries = Object.fromEntries(formData.entries());

  const validation = updateCatSchema.safeParse(entries);

  if (!validation.success)
    return {
      fieldErrors: validation.error.flatten().fieldErrors,
      formErrors: validation.error.flatten().formErrors,
    };

  const updatedCat = await db.cat.update({
    where: {
      id: validation.data.id,
    },
    data: validation.data,
  });

  if (updatedCat) {
    throw redirect("/");
  }
}

export async function deleteCat(id: string) {
  const cat = await db.cat.delete({
    where: {
      id,
    },
  });

  if (cat) {
    return redirect("/");
  }
}
