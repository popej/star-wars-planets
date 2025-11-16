<template>
  <div class="skeleton-loader">
    <div v-for="i in count" :key="i" class="skeleton-loader__card">
      <div class="skeleton-loader__header">
        <div class="skeleton skeleton-loader__title"></div>
      </div>
      <div class="skeleton-loader__content">
        <div class="skeleton skeleton-loader__line"></div>
        <div class="skeleton skeleton-loader__line"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count?: number
}

withDefaults(defineProps<Props>(), {
  count: 3
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.skeleton-loader {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $spacing-lg;

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: 1fr;
  }

  &__card {
    background-color: $color-bg-secondary;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    padding: $spacing-md;
  }

  &__header {
    margin-bottom: $spacing-md;
  }

  &__title {
    height: 28px;
    width: 60%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__line {
    height: 20px;
    width: 100%;

    &:last-child {
      width: 80%;
    }
  }
}
</style>
