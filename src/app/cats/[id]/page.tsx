import { UpdateCatForm } from "~/src/app/cats/[id]/update-cat-form";
import { db } from "~/src/lib/db";

export default async function Cat({ params }: { params: { id: string } }) {
  const cat = await db.cat.findUniqueOrThrow({
    where: {
      id: params.id,
    },
  });

  return (
    <>
      <h1>Cat Details</h1>

      <UpdateCatForm cat={cat} />
    </>
  );
}
