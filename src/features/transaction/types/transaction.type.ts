import type { TTransactionMember } from "./transaction-member.type";

export type TTransaction = {
  id: string;
  date: string;
  transaction_members: TTransactionMember[];
  note?: string;
  status: "noted" | "draft" | "locked";
  created_at?: string;
  updated_at?: string;
};
