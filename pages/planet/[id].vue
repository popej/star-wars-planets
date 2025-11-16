<template>
  <div class="planet-detail">
    <div class="container">
      <button @click="goBack" class="planet-detail__back">
        <span class="planet-detail__back-icon">←</span>
        Back to Planets
      </button>

      <div v-if="planet" class="planet-detail__content">
        <header class="planet-detail__header">
          <h1 class="planet-detail__title">{{ planet.name }}</h1>
        </header>

        <section class="planet-detail__section">
          <h2 class="planet-detail__section-title">Basic Information</h2>
          <div class="planet-detail__grid">
            <div class="planet-detail__info-card">
              <span class="planet-detail__label">Diameter</span>
              <span class="planet-detail__value">{{ formatNumber(planet.diameter) }} km</span>
            </div>
            <div class="planet-detail__info-card">
              <span class="planet-detail__label">Population</span>
              <span class="planet-detail__value">{{ formatNumber(planet.population) }}</span>
            </div>
            <div class="planet-detail__info-card">
              <span class="planet-detail__label">Distance from Sun</span>
              <span class="planet-detail__value">{{ formatDistance(planet.distanceFromSun) }} AU</span>
            </div>
            <div class="planet-detail__info-card">
              <span class="planet-detail__label">Orbital Period</span>
              <span class="planet-detail__value">{{ planet.orbitalPeriod || 'Unknown' }} days</span>
            </div>
          </div>
        </section>

        <section class="planet-detail__section">
          <h2 class="planet-detail__section-title">Characteristics</h2>
          <div class="planet-detail__characteristics">
            <div class="planet-detail__characteristic">
              <h3 class="planet-detail__characteristic-title">Climate</h3>
              <p class="planet-detail__characteristic-text">{{ planet.climate }}</p>
            </div>
            <div class="planet-detail__characteristic">
              <h3 class="planet-detail__characteristic-title">Gravity</h3>
              <p class="planet-detail__characteristic-text">{{ planet.gravity }}</p>
            </div>
            <div class="planet-detail__characteristic">
              <h3 class="planet-detail__characteristic-title">Terrain</h3>
              <p class="planet-detail__characteristic-text">{{ planet.terrain }}</p>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="planet-detail__error">
        <h2>Planet Not Found</h2>
        <p>The planet you're looking for doesn't exist or has been destroyed by the Death Star.</p>
        <button @click="goBack" class="planet-detail__error-button">
          Return to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatNumber, formatDistance } from '~/utils/planetUtils'

const route = useRoute()
const router = useRouter()
const { fetchPlanet } = useSwapi()

const planetId = computed(() => parseInt(route.params.id as string, 10))

// Fetch planet data with SSR
const { data: planet, error } = await useAsyncData(
  `planet-${planetId.value}`,
  () => fetchPlanet(planetId.value)
)

// SEO
useHead({
  title: planet.value ? `${planet.value.name} - Star Wars Planets` : 'Planet Not Found',
  meta: [
    {
      name: 'description',
      content: planet.value
        ? `Learn about ${planet.value.name}: ${planet.value.climate} climate, ${planet.value.terrain} terrain. Population: ${formatNumber(planet.value.population)}.`
        : 'Planet information not available'
    }
  ]
})

if (error.value) {
  console.error('Error loading planet:', error.value)
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.planet-detail {
  min-height: 100vh;
  padding: $spacing-xl 0;

  &__back {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    padding: $spacing-sm $spacing-md;
    background-color: $color-bg-secondary;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    color: $color-text-primary;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    margin-bottom: $spacing-xl;
    transition: all $transition-fast;

    &:hover {
      background-color: $color-bg-tertiary;
      border-color: $color-accent;
      color: $color-accent;
      transform: translateX(-4px);
    }

    &-icon {
      font-size: $font-size-xl;
    }
  }

  &__content {
    max-width: 900px;
  }

  &__header {
    margin-bottom: $spacing-xl;
  }

  &__title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $color-accent;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-2xl;
    }
  }

  &__section {
    margin-bottom: $spacing-xl;
  }

  &__section-title {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    margin-bottom: $spacing-lg;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-xl;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: $spacing-md;

    @media (max-width: $breakpoint-mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__info-card {
    background-color: $color-bg-secondary;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    padding: $spacing-md;
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }

  &__label {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    font-weight: $font-weight-medium;
  }

  &__value {
    font-size: $font-size-xl;
    color: $color-text-primary;
    font-weight: $font-weight-bold;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-lg;
    }
  }

  &__characteristics {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
  }

  &__characteristic {
    background-color: $color-bg-secondary;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    padding: $spacing-md;
  }

  &__characteristic-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $color-accent;
    margin-bottom: $spacing-sm;
  }

  &__characteristic-text {
    font-size: $font-size-base;
    color: $color-text-primary;
    line-height: 1.6;
    text-transform: capitalize;
  }

  &__error {
    text-align: center;
    padding: $spacing-xl;
    background-color: $color-bg-secondary;
    border: 1px solid $color-border;
    border-radius: $radius-md;

    h2 {
      font-size: $font-size-2xl;
      color: $color-error;
      margin-bottom: $spacing-md;
    }

    p {
      font-size: $font-size-lg;
      color: $color-text-secondary;
      margin-bottom: $spacing-lg;
    }
  }

  &__error-button {
    padding: $spacing-md $spacing-xl;
    background-color: $color-accent;
    color: $color-bg-primary;
    border-radius: $radius-md;
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    transition: all $transition-normal;

    &:hover {
      background-color: $color-accent-hover;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(255, 232, 31, 0.3);
    }
  }
}
</style>
