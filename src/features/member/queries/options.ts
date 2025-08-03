import { queryOptions } from "@tanstack/react-query";
import { memberService } from "../services";
import type { TMember } from "../types/member.type";
import { queryKeys } from "./keys";

export const allMembersQueryOption = queryOptions<TMember[]>({
  queryKey: queryKeys.all,
  queryFn: () => {
    return memberService.getAllMembers();
  },
});

export const activeMembersQueryOption = queryOptions<TMember[]>({
  queryKey: queryKeys.active,
  queryFn: () => {
    return memberService.getActiveMembers();
  },
});

export const autoGenMembersQueryOption = queryOptions<TMember[]>({
  queryKey: queryKeys.autoGen,
  queryFn: () => {
    return memberService.getAutoGenMembers();
  },
});
