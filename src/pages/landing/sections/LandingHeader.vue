<template>
  <header class="ac-header" :class="{ 'ac-header--solid': scrolled }">
    <div class="ac-wrap ac-header__inner">
      <a
        class="ac-brand"
        href="#"
        :aria-label="`${brand.name} — back to top`"
        @click.prevent="onTop"
      >
        <svg class="ac-brand__mark" viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="9" fill="currentColor" />
          <path
            d="M9 22.5 16 9l7 13.5"
            fill="none"
            stroke="#fff"
            stroke-width="2.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M12.4 18h7.2" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" />
        </svg>
        <span class="ac-brand__name">{{ brand.name }}</span>
      </a>

      <nav class="ac-nav" aria-label="Main">
        <button
          v-for="item in nav"
          :key="item.target"
          type="button"
          class="ac-nav__link"
          @click="go(item.target)"
        >
          {{ item.label }}
        </button>
      </nav>

      <div class="ac-header__actions">
        <q-btn class="ac-lang" flat round dense icon="language" aria-label="Change language">
          <q-menu anchor="bottom right" self="top right" :offset="[0, 10]">
            <q-list dense style="min-width: 190px">
              <q-item-label header>Language</q-item-label>
              <q-item
                v-for="lang in languages"
                :key="lang.code"
                :disable="!lang.active"
                :active="lang.active"
                active-class="ac-lang__active"
                clickable
              >
                <q-item-section>{{ lang.label }}</q-item-section>
                <q-item-section v-if="lang.active" side>
                  <q-icon name="check" size="18px" />
                </q-item-section>
                <q-item-section v-else side>
                  <span class="ac-lang__soon">soon</span>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn
          class="ac-btn ac-btn--shadow ac-header__cta"
          color="primary"
          text-color="white"
          unelevated
          no-caps
          label="Get in touch"
          @click="go('contact')"
        />

        <q-btn
          class="ac-header__burger"
          flat
          round
          dense
          icon="menu"
          aria-label="Open menu"
          @click="mobileOpen = true"
        />
      </div>
    </div>
  </header>

  <q-drawer v-model="mobileOpen" side="right" overlay bordered :width="288">
    <div class="ac-drawer">
      <div class="ac-drawer__top">
        <span class="ac-drawer__brand">{{ brand.name }}</span>
        <q-btn flat round dense icon="close" aria-label="Close menu" @click="mobileOpen = false" />
      </div>

      <q-list class="ac-drawer__list">
        <q-item
          v-for="item in nav"
          :key="item.target"
          clickable
          v-close-popup
          @click="go(item.target)"
        >
          <q-item-section class="ac-drawer__link">{{ item.label }}</q-item-section>
        </q-item>
      </q-list>

      <div class="ac-drawer__actions">
        <q-btn
          class="ac-btn full-width"
          color="primary"
          text-color="white"
          unelevated
          no-caps
          label="Get in touch"
          @click="go('contact')"
        />
        <p class="ac-drawer__note">{{ brand.tagline }}</p>
      </div>
    </div>
  </q-drawer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { brand, nav, languages } from '../landingData'
import { scrollToTarget, scrollToTop } from '../scrollToTarget'

const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll () {
  scrolled.value = window.scrollY > 80
}

function go (target) {
  mobileOpen.value = false
  scrollToTarget(target)
}

function onTop () {
  mobileOpen.value = false
  scrollToTop()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss" scoped>
.ac-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 2000;
  border-bottom: 1px solid transparent;
  transition: background-color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.ac-header--solid {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  border-bottom-color: var(--ac-border);
  box-shadow: 0 6px 24px -18px rgba(13, 33, 55, 0.55);
}

.ac-header__inner {
  display: flex;
  align-items: center;
  gap: 28px;
  height: var(--ac-header-h);
}

.ac-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--ac-primary);
  text-decoration: none;
}

.ac-brand__mark {
  width: 30px;
  height: 30px;
  flex: none;
}

.ac-brand__name {
  font-size: 1.12rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ac-ink);
}

.ac-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
}

.ac-nav__link {
  padding: 8px 12px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  font: inherit;
  font-size: 0.94rem;
  font-weight: 500;
  color: var(--ac-ink-2);
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.ac-nav__link:hover {
  color: var(--ac-primary-dark);
  background: rgba(25, 118, 210, 0.07);
}

.ac-header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.ac-lang {
  color: var(--ac-ink-2);
}

.ac-lang__active {
  color: var(--ac-primary) !important;
  font-weight: 600;
}

.ac-lang__soon {
  font-size: 0.66rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ac-muted);
}

.ac-header__burger {
  display: none;
  color: var(--ac-ink);
}

.ac-drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 18px 12px 24px;
}

.ac-drawer__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 14px;
  border-bottom: 1px solid var(--ac-border);
}

.ac-drawer__brand {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--ac-ink);
}

.ac-drawer__list {
  margin-top: 10px;
}

.ac-drawer__link {
  font-size: 1rem;
  font-weight: 500;
  color: var(--ac-ink-2);
}

.ac-drawer__actions {
  margin-top: auto;
  padding: 16px 8px 0;
  border-top: 1px solid var(--ac-border);
}

.ac-drawer__note {
  margin: 14px 0 0;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--ac-muted);
  text-align: center;
}

@media (max-width: 959px) {
  .ac-nav {
    display: none;
  }

  .ac-header__burger {
    display: inline-flex;
  }
}

@media (max-width: 599px) {
  .ac-header__cta {
    display: none;
  }
}
</style>
