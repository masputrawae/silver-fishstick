import { handlerCopyCode } from "./module_internal/copy_code.js";
import { langHandler } from "./module_internal/switch_lang.js";
import { themeHandler } from "./module_internal/switch_themes.js";

const main = () => {
  handlerCopyCode();
  themeHandler();
  langHandler();
};

document.addEventListener("DOMContentLoaded", main);
