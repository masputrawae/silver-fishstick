import { $, $$ } from "./helper";

export function themeHandler() {
  const elHtml = document.documentElement;
  const themeOrder = ["auto", "dark", "light"];
  const themeIcons = $$("svg.icon--theme use");

  if (!themeIcons.length) {
    console.warn("⚠️ No theme icons found.");
    return;
  }

  const iconUseEl = themeIcons[0];
  const href = iconUseEl.getAttribute("href") || "";
  const [path] = href.includes("#") ? href.split("#") : [""];

  const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const ICONS = {
    auto: "icon-pc-display",
    dark: "icon-moon-stars-fill",
    light: "icon-sun",
  };

  const getIconId = (theme) => ICONS[theme] || ICONS.auto;

  const applyTheme = (theme) => {
    if (!themeOrder.includes(theme)) theme = "auto";
    const resolved = theme === "auto" ? systemTheme : theme;
    elHtml.dataset.theme = resolved;
    sessionStorage.setItem("THEME", theme);

    const iconId = getIconId(theme);
    themeIcons.forEach((el) => el.setAttribute("href", `${path}#${iconId}`));

    const themeSelect = $('select[name="select-theme"]', $(".theme"));
    if (themeSelect) themeSelect.value = theme;
  };

  const init = () => {
    const saved = sessionStorage.getItem("THEME");
    applyTheme(saved || "auto");
  };

  const themeSelect = $('select[name="select-theme"]', $(".theme"));
  if (themeSelect) {
    themeSelect.addEventListener("change", (e) => applyTheme(e.target.value));
  }

  const toggleBtn = $("#toggleTheme");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = sessionStorage.getItem("THEME") || "auto";
      const currentIndex = themeOrder.indexOf(current);
      const next = themeOrder[(currentIndex + 1) % themeOrder.length];
      applyTheme(next);
    });
  }

  init();
}
