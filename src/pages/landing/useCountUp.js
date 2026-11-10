import { ref, onBeforeUnmount } from 'vue'

/**
 * Animates a shared 0 -> 1 progress value once, for a set of counters.
 *
 * Usage:
 *   const { start, valueOf } = useCountUp([20, 170, 70000])
 *   start()
 *   valueOf(170) // -> integer for the current frame
 *
 * Reduced-motion users jump straight to the final numbers.
 */
export function useCountUp (targets, { duration = 1600 } = {}) {
  const progress = ref(0)
  let frameId = null
  let started = false

  function prefersReducedMotion () {
    return typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function cancel () {
    if (frameId !== null) {
      cancelAnimationFrame(frameId)
      frameId = null
    }
  }

  function start () {
    if (started) return
    started = true

    if (prefersReducedMotion()) {
      progress.value = 1
      return
    }

    const startedAt = performance.now()

    function step (now) {
      const elapsed = Math.min((now - startedAt) / duration, 1)
      progress.value = 1 - Math.pow(1 - elapsed, 3)

      if (elapsed < 1) {
        frameId = requestAnimationFrame(step)
      } else {
        progress.value = 1
        frameId = null
      }
    }

    frameId = requestAnimationFrame(step)
  }

  function valueOf (target) {
    return Math.round(target * progress.value)
  }

  onBeforeUnmount(cancel)

  return { progress, start, valueOf, targets }
}
