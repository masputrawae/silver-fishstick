import { $, $$ } from "./helper.js";
import Fuse from "../module_external/fuse.js";

export function dialogSearchToggle() {
  $$('[data-dialog="searchBar"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = $("#searchBar");

      if (!dialog) return;

      if (dialog.open) {
        dialog.close();
      } else {
        dialog.showModal();
        searchInput.focus();
      }

      searchInput.value = "";
      resultsPanel.innerHTML = "";
      resultsPanel.hidden = true;
    });
  });
}

export async function searchHandler() {
  try {
    const searchInput = $("#searchInput");
    const resultsPanel = $("#results");
    const searchUrl = searchInput.dataset.searchUrl;

    const translation = resultsPanel.dataset.translate
      ? JSON.parse(resultsPanel.dataset.translate)
      : {
          searchCurrentlyUnavailable: "Search is currently unavailable",
          noResultsFoundFor: "No results found for",
        };

    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch search index: ${response.status}`);
    }

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
      if (query.length < 2) {
        resultsPanel.hidden = true;
        resultsPanel.innerHTML = "";
        return;
      }

      if (results.length === 0) {
        resultsPanel.innerHTML = `
          <li class="results__item results__item--empty">
            ${translation.noResultsFoundFor}: "${query}"
          </li>`;
      } else {
        resultsPanel.innerHTML = results
          .map((result) => {
            const item = result.item;
            return `
              <li class="results__item">
                <a class="results__link" href="${item.url}">
                  ${item.title}
                </a>
                <p class="results__snippet">${item.content || item.description}</p>
              </li>`;
          })
          .join("");
      }

      resultsPanel.hidden = false;
    };

    const handleSearch = (event) => {
      event?.preventDefault();
      const query = searchInput.value.trim();
      if (query.length >= 2) {
        const results = fuse.search(query);
        displayResults(results, query);
      } else {
        resultsPanel.hidden = true;
        resultsPanel.innerHTML = "";
      }
    };

    const debounce = (func, wait = 300) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };

    // Add event listeners
    searchInput.addEventListener("input", debounce(handleSearch, 300));

    // Optional: clear search on close button
    const closeBtn = $(".search-bar__btn-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        searchInput.value = "";
        resultsPanel.innerHTML = "";
        resultsPanel.hidden = true;
      });
    }

    // Optional: prefill query from URL ?query=...
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get("query");
    if (initialQuery) {
      searchInput.value = initialQuery;
      setTimeout(() => handleSearch(new Event("submit")), 100);
    }
  } catch (error) {
    console.error("Search error:", error);
    const resultsPanel = $("#results");
    const translation = resultsPanel.dataset.translate
      ? JSON.parse(resultsPanel.dataset.translate)
      : {};

    const message =
      translation.searchCurrentlyUnavailable ||
      "Search is currently unavailable";

    resultsPanel.hidden = false;
    resultsPanel.innerHTML = `
      <li class="results__item results__item--error">
        ${message}
      </li>`;
  }
}
