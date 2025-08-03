export const queryKeys = {
  all: ["transactions"] as const,
  lists: () => [...queryKeys.all, "list"] as const,
  list: (filters: string) => [...queryKeys.lists(), { filters }] as const,
  details: () => [...queryKeys.all, "detail"] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
  members: (id: string) => [...queryKeys.details(), id, "members"] as const,
};
