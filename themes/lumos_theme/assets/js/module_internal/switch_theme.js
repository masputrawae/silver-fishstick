export function themeHandler() {
  const KEY_THEME = "THEME";
  const elHtml = document.documentElement;
  const switchThemeLabels = document.querySelectorAll(".switch-theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const switchTheme = (theme) => {
    const newTheme = theme === "auto" ? systemTheme : theme;

    elHtml.dataset.theme = newTheme;
    sessionStorage.setItem(KEY_THEME, theme);

    switchThemeLabels.forEach((label) => {
      label.classList.remove(
        "switch-theme--isActiveAuto",
        "switch-theme--isActiveDark",
        "switch-theme--isActiveLight",
      );

      const activeClass =
        theme === "auto"
          ? "switch-theme--isActiveAuto"
          : theme === "dark"
            ? "switch-theme--isActiveDark"
            : "switch-theme--isActiveLight";

      label.classList.add(activeClass);

      const selectInput = label.querySelector('select[name="select-theme"]');
      if (selectInput) {
        selectInput.value = theme;
      }
    });
  };

  const initTheme = () => {
    let storageTheme = null;
    try {
      storageTheme = sessionStorage.getItem(KEY_THEME);
    } catch (e) {}

    switchTheme(storageTheme || "auto");
  };

  switchThemeLabels.forEach((label) => {
    const selectInput = label.querySelector('select[name="select-theme"]');
    if (selectInput) {
      selectInput.addEventListener("change", (event) => {
        switchTheme(event.target.value);
      });
    }
  });

  initTheme();
}
