<template>
  <section id="pillars" class="ac-section ac-pillars">
    <div class="ac-wrap">
      <div class="ac-section__head">
        <p class="ac-eyebrow">Why us</p>
        <h2 class="ac-title">The four things we obsess about</h2>
        <p class="ac-lede">
          School software should disappear into the working day. When it does, these are the
          things your staff, parents and students notice.
        </p>
      </div>

      <div class="ac-pillars__grid">
        <article
          v-for="(pillar, index) in pillars"
          :key="pillar.word"
          class="ac-pillar"
        >
          <span class="ac-pillar__index">{{ String(index + 1).padStart(2, '0') }}</span>
          <p class="ac-pillar__lead">{{ pillar.lead }}</p>
          <p class="ac-pillar__word">{{ pillar.word }}</p>
          <p class="ac-pillar__note">{{ pillar.note }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { pillars } from '../landingData'
</script>

<style lang="scss" scoped>
.ac-pillars {
  position: relative;
  overflow: hidden;
  background: var(--ac-surface-alt);
}

.ac-pillars::before {
  content: '';
  position: absolute;
  top: -140px;
  right: -140px;
  width: 620px;
  height: 620px;
  pointer-events: none;
  background-image: radial-gradient(
    circle at center,
    transparent 118px,
    rgba(25, 118, 210, 0.07) 118px,
    rgba(25, 118, 210, 0.07) 120px,
    transparent 120px,
    transparent 178px,
    rgba(38, 166, 154, 0.07) 178px,
    rgba(38, 166, 154, 0.07) 180px,
    transparent 180px
  );
}

.ac-pillars__grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 52px 64px;
}

.ac-pillar {
  position: relative;
  padding-top: 22px;
  border-top: 1px solid var(--ac-border);
}

.ac-pillar__index {
  position: absolute;
  top: 22px;
  right: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--ac-muted);
}

.ac-pillar__lead {
  margin: 0;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ac-primary);
}

.ac-pillar:nth-child(even) .ac-pillar__lead {
  color: var(--ac-secondary);
}

.ac-pillar__word {
  margin: 6px 0 14px;
  font-size: clamp(2rem, 3.4vw, 2.85rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: var(--ac-ink);
}

.ac-pillar__note {
  max-width: 30rem;
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--ac-body);
}

@media (max-width: 767px) {
  .ac-pillars__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 36px;
  }
}
</style>
