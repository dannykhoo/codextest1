<template>
  <q-layout view="hHh lpR fFf">
    <LandingHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <LandingFooter />
  </q-layout>
</template>

<script setup>
import LandingHeader from 'pages/landing/sections/LandingHeader.vue'
import LandingFooter from 'pages/landing/sections/LandingFooter.vue'
</script>
