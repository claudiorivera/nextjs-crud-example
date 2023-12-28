import { z } from "zod";
import { createCatSchema } from "~/src/lib/createCatSchema";

export const updateCatSchema = createCatSchema.merge(
  z.object({
    id: z.string(),
  })
);
