export function offcanvasHandler() {
  const buttons = document.querySelectorAll('[data-sidebar]')

  buttons.forEach(btn => {
    const targetId = btn.getAttribute('data-sidebar')
    const targetEL = document.getElementById(targetId)

    btn.addEventListener('click', () => {
      const isAlreadyOpen = targetEL.classList.contains('sidebar--isOpen')
      const allSidebars = document.querySelectorAll('.sidebar--isOpen')
      
      allSidebars.forEach(sidebar => {
        sidebar.classList.remove('sidebar--isOpen')
      })

      if (!isAlreadyOpen) {
        targetEL.classList.add('sidebar--isOpen')
      }
    })
  })
}