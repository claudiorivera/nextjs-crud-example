"use client";

import { Cat } from "@prisma/client";
import { useFormState } from "react-dom";
import { updateCat } from "~/src/app/actions";

export function UpdateCatForm({ cat }: { cat: Cat }) {
  const [state, formAction] = useFormState(updateCat, undefined);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" defaultValue={cat.id} />
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

      <button>Save Changes</button>
    </form>
  );
}
