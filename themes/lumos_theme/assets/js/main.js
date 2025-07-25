import { treeHandler } from "./module_internal/tree_collapsible";
import { offcanvasHandler } from "./module_internal/offcanvas";
import { modalSearchHandler, searchHandler } from "./module_internal/search";

const main = () => {
  treeHandler();
  offcanvasHandler();
  searchHandler();
  modalSearchHandler();
};

document.addEventListener("DOMContentLoaded", main);
