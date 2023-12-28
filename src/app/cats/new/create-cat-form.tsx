"use client";

import { useFormState } from "react-dom";
import { createCat } from "~/src/app/actions";

export function CreateCatForm() {
  const [state, formAction] = useFormState(createCat, undefined);

  return (
    <form action={formAction}>
      <div>
        <label>
          Name
          <input type="text" name="name" />
          {state?.fieldErrors?.name && <div>{state.fieldErrors.name}</div>}
        </label>
      </div>
      <div>
        <label>
          Age
          <input type="number" inputMode="numeric" name="age" />
          {state?.fieldErrors?.age && <div>{state.fieldErrors.age}</div>}
        </label>
      </div>

      <button>Save Changes</button>
    </form>
  );
}
