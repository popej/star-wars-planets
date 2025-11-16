<template>
  <form @submit="onSubmit" class="search-form">
    <div class="search-form__fields">
      <div class="search-form__field">
        <label for="name" class="search-form__label">Planet Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="Search by name..."
          class="search-form__input"
          :class="{ 'search-form__input--error': errors.name }"
        />
        <span v-if="errors.name" class="search-form__error">{{ errors.name }}</span>
      </div>

      <div class="search-form__field">
        <label for="population" class="search-form__label">Min Population</label>
        <input
          id="population"
          v-model="population"
          type="text"
          placeholder="e.g., 1000000"
          class="search-form__input"
          :class="{ 'search-form__input--error': errors.population }"
        />
        <span v-if="errors.population" class="search-form__error">{{ errors.population }}</span>
      </div>
    </div>

    <div class="search-form__actions">
      <button type="submit" class="search-form__button search-form__button--primary">
        Search
      </button>
      <button
        type="button"
        @click="handleReset"
        class="search-form__button search-form__button--secondary"
      >
        Reset
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import type { SearchFilters } from '~/types/planet'

interface Emits {
  (e: 'search', filters: SearchFilters): void
  (e: 'reset'): void
}

const emit = defineEmits<Emits>()

const validationSchema = {
  name: (value: string) => {
    if (value && value.length < 2) {
      return 'Name must be at least 2 characters'
    }
    return true
  },
  population: (value: string) => {
    if (!value) return true

    const cleaned = value.replace(/,/g, '')
    const num = parseInt(cleaned, 10)

    if (isNaN(num)) {
      return 'Population must be a valid number'
    }
    if (num < 0) {
      return 'Population must be a positive number'
    }
    return true
  }
}

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema
})

const { value: name } = useField<string>('name', validationSchema.name)
const { value: population } = useField<string>('population', validationSchema.population)

const onSubmit = handleSubmit((values) => {
  emit('search', {
    name: values.name || '',
    population: values.population || ''
  })
})

const handleReset = () => {
  resetForm()
  emit('reset')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.search-form {
  background-color: $color-bg-secondary;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;

  &__fields {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $spacing-md;
    margin-bottom: $spacing-md;

    @media (max-width: $breakpoint-mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-text-secondary;
  }

  &__input {
    padding: $spacing-sm;
    background-color: $color-bg-primary;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    color: $color-text-primary;
    font-size: $font-size-base;
    transition: border-color $transition-fast;

    &:focus {
      border-color: $color-accent;
    }

    &--error {
      border-color: $color-error;
    }

    &::placeholder {
      color: $color-text-tertiary;
    }
  }

  &__error {
    font-size: $font-size-xs;
    color: $color-error;
    margin-top: $spacing-xs;
  }

  &__actions {
    display: flex;
    gap: $spacing-sm;
    flex-wrap: wrap;
  }

  &__button {
    padding: $spacing-sm $spacing-lg;
    border-radius: $radius-sm;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    transition: all $transition-fast;

    &--primary {
      background-color: $color-accent;
      color: $color-bg-primary;

      &:hover {
        background-color: $color-accent-hover;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(255, 232, 31, 0.3);
      }
    }

    &--secondary {
      background-color: transparent;
      color: $color-text-primary;
      border: 1px solid $color-border;

      &:hover {
        background-color: $color-bg-hover;
        border-color: $color-text-secondary;
      }
    }
  }
}
</style>
