<template>
  <NuxtLayout>
    <NuxtPage />
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
