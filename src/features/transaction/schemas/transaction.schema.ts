import { z } from "zod";

export const transactionMemberSchema = z.object({
  member_id: z.string().min(1, "Member is required"),
  paid: z.number(),
});

export const createTransactionSchema = z.object({
  date: z
    .string()
    .min(1, "Date is required")
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  note: z.string().max(500, "Note must be less than 500 characters").optional(),
  transactionMembers: z
    .array(transactionMemberSchema)
    .min(1, "At least one member is required")
    .refine((members) => {
      const memberIds = members.map((m) => m.member_id);
      const uniqueMemberIds = new Set(memberIds);
      return memberIds.length === uniqueMemberIds.size;
    }, "Each member can only be added once"),
});

export const updateTransactionSchema = createTransactionSchema;

export type TCreateTransactionFormData = z.infer<
  typeof createTransactionSchema
>;
export type TUpdateTransactionFormData = z.infer<
  typeof updateTransactionSchema
>;
export type TTransactionMemberFormData = z.infer<
  typeof transactionMemberSchema
>;
