import { z } from "zod";

export const createMemberSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
});

export const updateMemberSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
});

export type CreateMemberFormData = z.infer<typeof createMemberSchema>;
export type UpdateMemberFormData = z.infer<typeof updateMemberSchema>;
