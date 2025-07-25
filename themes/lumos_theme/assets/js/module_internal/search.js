import Fuse from '../module_external/fuse.js'

export function modalSearchHandler() {
  const overlay = document.getElementById('overlay')
  const openBtns = document.querySelectorAll('[data-modal="searchBar"]')
  const searchBar = document.getElementById('searchBar')
  const searchInput = searchBar.querySelector('#search-input')
  const closeBtn = searchBar.querySelector('#searchModalClose')

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      searchBar.classList.add('search-bar--is-active')
      overlay.classList.add('overlay--isActive')
      searchInput.focus()
    })
  })

  closeBtn.addEventListener('click', () => {
    searchBar.classList.remove('search-bar--is-active')
    searchInput.blur()
    overlay.classList.remove('overlay--isActive')
  })

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      searchBar.classList.remove('search-bar--is-active')
      overlay.classList.remove('overlay--isActive')
      searchInput.blur()
    }
  })

  overlay.addEventListener('click', () => {
    searchBar.classList.remove('search-bar--is-active')
    overlay.classList.remove('overlay--isActive')
    searchInput.blur()
  })
}

export async function searchHandler() {
  try {
    const searchForm = document.querySelector('#searchForm')
    const searchUrl = searchForm.getAttribute('data-search-url')
    const response = await fetch(searchUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch search index: ${response.status}`)
    }

    const store = await response.json()

    const fuse = new Fuse(store, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'tags', weight: 0.3 },
        { name: 'description', weight: 0.1 },
        { name: 'excerpt', weight: 0.1 },
        { name: 'category', weight: 0.1 },
        { name: 'content', weight: 0.1 },
      ],
      threshold: 0.3,
      includeMatches: true,
      useExtendedSearch: true,
      minMatchCharLength: 2,
    })

    const displayResults = (results, query) => {
      const searchResults = document.querySelector('#results')
      const resultsPanel = document.querySelector('#resultsPanel')

      if (query && query.length >= 2) {
        resultsPanel.hidden = false
        searchResults.innerHTML = results.length
          ? results
              .map(result => {
                const item = result.item
                return `
                            <li class="results__item">
                                <a class="results__link" href="${item.url}">
                                    ${item.title}
                                </a>
                            </li>`
              })
              .join('')
          : '<li class="results__item results__item--empty">No results found for "' +
            query +
            '"</li>'
      } else {
        resultsPanel.hidden = true
        searchResults.innerHTML = ''
      }
    }

    const handleSearch = event => {
      event?.preventDefault()
      const query = document.querySelector('#search-input').value.trim()

      if (query.length >= 2) {
        const results = fuse.search(query)
        displayResults(results, query)
      } else {
        document.querySelector('#resultsPanel').hidden = true
        document.querySelector('#results').innerHTML = ''
      }
    }

    const debounce = (func, wait = 300) => {
      let timeout
      return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
      }
    }

    // Event listeners
    const searchInput = document.querySelector('#search-input')
    searchInput.addEventListener('input', debounce(handleSearch))

    searchForm.addEventListener('submit', e => {
      e.preventDefault()
      handleSearch(e)
    })

    // Handle initial query from URL
    const urlParams = new URLSearchParams(window.location.search)
    const initialQuery = urlParams.get('query')

    if (initialQuery) {
      searchInput.value = initialQuery
      setTimeout(() => handleSearch(new Event('submit')), 100)
    }
  } catch (error) {
    console.error('Failed to load search data:', error)
    document.querySelector('#resultsPanel').hidden = false
    document.querySelector('#results').innerHTML =
      '<li class="results__item results__item--error">Search is currently unavailable</li>'
  }
}
