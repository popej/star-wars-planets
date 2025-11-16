<template>
  <NuxtLink :to="`/planet/${planet.id}`" class="planet-card">
    <div class="planet-card__header">
      <h3 class="planet-card__title">{{ planet.name }}</h3>
    </div>
    <div class="planet-card__content">
      <div class="planet-card__info">
        <span class="planet-card__label">Population:</span>
        <span class="planet-card__value">{{ formatNumber(planet.population) }}</span>
      </div>
      <div class="planet-card__info">
        <span class="planet-card__label">Distance from Sun:</span>
        <span class="planet-card__value">{{ formatDistance(planet.distanceFromSun) }} AU</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Planet } from '~/types/planet'
import { formatNumber, formatDistance } from '~/utils/planetUtils'

interface Props {
  planet: Planet
}

defineProps<Props>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.planet-card {
  display: block;
  background-color: $color-bg-secondary;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  padding: $spacing-md;
  transition: all $transition-normal;
  cursor: pointer;

  &:hover {
    background-color: $color-bg-tertiary;
    border-color: $color-accent;
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(255, 232, 31, 0.1);
  }

  &__header {
    margin-bottom: $spacing-md;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-accent;
    margin: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $font-size-base;
  }

  &__label {
    color: $color-text-secondary;
    font-weight: $font-weight-medium;
  }

  &__value {
    color: $color-text-primary;
    font-weight: $font-weight-bold;
  }

  @media (max-width: $breakpoint-mobile) {
    padding: $spacing-sm;

    &__title {
      font-size: $font-size-lg;
    }

    &__info {
      font-size: $font-size-sm;
    }
  }
}
</style>
