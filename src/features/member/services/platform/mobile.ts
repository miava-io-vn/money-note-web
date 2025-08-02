import { db } from "@/lib/db";
import type { TMember } from "../../types/member.type";

export const memberService = {
  getAllMembers: async (): Promise<TMember[]> => {
    return db.select(
      "SELECT * FROM members ORDER BY created_at DESC"
    ) as Promise<TMember[]>;
  },

  getActiveMembers: async (): Promise<TMember[]> => {
    return db.select(
      "SELECT * FROM members WHERE is_active = 1 ORDER BY created_at DESC"
    ) as Promise<TMember[]>;
  },

  getAutoGenMembers: async (): Promise<TMember[]> => {
    return db.select(
      "SELECT * FROM members WHERE is_auto_gen = 1 ORDER BY created_at DESC"
    ) as Promise<TMember[]>;
  },

  getMemberById: async (id: string): Promise<TMember | null> => {
    const result = (await db.select("SELECT * FROM members WHERE id = ?", [
      id,
    ])) as TMember[];

    if (!result.length) {
      return null;
    }

    return result[0];
  },

  createMember: async (memberData: Pick<TMember, "name">): Promise<TMember> => {
    const { name } = memberData;

    const id = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    await db.execute("INSERT INTO members (id, name) VALUES (?, ?)", [
      id,
      name,
    ]);

    const createdMember = (await db.select(
      "SELECT * FROM members WHERE id = ?",
      [id]
    )) as TMember[];
    return createdMember[0];
  },

  updateMember: async (
    id: string,
    memberData: Pick<TMember, "name">
  ): Promise<TMember | null> => {
    const { name } = memberData;

    await db.execute(
      "UPDATE members SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [name, id]
    );

    const updatedMember = (await db.select(
      "SELECT * FROM members WHERE id = ?",
      [id]
    )) as TMember[];

    if (!updatedMember.length) {
      return null;
    }

    return updatedMember[0];
  },

  toggleAutoGen: async (id: string): Promise<TMember | null> => {
    const currentMember = (await db.select(
      "SELECT is_auto_gen FROM members WHERE id = ?",
      [id]
    )) as { is_auto_gen: number }[];

    if (!currentMember.length) {
      return null;
    }

    const newAutoGenStatus = currentMember[0].is_auto_gen === 1 ? 0 : 1;

    await db.execute(
      "UPDATE members SET is_auto_gen = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [newAutoGenStatus, id]
    );

    const updatedMember = (await db.select(
      "SELECT * FROM members WHERE id = ?",
      [id]
    )) as TMember[];

    if (!updatedMember.length) {
      return null;
    }

    return updatedMember[0];
  },

  toggleActive: async (id: string): Promise<TMember | null> => {
    const currentMember = (await db.select(
      "SELECT is_active FROM members WHERE id = ?",
      [id]
    )) as { is_active: number }[];

    if (!currentMember.length) {
      return null;
    }

    const newActiveStatus = currentMember[0].is_active === 1 ? 0 : 1;

    await db.execute(
      "UPDATE members SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [newActiveStatus, id]
    );

    const updatedMember = (await db.select(
      "SELECT * FROM members WHERE id = ?",
      [id]
    )) as TMember[];

    if (!updatedMember.length) {
      return null;
    }

    return updatedMember[0];
  },
};
