"use client";

import { useFormState } from "react-dom";
import { FormState } from "~/src/types";

export function CreateCatForm({
  createCat,
}: {
  createCat: (
    _initialState: FormState,
    formData: FormData
  ) => Promise<FormState>;
}) {
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
