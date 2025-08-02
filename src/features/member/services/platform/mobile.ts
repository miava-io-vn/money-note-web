import { db } from "@/lib/db";
import type { TMember } from "../../types/member.type";

export const memberService = {
  getListMember: async (): Promise<TMember[]> => {
    return db.select("SELECT * FROM members");
  },
};
