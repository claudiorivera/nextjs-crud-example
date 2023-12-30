import { redirect } from "next/navigation";
import { db } from "~/src/lib/db";

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
      redirect("/");
    }
  }

  return (
    <main>
      <h1>All Cats</h1>
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
        <button>Search</button>
      </form>

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
                  <button>Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
