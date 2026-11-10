# Coding Style Guide

This project is a Vue 3 application built with Quasar, Pinia, Vue Router, Axios, and Tabulator. Follow the conventions already present in the file being changed. The codebase has some older JavaScript/store files and newer landing-page components with slightly different formatting, so preserve local style when extending existing code.

## General rules

- Keep changes focused and avoid unrelated refactors.
- Use the existing Quasar aliases such as `pages/*`, `layouts/*`, `components/*`, `boot/*`, and `stores/*`.
- Prefer small, named helper functions over deeply nested inline logic.
- Keep user-facing strings clear and concise.
- Use comments for non-obvious behavior or temporary/demo behavior; do not comment obvious code.
- Do not commit secrets, tokens, private endpoints, or environment-specific credentials.

## Vue components

- Use Vue 3 `<script setup>` for new components.
- Keep component structure in the order: `<template>`, `<script setup>`, then `<style lang="scss" scoped>` when styles are component-specific.
- Use Quasar components (`q-btn`, `q-card`, `q-input`, `q-icon`, etc.) for UI elements instead of recreating their behavior.
- Use `ref`, `computed`, and lifecycle hooks from Vue explicitly.
- Keep template expressions simple; move non-trivial work into script helpers or computed values.
- Use `v-model.trim` for user-entered text where appropriate, `:key` for rendered lists, and semantic attributes such as `aria-label` for icon-only controls.
- For async form actions, guard against duplicate submissions, show loading state, handle success and failure, and restore state in `finally`.

## JavaScript style

- Newer page/component code uses single quotes, no semicolons, two-space indentation, and a space before function parentheses: `function go (target) {}`.
- Prefer `const`; use `let` only when reassignment is required.
- Use object spread for shallow state updates and preserve existing object fields.
- Use trailing commas only where the surrounding file already uses them.
- Older files such as stores and payment forms may use semicolons, double quotes, or different spacing. Match those files instead of reformatting them wholesale.
- Use `async`/`await` for sequential asynchronous flows and handle failures explicitly.
- Use strict equality (`===`) in new code. If touching an old loose comparison, update it only when behavior is clearly preserved.
- Avoid debug logging in committed application paths unless it is intentional and useful.

## State and API code

- Keep shared state in Pinia stores under `src/stores`.
- Store updates use dedicated actions such as `objUserUpdate`, `objEventUpdate`, and `objStoreUpdate`; follow this naming pattern for related state.
- Preserve the existing `obj*` and `ar*` naming conventions when working in the legacy store.
- Use the configured Axios boot module/API rather than creating ad-hoc clients in components.
- Keep API endpoints and server configuration centralized in the existing event/config state where possible.
- Do not expose tokens or sensitive response data in logs.

## Routing

- Define route records in `src/router/routes.js` and use lazy imports for pages.
- Keep the catch-all route last.
- Preserve the existing authentication/permission guard behavior when adding protected routes.
- Prefer the existing Quasar router setup and history configuration.

## Styling

- Use SCSS and scoped styles for component-specific rules.
- Landing-page styles use the `ac-` prefix and BEM-like names such as `.ac-header__inner` and `.ac-feature--cta`; follow that pattern for new landing UI.
- Reuse existing CSS variables such as `--ac-primary`, `--ac-ink`, `--ac-border`, and shared spacing/radius/shadow tokens.
- Prefer responsive grid/flex layouts with the existing breakpoints (`1199px`, `959px`, `899px`, and `599px`) when working on landing pages.
- Keep transitions subtle and preserve accessible focus/hover behavior.

## File organization

- Pages belong under `src/pages`.
- Reusable layouts belong under `src/layouts` and reusable UI under `src/components`.
- Landing-page sections belong under `src/pages/landing/sections`.
- Static/configuration data for a feature should remain in nearby data modules such as `landingData.js` rather than being duplicated across templates.
- Keep boot-time integrations in `src/boot`.

## Verification

- Run `npm run build` after meaningful application changes.
- Use `npm run dev` for visual/UI checks when needed.
- There is currently no real automated test suite; `npm test` is a placeholder that exits successfully without running tests.
- Before finishing, check changed imports, route paths, responsive behavior, and browser-console errors.
