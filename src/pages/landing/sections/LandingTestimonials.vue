<template>
  <section id="testimonials" class="ac-section ac-testimonials">
    <div class="ac-wrap">
      <div class="ac-section__head ac-section__head--center">
        <p class="ac-eyebrow">Testimonials</p>
        <h2 class="ac-title">Schools that stopped chasing paper</h2>
      </div>

      <q-carousel
        v-model="slide"
        class="ac-carousel"
        animated
        infinite
        navigation
        :arrows="!$q.screen.lt.sm"
        :autoplay="autoplay"
        :height="height"
        control-color="primary"
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
      >
        <q-carousel-slide
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.name"
          :name="index"
          class="ac-testimonial"
        >
          <div class="ac-testimonial__body">
            <q-icon name="format_quote" class="ac-testimonial__mark" />
            <p class="ac-testimonial__quote">{{ testimonial.quote }}</p>
            <p class="ac-testimonial__name">{{ testimonial.name }}</p>
            <p class="ac-testimonial__role">{{ testimonial.role }} &middot; {{ testimonial.school }}</p>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { testimonials } from '../landingData'

const $q = useQuasar()
const slide = ref(0)
const paused = ref(false)

const reduceMotion = typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const autoplay = computed(() => (paused.value || reduceMotion ? false : 6000))
const height = computed(() => ($q.screen.lt.sm ? '420px' : '300px'))
</script>

<style lang="scss" scoped>
.ac-testimonials {
  background: var(--ac-surface);
}

.ac-carousel {
  border-radius: var(--ac-radius-lg);
  background: var(--ac-surface-alt);
}

.ac-testimonial {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
}

.ac-testimonial__body {
  max-width: 760px;
  text-align: center;
}

.ac-testimonial__mark {
  font-size: 2.2rem;
  color: var(--ac-primary);
  opacity: 0.35;
}

.ac-testimonial__quote {
  margin: 6px 0 24px;
  font-size: clamp(1.05rem, 2.1vw, 1.38rem);
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: -0.01em;
  color: var(--ac-ink);
}

.ac-testimonial__name {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--ac-ink);
}

.ac-testimonial__role {
  margin: 2px 0 0;
  font-size: 0.82rem;
  color: var(--ac-muted);
}
</style>
