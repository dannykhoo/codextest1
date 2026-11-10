/**
 * Scrolls to a section by id.
 *
 * The app uses hash-mode routing, so plain `href="#section"` anchors would be
 * intercepted by the router. Anchor clicks therefore call this instead.
 */
export function scrollToTarget (id) {
  const el = document.getElementById(id)
  if (!el) return

  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  el.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start'
  })
}

export function scrollToTop () {
  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? 'auto' : 'smooth'
  })
}
