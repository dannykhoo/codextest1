<template>
  <section id="features" class="ac-section ac-section--alt ac-features">
    <div class="ac-wrap">
      <div class="ac-section__head">
        <p class="ac-eyebrow">What we do</p>
        <h2 class="ac-title">One system for every part of the school day</h2>
        <p class="ac-lede">
          Pick the pieces you need today and add the rest when you are ready. Everything
          shares the same data, so nothing has to be typed twice.
        </p>
      </div>

      <div class="ac-features__grid">
        <q-card
          v-for="feature in features"
          :key="feature.title"
          flat
          class="ac-feature"
          :class="{ 'ac-feature--cta': feature.isCta }"
        >
          <q-card-section class="ac-feature__inner">
            <div class="ac-feature__icon">
              <q-icon :name="feature.icon" size="22px" />
            </div>

            <h3 class="ac-feature__title">{{ feature.title }}</h3>
            <p class="ac-feature__text">{{ feature.text }}</p>

            <a
              v-if="feature.href"
              class="ac-feature__link"
              :href="feature.href"
              target="_blank"
              rel="noopener"
            >
              Read more
              <q-icon name="arrow_forward" size="16px" />
            </a>
            <button
              v-else-if="feature.isCta"
              type="button"
              class="ac-feature__link"
              @click="go('contact')"
            >
              Ask us about it
              <q-icon name="arrow_forward" size="16px" />
            </button>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { features } from '../landingData'
import { scrollToTarget } from '../scrollToTarget'

function go (target) {
  scrollToTarget(target)
}
</script>

<style lang="scss" scoped>
.ac-features__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.ac-feature {
  height: 100%;
  border: 1px solid var(--ac-border);
  border-radius: var(--ac-radius);
  background: #fff;
  box-shadow: var(--ac-shadow-sm);
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.ac-feature:hover {
  transform: translateY(-3px);
  border-color: rgba(25, 118, 210, 0.28);
  box-shadow: var(--ac-shadow-md);
}

.ac-feature__inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px 22px;
}

.ac-feature__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 18px;
  border-radius: 13px;
  background: rgba(25, 118, 210, 0.09);
  color: var(--ac-primary);
}

.ac-feature__title {
  margin: 0 0 8px;
  font-size: 1.02rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--ac-ink);
}

.ac-feature__text {
  margin: 0 0 16px;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--ac-body);
}

.ac-feature__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--ac-primary);
  text-decoration: none;
  cursor: pointer;
}

.ac-feature__link:hover {
  color: var(--ac-primary-dark);
}

.ac-feature__link .q-icon {
  transition: transform 0.2s ease;
}

.ac-feature__link:hover .q-icon {
  transform: translateX(3px);
}

.ac-feature--cta {
  border-color: transparent;
  background: linear-gradient(135deg, var(--ac-ink) 0%, var(--ac-ink-2) 100%);
}

.ac-feature--cta .ac-feature__icon {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.ac-feature--cta .ac-feature__title {
  color: #fff;
}

.ac-feature--cta .ac-feature__text {
  color: rgba(255, 255, 255, 0.75);
}

.ac-feature--cta .ac-feature__link {
  color: #9fd7ff;
}

.ac-feature--cta .ac-feature__link:hover {
  color: #fff;
}

@media (max-width: 1199px) {
  .ac-features__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 899px) {
  .ac-features__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 599px) {
  .ac-features__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
