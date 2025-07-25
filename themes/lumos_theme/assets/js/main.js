import { treeHandler } from "./module_internal/tree_collapsible";
import { offcanvasHandler } from "./module_internal/offcanvas";
import { modalSearchHandler, searchHandler } from "./module_internal/search";
import { tocHandler } from "./module_internal/toc_highlight";
import { themeHandler } from "./module_internal/switch_theme";
import { langHandler } from "./module_internal/switch_lang";
import { linkPreviewHandler } from "./module_internal/link_preview";

const main = () => {
  themeHandler();
  treeHandler();
  offcanvasHandler();
  searchHandler();
  modalSearchHandler();
  tocHandler();
  langHandler();
  linkPreviewHandler();
};

document.addEventListener("DOMContentLoaded", main);
