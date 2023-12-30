export type FormState =
  | {
      fieldErrors: {
        name?: string[] | undefined;
        age?: string[] | undefined;
      };
      formErrors: string[];
    }
  | undefined;
