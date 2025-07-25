export function treeHandler() {
  const TREE_KEY = 'TREE'
  const folderButtons = document.querySelectorAll('[data-folder-target]')

  function initTree() {
    const treeState = JSON.parse(sessionStorage.getItem(TREE_KEY)) || {}

    folderButtons.forEach(button => {
      const targetId = button.getAttribute('data-folder-target')
      const targetEl = document.getElementById(targetId)

      // Apply saved state
      if (treeState[targetId]) {
        targetEl.classList.add('tree__list--isOpen')
        button.classList.add('tree__toggle--isOpen')
      } else {
        targetEl.classList.remove('tree__list--isOpen')
        button.classList.remove('tree__toggle--isOpen')
      }
    })
  }

  function treeCollapse() {
    folderButtons.forEach(button => {
      const targetId = button.getAttribute('data-folder-target')
      const targetEl = document.getElementById(targetId)

      button.addEventListener('click', () => {
        const treeState = JSON.parse(sessionStorage.getItem(TREE_KEY)) || {}

        targetEl.classList.toggle('tree__list--isOpen')
        button.classList.toggle('tree__toggle--isOpen')

        const isOpen = targetEl.classList.contains('tree__list--isOpen')
        treeState[targetId] = isOpen

        sessionStorage.setItem(TREE_KEY, JSON.stringify(treeState))
      })
    })
  }

  initTree()
  treeCollapse()
}