export function langHandler() {
  document.querySelectorAll('select[name="lang-select"]').forEach((el) => {
    el.addEventListener("change", (event) => {
      window.location.href = event.target.value;
    });
  });
}
