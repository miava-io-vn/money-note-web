import { db } from "@/lib/db";

export const transactionService = {
  getListTransaction: async () => {
    return db.select("SELECT * FROM transactions");
  },
};
