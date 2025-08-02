import { isTauriMobile } from "@/lib/is-tauri";
import { transactionService as transactionServiceMobile } from "./platform/mobile";

const getInstance = () => {
  if (isTauriMobile) {
    return transactionServiceMobile;
  }

  throw new Error("App is only support in mobile");
};

export const transactionService = getInstance();
