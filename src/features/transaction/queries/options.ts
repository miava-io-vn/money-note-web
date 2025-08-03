import { queryOptions } from "@tanstack/react-query";
import { transactionService } from "../services";
import { queryKeys } from "./keys";

export const allTransactionQueryOptions = queryOptions({
  queryKey: queryKeys.all,
  queryFn: () => transactionService.getAllTransaction(),
});
