import { $, $$ } from "./helper";

export function themeHandler() {
  const KEY = "THEME";
  const elHtml = document.documentElement;
  const themeOrder = ["auto", "dark", "light"];
  const useElements = $$("svg.icon--theme use");
  const label = $(".theme");
  const toggleBtn = $("#toggleTheme");

  if (!useElements.length) {
    console.warn("⚠️ No theme icons found.");
    return;
  }

  const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const [path] = (useElements[0].getAttribute("href") || "").split("#");

  const getIconId = (theme) =>
    theme === "auto"
      ? "icon-pc-display"
      : theme === "dark"
        ? "icon-sun"
        : "icon-moon-stars-fill";

  const applyTheme = (theme) => {
    const resolved = theme === "auto" ? systemTheme : theme;
    elHtml.dataset.theme = resolved;
    sessionStorage.setItem(KEY, theme);

    const iconId = getIconId(theme);
    useElements.forEach((el) => el.setAttribute("href", `${path}#${iconId}`));

    $('select[name="select-theme"]', label).value = theme;
  };

  const init = () => {
    const saved = sessionStorage.getItem(KEY);
    applyTheme(saved || "auto");
  };

  $('select[name="select-theme"]', label).addEventListener("change", (e) =>
    applyTheme(e.target.value),
  );

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = sessionStorage.getItem(KEY) || "auto";
      const next =
        themeOrder[(themeOrder.indexOf(current) + 1) % themeOrder.length];
      applyTheme(next);
    });
  }

  init();
}
