import { $, $$ } from "./helper"
export function sidebarHandler() {
  const buttons = $$('[data-sidebar]')

  buttons.forEach(btn => {
    const targetId = btn.getAttribute('data-sidebar')
    const targetEL = $(`#${targetId}`)

    btn.addEventListener('click', () => {
      const isAlreadyOpen = targetEL.classList.contains('sidebar--isOpen')
      const allSidebars = $$('.sidebar--isOpen')
      
      allSidebars.forEach(sidebar => {
        sidebar.classList.remove('sidebar--isOpen')
      })

      if (!isAlreadyOpen) {
        targetEL.classList.add('sidebar--isOpen')
      }
    })
  })
}