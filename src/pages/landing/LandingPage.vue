<template>
  <div class="landing-page">
    <LandingHero />
    <LandingStats />
    <LandingPillars />
    <LandingTestimonials />
    <LandingFeatures />
    <LandingContact />
  </div>
</template>

<script setup>
import { useMeta } from 'quasar'
import { brand, hero } from './landingData'
import LandingHero from './sections/LandingHero.vue'
import LandingStats from './sections/LandingStats.vue'
import LandingPillars from './sections/LandingPillars.vue'
import LandingTestimonials from './sections/LandingTestimonials.vue'
import LandingFeatures from './sections/LandingFeatures.vue'
import LandingContact from './sections/LandingContact.vue'

useMeta({
  title: `${brand.name} — ${brand.tagline}`,
  meta: {
    description: {
      name: 'description',
      content: hero.body
    },
    ogTitle: {
      property: 'og:title',
      content: `${brand.name} — ${brand.tagline}`
    },
    ogDescription: {
      property: 'og:description',
      content: hero.body
    },
    ogType: {
      property: 'og:type',
      content: 'website'
    }
  }
})
</script>

<style lang="scss" scoped>
.landing-page {
  overflow-x: clip;
}
</style>
