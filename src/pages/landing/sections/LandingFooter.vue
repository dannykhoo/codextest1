<template>
  <footer class="ac-footer">
    <div class="ac-wrap ac-footer__inner">
      <div class="ac-footer__brand">
        <div class="ac-footer__brand-row">
          <svg class="ac-footer__mark" viewBox="0 0 32 32" aria-hidden="true">
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
          <span class="ac-footer__name">{{ brand.name }}</span>
        </div>
        <p class="ac-footer__tagline">{{ brand.tagline }}</p>
      </div>

      <nav
        v-for="column in footer.columns"
        :key="column.title"
        class="ac-footer__col"
        :aria-label="column.title"
      >
        <p class="ac-footer__heading">{{ column.title }}</p>
        <ul class="ac-footer__links">
          <li v-for="link in column.links" :key="link.label">
            <button
              v-if="link.target"
              type="button"
              class="ac-footer__link"
              @click="go(link.target)"
            >
              {{ link.label }}
            </button>
            <a
              v-else
              class="ac-footer__link"
              :href="link.href"
              @click.prevent="onHrefClick(link)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="ac-wrap ac-footer__bottom">
      <p class="ac-footer__legal">
        &copy; {{ brand.year }} {{ brand.legalName }}
      </p>
      <p class="ac-footer__note">All product names are placeholders.</p>
    </div>
  </footer>
</template>

<script setup>
import { brand, footer } from '../landingData'
import { scrollToTarget } from '../scrollToTarget'

function go (target) {
  scrollToTarget(target)
}

function onHrefClick (link) {
  // '#' entries are inert placeholders until real legal pages exist.
  if (!link.href || link.href === '#') return
  window.open(link.href, '_blank', 'noopener')
}
</script>

<style lang="scss" scoped>
.ac-footer {
  background: var(--ac-ink);
  color: #fff;
}

.ac-footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr));
  gap: 48px;
  padding-top: 64px;
  padding-bottom: 48px;
}

.ac-footer__brand-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ac-footer__mark {
  width: 28px;
  height: 28px;
  color: var(--ac-primary);
  flex: none;
}

.ac-footer__name {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.ac-footer__tagline {
  max-width: 22rem;
  margin: 14px 0 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.62);
}

.ac-footer__heading {
  margin: 0 0 14px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
}

.ac-footer__links {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.ac-footer__link {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.ac-footer__link:hover {
  color: #fff;
  text-decoration: underline;
}

.ac-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 22px;
  padding-bottom: 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.ac-footer__legal,
.ac-footer__note {
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 899px) {
  .ac-footer__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 36px;
    padding-top: 48px;
  }

  .ac-footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 599px) {
  .ac-footer__inner {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
