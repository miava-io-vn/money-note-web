import { isTauriMobile } from "@/lib/is-tauri";
import { memberService as memberServiceMobile } from "./platform/mobile";

const getInstance = () => {
  if (isTauriMobile) {
    return memberServiceMobile;
  }

  throw new Error("App is only support in mobile");
};

export const memberService = getInstance();
