import { $, $$ } from "./helper.js";
import Fuse from "../module_external/fuse.js";

export function dialogSearchToggle() {
  $$('[data-dialog="searchBar"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = $("#searchBar");
      const input = $("#searchInput");
      const panel = $("#results");

      if (!dialog || !input || !panel) return;

      if (dialog.open) {
        dialog.close();
      } else {
        dialog.showModal();
        input.focus();
      }

      input.value = "";
      panel.innerHTML = "";
      panel.hidden = true;
    });
  });
}

export async function searchHandler() {
  const searchInput = $("#searchInput");
  const resultsPanel = $("#results");

  if (!searchInput || !resultsPanel) return;

  const clearSearch = () => {
    searchInput.value = "";
    resultsPanel.innerHTML = "";
    resultsPanel.hidden = true;
  };

  const translation = resultsPanel.dataset.translate
    ? JSON.parse(resultsPanel.dataset.translate)
    : {
        searchCurrentlyUnavailable: "Search is currently unavailable",
        noResultsFoundFor: "No results found for",
      };

  try {
    const searchUrl = searchInput.dataset.searchUrl;
    const response = await fetch(searchUrl);

    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const store = await response.json();

    const fuse = new Fuse(store, {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "tags", weight: 0.3 },
        { name: "description", weight: 0.1 },
        { name: "excerpt", weight: 0.1 },
        { name: "category", weight: 0.1 },
        { name: "content", weight: 0.1 },
      ],
      threshold: 0.3,
      includeMatches: true,
      useExtendedSearch: true,
      minMatchCharLength: 2,
    });

    const displayResults = (results, query) => {
      if (query.length < 2) return clearSearch();

      resultsPanel.innerHTML = results.length
        ? results
            .map((res) => {
              const item = res.item;
              return `
                <li class="results__item">
                  <a class="results__link" href="${item.url}">
                    ${item.title}
                  </a>
                  <p class="results__snippet">${item.content || item.description}</p>
                </li>`;
            })
            .join("")
        : `<li class="results__item results__item--empty">
            ${translation.noResultsFoundFor}: "${query}"
          </li>`;

      resultsPanel.hidden = false;
    };

    const handleSearch = (event) => {
      event?.preventDefault();
      const query = searchInput.value.trim();
      const results = query.length >= 2 ? fuse.search(query) : [];
      displayResults(results, query);
    };

    const debounce = (fn, wait = 300) => {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
      };
    };

    // Bind listeners
    searchInput.addEventListener("input", debounce(handleSearch, 300));

    const closeBtn = $(".search-bar__btn-close");
    if (closeBtn) closeBtn.addEventListener("click", clearSearch);

    // Prefill from URL
    const params = new URLSearchParams(location.search);
    const initialQuery = params.get("query");
    if (initialQuery) {
      searchInput.value = initialQuery;
      setTimeout(() => handleSearch(new Event("submit")), 100);
    }
  } catch (err) {
    console.error("Search error:", err);
    resultsPanel.hidden = false;
    resultsPanel.innerHTML = `
      <li class="results__item results__item--error">
        ${translation.searchCurrentlyUnavailable}
      </li>`;
  }
}
