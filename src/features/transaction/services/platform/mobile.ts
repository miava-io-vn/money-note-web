import { db } from "@/lib/db";
import type {
  TCreateTransactionFormData,
  TUpdateTransactionFormData,
} from "../../schemas/transaction.schema";
import type { TTransactionMember } from "../../types/transaction-member.type";
import type { TTransaction } from "../../types/transaction.type";

export const transactionService = {
  getAllTransaction: async (): Promise<TTransaction[]> => {
    const transactions = (await db.select(
      `SELECT
        t.*
      FROM transactions t
      ORDER BY t.created_at DESC`
    )) as Omit<TTransaction, "transaction_members">[];

    const transactionsWithMembers = await Promise.all(
      transactions.map(async (transaction) => {
        const members = (await db.select(
          "SELECT * FROM transaction_members WHERE transaction_id = ? ORDER BY created_at ASC",
          [transaction.id]
        )) as TTransactionMember[];

        return {
          ...transaction,
          transaction_members: members,
        };
      })
    );

    return transactionsWithMembers;
  },

  getTransactionsByStatus: async (
    status: "noted" | "draft" | "locked"
  ): Promise<TTransaction[]> => {
    return db.select(
      "SELECT * FROM transactions WHERE status = ? ORDER BY created_at DESC",
      [status]
    ) as Promise<TTransaction[]>;
  },

  createTransaction: async (
    data: TCreateTransactionFormData
  ): Promise<TTransaction> => {
    const { transactionMembers, ...transaction } = data;

    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await db.execute(
      "INSERT INTO transactions (id, date, note, status) VALUES (?, ?, ?, ?)",
      [transactionId, transaction.date, transaction.note, "draft"]
    );

    for (const member of transactionMembers) {
      await db.execute(
        "INSERT INTO transaction_members (transaction_id, member_id, paid) VALUES (?, ?, ?)",
        [transactionId, member.member_id, member.paid]
      );
    }

    const createdTransaction = (await db.select(
      "SELECT * FROM transactions WHERE id = ?",
      [transactionId]
    )) as TTransaction[];
    return createdTransaction[0];
  },

  updateTransaction: async (
    id: string,
    data: TUpdateTransactionFormData
  ): Promise<TTransaction | null> => {
    const { transactionMembers, ...transaction } = data;

    await db.execute(
      "UPDATE transactions SET date = ?, note = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [transaction.date, transaction.note, id]
    );

    await db.execute(
      "DELETE FROM transaction_members WHERE transaction_id = ?",
      [id]
    );

    for (const member of transactionMembers) {
      await db.execute(
        "INSERT INTO transaction_members (transaction_id, member_id, paid) VALUES (?, ?, ?)",
        [id, member.member_id, member.paid]
      );
    }

    const updatedTransaction = (await db.select(
      "SELECT * FROM transactions WHERE id = ?",
      [id]
    )) as TTransaction[];
    return updatedTransaction[0] || null;
  },

  deleteTransaction: async (id: string): Promise<boolean> => {
    const transaction = (await db.select(
      "SELECT status FROM transactions WHERE id = ?",
      [id]
    )) as TTransaction[];

    if (!transaction || transaction.length === 0) {
      return false;
    }

    if (transaction[0].status !== "draft") {
      return false;
    }

    await db.execute("DELETE FROM transactions WHERE id = ?", [id]);
    await db.execute(
      "DELETE FROM transaction_members WHERE transaction_id = ?",
      [id]
    );

    return true;
  },

  toggleTransactionStatus: async (id: string): Promise<TTransaction | null> => {
    const currentTransaction = (await db.select(
      "SELECT * FROM transactions WHERE id = ?",
      [id]
    )) as TTransaction[];
    if (!currentTransaction || currentTransaction.length === 0) {
      return null;
    }

    const currentStatus = currentTransaction[0].status;
    let newStatus: "noted" | "draft";

    if (currentStatus === "noted") {
      newStatus = "draft";
    } else if (currentStatus === "draft") {
      newStatus = "noted";
    } else {
      return currentTransaction[0];
    }

    await db.execute(
      "UPDATE transactions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [newStatus, id]
    );

    if (newStatus === "draft") {
      await db.execute("DELETE FROM entries WHERE transaction_id = ?", [id]);
      return null;
    }

    if (newStatus === "noted") {
      const transactionMembers = (await db.select(
        "SELECT * FROM transaction_members WHERE transaction_id = ? ORDER BY created_at ASC",
        [id]
      )) as TTransactionMember[];

      if (transactionMembers.length === 0) {
        return null;
      }

      const totalAmount = transactionMembers.reduce(
        (sum, member) => sum + member.paid,
        0
      );

      const amountPerMember = totalAmount / transactionMembers.length;

      for (const member of transactionMembers) {
        const entryId = `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        await db.execute(
          "INSERT INTO entries (id, date, member_id, transaction_id, paid, need_pay) VALUES (?, ?, ?, ?, ?, ?)",
          [
            entryId,
            currentTransaction[0].date,
            member.member_id,
            id,
            0,
            amountPerMember,
          ]
        );

        if (member.paid === 0) {
          continue;
        }

        const paidEntryId = `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await db.execute(
          "INSERT INTO entries (id, date, member_id, transaction_id, paid, need_pay) VALUES (?, ?, ?, ?, ?, ?)",
          [
            paidEntryId,
            currentTransaction[0].date,
            member.member_id,
            id,
            member.paid,
            0,
          ]
        );
      }

      return null;
    }

    const updatedTransaction = (await db.select(
      "SELECT * FROM transactions WHERE id = ?",
      [id]
    )) as TTransaction[];
    return updatedTransaction[0];
  },
};
