import { z } from "zod";

export const poofIdSchema = z
    .string()
    .regex(/^[A-Za-z0-9]{12}$/, "Invalid poof id");

export const createPoofInputSchema = z.object({
    text: z
        .string()
        .min(1, "Content cannot be empty")
        .max(10_000, "Content must be less than 10,000 characters")
        .refine((value) => value.trim().length > 0, "Content cannot be only whitespace")
});

export const createPoofApiSchema = createPoofInputSchema.extend({
    ttl: z.number().int().positive().optional()
});

export type CreatePoofInput = z.infer<typeof createPoofInputSchema>;
export type CreatePoofApiInput = z.infer<typeof createPoofApiSchema>;
