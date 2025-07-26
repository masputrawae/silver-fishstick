import { handlerCopyCode } from "./module_internal/copy_code.js";
import { sidebarHandler } from "./module_internal/sidebar.js";
import { langHandler } from "./module_internal/switch_lang.js";
import { themeHandler } from "./module_internal/switch_themes.js";
import { tocHandler } from "./module_internal/table_of_contents.js";
import { treeHandler } from "./module_internal/tree_collapsible.js";

const main = () => {
  handlerCopyCode();
  themeHandler();
  langHandler();
  treeHandler();
  sidebarHandler();
  tocHandler();
};

document.addEventListener("DOMContentLoaded", main);
