<template>
  <section class="ac-hero">
    <div class="ac-hero__glow ac-hero__glow--a"></div>
    <div class="ac-hero__glow ac-hero__glow--b"></div>
    <div
      v-if="hero.image"
      class="ac-hero__image"
      :style="{ backgroundImage: `url(${hero.image})` }"
    ></div>

    <div class="ac-wrap ac-hero__inner">
      <div class="ac-hero__copy">
        <p class="ac-eyebrow">{{ hero.eyebrow }}</p>

        <h1 class="ac-hero__title">
          {{ hero.titleLead }}
          <span class="ac-hero__accent">{{ hero.titleAccent }}</span>
        </h1>

        <p class="ac-lede ac-hero__lede">{{ hero.body }}</p>

        <div class="ac-hero__actions">
          <q-btn
            class="ac-btn ac-btn--shadow"
            color="primary"
            text-color="white"
            unelevated
            no-caps
            size="lg"
            :label="hero.primary.label"
            @click="go(hero.primary.target)"
          />
          <q-btn
            class="ac-btn ac-hero__ghost"
            flat
            no-caps
            size="lg"
            :label="hero.secondary.label"
            icon-right="arrow_forward"
            @click="go(hero.secondary.target)"
          />
        </div>

        <p class="ac-hero__note">
          <q-icon name="verified" size="18px" />
          <span>{{ hero.note }}</span>
        </p>
      </div>

      <div class="ac-hero__visual" aria-hidden="true">
        <div class="ac-mock">
          <div class="ac-mock__top">
            <span class="ac-mock__dot"></span>
            <span class="ac-mock__dot"></span>
            <span class="ac-mock__dot"></span>
            <span class="ac-mock__title">Week 38 &middot; Timetable</span>
          </div>

          <div class="ac-mock__grid">
            <div
              v-for="(cell, index) in cells"
              :key="index"
              class="ac-mock__cell"
              :class="`ac-mock__cell--${cell}`"
            ></div>
          </div>

          <div class="ac-mock__legend">
            <span><i class="ac-swatch ac-swatch--1"></i>Lessons</span>
            <span><i class="ac-swatch ac-swatch--2"></i>Activities</span>
            <span><i class="ac-swatch ac-swatch--3"></i>Cover</span>
          </div>
        </div>

        <div class="ac-float ac-float--a">
          <q-icon name="trending_up" size="20px" />
          <div>
            <strong>98%</strong>
            <small>Attendance</small>
          </div>
        </div>

        <div class="ac-float ac-float--b">
          <q-icon name="check_circle" size="20px" />
          <div>
            <strong>4 covered</strong>
            <small>Substitutions</small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { hero } from '../landingData'
import { scrollToTarget } from '../scrollToTarget'

// 0 renders an empty period, 1-3 render a tinted lesson block.
const cells = [
  2, 1, 0, 3, 1,
  1, 2, 3, 0, 2,
  0, 3, 1, 2, 1,
  2, 0, 3, 1, 3
]

function go (target) {
  scrollToTarget(target)
}
</script>

<style lang="scss" scoped>
.ac-hero {
  position: relative;
  overflow: hidden;
  padding: 132px 0 100px;
  background: linear-gradient(180deg, #f8fbff 0%, #eef6fd 62%, #f5f9fd 100%);
}

.ac-hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(10px);
  pointer-events: none;
}

.ac-hero__glow--a {
  top: -220px;
  right: -160px;
  width: 620px;
  height: 620px;
  background: radial-gradient(circle, rgba(25, 118, 210, 0.16) 0%, rgba(25, 118, 210, 0) 68%);
}

.ac-hero__glow--b {
  bottom: -260px;
  left: -180px;
  width: 560px;
  height: 560px;
  background: radial-gradient(circle, rgba(38, 166, 154, 0.16) 0%, rgba(38, 166, 154, 0) 68%);
}

.ac-hero__image {
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
  opacity: 0.9;
}

.ac-hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 56px;
  align-items: center;
}

.ac-hero__title {
  margin: 0 0 22px;
  font-size: clamp(2.3rem, 5.2vw, 3.7rem);
  line-height: 1.03;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: var(--ac-ink);
}

.ac-hero__accent {
  display: block;
  color: var(--ac-primary);
}

.ac-hero__lede {
  max-width: 34rem;
  margin-bottom: 32px;
  font-size: 1.08rem;
}

.ac-hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.ac-hero__ghost {
  color: var(--ac-ink-2);
}

.ac-hero__note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 28px 0 0;
  font-size: 0.86rem;
  color: var(--ac-muted);
}

.ac-hero__note .q-icon {
  color: var(--ac-secondary);
}

.ac-hero__visual {
  position: relative;
  justify-self: end;
  width: 100%;
  max-width: 460px;
}

.ac-mock {
  position: relative;
  padding: 18px;
  border: 1px solid var(--ac-border);
  border-radius: var(--ac-radius-lg);
  background: #fff;
  box-shadow: var(--ac-shadow-lg);
  transform: rotate(-1.2deg);
}

.ac-mock__top {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--ac-border);
}

.ac-mock__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dbe6f1;
}

.ac-mock__dot:first-child {
  background: #ffd2d2;
}

.ac-mock__dot:nth-child(2) {
  background: #ffe8b8;
}

.ac-mock__dot:nth-child(3) {
  background: #c7efd8;
}

.ac-mock__title {
  margin-left: auto;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--ac-muted);
}

.ac-mock__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  padding: 16px 0;
}

.ac-mock__cell {
  height: 38px;
  border-radius: 9px;
}

.ac-mock__cell--0 {
  border: 1px dashed #dbe6f1;
  background: #fbfdff;
}

.ac-mock__cell--1 {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.2), rgba(25, 118, 210, 0.1));
}

.ac-mock__cell--2 {
  background: linear-gradient(135deg, rgba(38, 166, 154, 0.22), rgba(38, 166, 154, 0.1));
}

.ac-mock__cell--3 {
  background: linear-gradient(135deg, rgba(156, 39, 176, 0.16), rgba(156, 39, 176, 0.07));
}

.ac-mock__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--ac-border);
  font-size: 0.72rem;
  color: var(--ac-muted);
}

.ac-mock__legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ac-swatch {
  width: 8px;
  height: 8px;
  border-radius: 3px;
}

.ac-swatch--1 {
  background: var(--ac-primary);
}

.ac-swatch--2 {
  background: var(--ac-secondary);
}

.ac-swatch--3 {
  background: #9c27b0;
}

.ac-float {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border: 1px solid var(--ac-border);
  border-radius: 14px;
  background: #fff;
  box-shadow: var(--ac-shadow-md);
  color: var(--ac-ink);
}

.ac-float strong {
  display: block;
  font-size: 0.98rem;
  line-height: 1.2;
}

.ac-float small {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--ac-muted);
}

.ac-float .q-icon {
  color: var(--ac-primary);
}

.ac-float--a {
  top: -24px;
  left: -30px;
}

.ac-float--b {
  right: -18px;
  bottom: -26px;
}

.ac-float--b .q-icon {
  color: var(--ac-secondary);
}

@media (max-width: 1023px) {
  .ac-hero {
    padding: 116px 0 72px;
  }

  .ac-hero__inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 56px;
  }

  .ac-hero__visual {
    justify-self: center;
  }
}

@media (max-width: 599px) {
  .ac-float--a {
    top: -18px;
    left: 0;
  }

  .ac-float--b {
    right: 0;
    bottom: -20px;
  }

  .ac-hero__lede {
    font-size: 1rem;
  }
}
</style>
