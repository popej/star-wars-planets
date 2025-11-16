<template>
  <NuxtLayout>
    <NuxtPage :transition="{
      name: 'star-wars',
      mode: 'out-in',
      appear: true
    }" />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://swapi.dev',
      crossorigin: 'anonymous'
    },
    {
      rel: 'dns-prefetch',
      href: 'https://swapi.dev'
    }
  ]
})
</script>

<style>
/* Hide overflow during transition */
html:has(.star-wars-enter-active),
html:has(.star-wars-leave-active) {
  overflow: hidden !important;
}

/* Star Wars Wipe Transition */
.star-wars-enter-active,
.star-wars-leave-active {
  transition: all 0.6s cubic-bezier(0.85, 0, 0.15, 1);
  overflow: hidden;
}

.star-wars-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
  filter: brightness(1.5);
}

.star-wars-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
  filter: brightness(1);
}

.star-wars-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
  filter: brightness(1);
}

.star-wars-leave-to {
  opacity: 0;
  transform: translateX(-100%) scale(0.95);
  filter: brightness(0.5);
}

/* Add wipe effect overlay */
.page-wrapper {
  position: relative;
  isolation: isolate;
}

</style>
