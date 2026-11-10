<template>
  <section ref="sectionRef" class="ac-stats">
    <div class="ac-wrap ac-stats__grid">
      <div v-for="stat in stats" :key="stat.label" class="ac-stat">
        <p class="ac-stat__value">{{ valueOf(stat.value).toLocaleString('en-US') }}</p>
        <p class="ac-stat__label">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { stats as statsData } from '../landingData'
import { useCountUp } from '../useCountUp'

const stats = statsData
const sectionRef = ref(null)
const { start, valueOf } = useCountUp(stats.map(stat => stat.value))

let observer = null

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    start()
    return
  }

  observer = new IntersectionObserver((entries) => {
    const visible = entries.some(entry => entry.isIntersecting)
    if (!visible) return

    start()
    observer.disconnect()
    observer = null
  }, { threshold: 0.35 })

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style lang="scss" scoped>
.ac-stats {
  background: var(--ac-ink);
  color: #fff;
}

.ac-stats__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding-top: 56px;
  padding-bottom: 56px;
}

.ac-stat {
  padding: 0 24px;
  text-align: center;
}

.ac-stat + .ac-stat {
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

.ac-stat__value {
  margin: 0 0 8px;
  font-size: clamp(2rem, 4vw, 2.9rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

.ac-stat__label {
  margin: 0;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
}

@media (max-width: 767px) {
  .ac-stats__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 36px 0;
    padding-top: 44px;
    padding-bottom: 44px;
  }

  .ac-stat:nth-child(odd) {
    border-left: 0;
  }

  .ac-stat:nth-child(even) {
    border-left: 1px solid rgba(255, 255, 255, 0.12);
  }
}
</style>
