<template>
  <div class="sort-controls">
    <span class="sort-controls__label">Sort by:</span>
    <div class="sort-controls__buttons">
      <button
        @click="handleSort('population')"
        class="sort-controls__button"
        :class="{ 'sort-controls__button--active': sortField === 'population' }"
      >
        Population
        <span v-if="sortField === 'population'" class="sort-controls__icon">
          {{ sortOrder === 'asc' ? '↑' : '↓' }}
        </span>
      </button>
      <button
        @click="handleSort('distanceFromSun')"
        class="sort-controls__button"
        :class="{ 'sort-controls__button--active': sortField === 'distanceFromSun' }"
      >
        Distance
        <span v-if="sortField === 'distanceFromSun'" class="sort-controls__icon">
          {{ sortOrder === 'asc' ? '↑' : '↓' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SortField, SortOrder } from '~/types/planet'

interface Props {
  sortField: SortField
  sortOrder: SortOrder
}

interface Emits {
  (e: 'update:sortField', value: SortField): void
  (e: 'update:sortOrder', value: SortOrder): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleSort = (field: SortField) => {
  if (props.sortField === field) {
    // Toggle order if same field
    emit('update:sortOrder', props.sortOrder === 'asc' ? 'desc' : 'asc')
  } else {
    // New field, default to descending
    emit('update:sortField', field)
    emit('update:sortOrder', 'desc')
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.sort-controls {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
  flex-wrap: wrap;

  &__label {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
  }

  &__buttons {
    display: flex;
    gap: $spacing-sm;
    flex-wrap: wrap;
  }

  &__button {
    padding: $spacing-xs $spacing-md;
    background-color: $color-bg-secondary;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    color: $color-text-primary;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    transition: all $transition-fast;

    &:hover {
      background-color: $color-bg-tertiary;
      border-color: $color-border-light;
    }

    &--active {
      background-color: $color-accent;
      color: $color-bg-primary;
      border-color: $color-accent;

      &:hover {
        background-color: $color-accent-hover;
      }
    }
  }

  &__icon {
    font-size: $font-size-lg;
    line-height: 1;
  }

  @media (max-width: $breakpoint-mobile) {
    &__label {
      width: 100%;
    }
  }
}
</style>
