document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("lang-select")
    .addEventListener("change", () => {
      window.location.href = this.value;
    });
});
