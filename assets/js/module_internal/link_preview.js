import { $, $$ } from './helper.js'

import {
  computePosition,
  autoPlacement,
  offset,
} from '../module_external/floating_ui.js'

export function linkPreviewHandler() {
  const tooltip = $('#linkpreview')
  const elements = $$('.markdown a')

  let currentHref = ''
  let showPreviewTimer
  let hidePreviewTimer

  function hideLinkPreview() {
    clearTimeout(showPreviewTimer)
    if (hidePreviewTimer !== undefined) return

    hidePreviewTimer = setTimeout(() => {
      currentHref = ''
      tooltip.style.display = ''
      hidePreviewTimer = undefined
    }, 200)
  }

  function clearTimers() {
    clearTimeout(showPreviewTimer)
    clearTimeout(hidePreviewTimer)
    hidePreviewTimer = undefined
  }

  tooltip.addEventListener('mouseenter', clearTimers)
  tooltip.addEventListener('mouseleave', hideLinkPreview)

  async function showLinkPreview(e) {
    const start = `${window.location.protocol}//${window.location.host}`
    const target = e.target.closest('a')
    if (!target) return

    const href = target.href
    const hash = new URL(href).hash
    const hrefWithoutAnchor = href.replace(hash, '')
    const locationWithoutAnchor = window.location.href.replace(window.location.hash, '')

    currentHref = href

    if (
      hrefWithoutAnchor === locationWithoutAnchor ||
      !href.startsWith(start)
    ) {
      hideLinkPreview()
      return
    }

    clearTimers()

    try {
      const text = await fetch(href).then(x => x.text())
      if (currentHref !== href) return

      showPreviewTimer = setTimeout(() => {
        if (currentHref !== href) return

        const doc = new DOMParser().parseFromString(text, 'text/html')
        const content = doc.querySelector('.markdown')?.outerHTML

        tooltip.innerHTML = content || ''
        tooltip.style.display = 'block'

        let offsetTop = 0
        if (hash) {
          const heading = tooltip.querySelector(hash)
          if (heading) offsetTop = heading.offsetTop
        }

        tooltip.scroll({ top: offsetTop, behavior: 'instant' })

        computePosition(target, tooltip, {
          middleware: [offset(10), autoPlacement()],
        }).then(({ x, y }) => {
          Object.assign(tooltip.style, {
            left: `${x}px`,
            top: `${y}px`,
          })
        })
      }, 400)
    } catch (err) {
      console.error('Failed to fetch link preview:', err)
    }
  }

  const events = [
    ['mouseenter', showLinkPreview],
    ['mouseleave', hideLinkPreview],
    ['focus', showLinkPreview],
    ['blur', hideLinkPreview],
  ]

  elements.forEach(element => {
    events.forEach(([event, listener]) => {
      element.addEventListener(event, listener)
    })
  })
}