<template>
  <div class="home">
    <div class="container">
      <header class="home__header">
        <h1 class="home__title">Star Wars Planets</h1>
        <p class="home__subtitle">Explore planets from a galaxy far, far away</p>
      </header>

      <SearchForm @search="handleSearch" @reset="handleReset" />

      <SortControls
        v-model:sortField="sortField"
        v-model:sortOrder="sortOrder"
      />

      <SkeletonLoader v-if="pending && planets.length === 0" :count="10" />

      <div v-else-if="planets.length > 0" class="home__grid">
        <PlanetCard v-for="planet in sortedPlanets" :key="planet.id" :planet="planet" />
      </div>

      <div v-else class="home__empty">
        <p>No planets found. Try adjusting your search criteria.</p>
      </div>

      <div v-if="hasMore && !pending" ref="loadMoreTrigger" class="home__load-more">
        <button @click="loadMore" class="home__load-button">
          Load More Planets
        </button>
      </div>

      <div v-if="pending && planets.length > 0" class="home__loading">
        <SkeletonLoader :count="3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Planet, SortField, SortOrder, SearchFilters } from '../types/planet'

// SEO
useHead({
  title: 'Star Wars Planets - Explore the Galaxy',
  meta: [
    { name: 'description', content: 'Browse and search planets from the Star Wars universe. View population, distance from sun, and detailed information.' }
  ]
})

const { fetchPlanets, fetchPlanetsByUrl } = useSwapi()

// State
const planets = ref<Planet[]>([])
const sortField = ref<SortField>('population')
const sortOrder = ref<SortOrder>('desc')
const pending = ref(false)
const nextUrl = ref<string | null>(null)
const currentSearchFilters = ref<SearchFilters>({ name: '', population: '' })

// Load more trigger for infinite scroll
const loadMoreTrigger = ref<HTMLElement | null>(null)

// Initial data fetch with SSR
const { data: initialData, error } = await useAsyncData('planets', () => fetchPlanets(1))

if (error.value) {
  console.error('Error loading initial planets:', error.value)
}

if (initialData.value) {
  planets.value = initialData.value.results
  nextUrl.value = initialData.value.next
}

// Computed
const hasMore = computed(() => !!nextUrl.value)

const sortedPlanets = computed(() => {
  const sorted = [...planets.value]

  sorted.sort((a, b) => {
    const aValue = a[sortField.value]
    const bValue = b[sortField.value]

    // Handle zero values (unknown) - push to end
    if (aValue === 0 && bValue === 0) return 0
    if (aValue === 0) return 1
    if (bValue === 0) return -1

    if (sortOrder.value === 'asc') {
      return aValue - bValue
    } else {
      return bValue - aValue
    }
  })

  return sorted
})

// Methods
const handleSearch = async (filters: SearchFilters) => {
  currentSearchFilters.value = filters
  pending.value = true

  try {
    const results = await fetchPlanets(1, filters.name)

    // Filter by population if specified
    let filteredResults = results.results

    if (filters.population) {
      const minPopulation = parseInt(filters.population.replace(/,/g, ''), 10)
      if (!isNaN(minPopulation)) {
        filteredResults = filteredResults.filter(
          (planet) => planet.population >= minPopulation
        )
      }
    }

    planets.value = filteredResults
    nextUrl.value = results.next
  } catch (err) {
    console.error('Search error:', err)
  } finally {
    pending.value = false
  }
}

const handleReset = async () => {
  currentSearchFilters.value = { name: '', population: '' }
  pending.value = true

  try {
    const results = await fetchPlanets(1)
    planets.value = results.results
    nextUrl.value = results.next
  } catch (err) {
    console.error('Reset error:', err)
  } finally {
    pending.value = false
  }
}

const loadMore = async () => {
  if (!nextUrl.value || pending.value) return

  pending.value = true

  try {
    const results = await fetchPlanetsByUrl(nextUrl.value)

    // Apply population filter if active
    let newPlanets = results.results

    if (currentSearchFilters.value.population) {
      const minPopulation = parseInt(
        currentSearchFilters.value.population.replace(/,/g, ''),
        10
      )
      if (!isNaN(minPopulation)) {
        newPlanets = newPlanets.filter((planet) => planet.population >= minPopulation)
      }
    }

    planets.value = [...planets.value, ...newPlanets]
    nextUrl.value = results.next
  } catch (err) {
    console.error('Load more error:', err)
  } finally {
    pending.value = false
  }
}

// Infinite scroll observer
onMounted(() => {
  if (!loadMoreTrigger.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !pending.value) {
        loadMore()
      }
    },
    { threshold: 0.1 }
  )

  observer.observe(loadMoreTrigger.value)

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables.scss' as *;

.home {
  min-height: 100vh;
  padding: $spacing-xl 0;

  &__header {
    text-align: center;
    margin-bottom: $spacing-xl;
  }

  &__title {
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $color-accent;
    margin-bottom: $spacing-sm;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-2xl;
    }
  }

  &__subtitle {
    font-size: $font-size-lg;
    color: $color-text-secondary;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-base;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;

    @media (max-width: $breakpoint-mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__empty {
    text-align: center;
    padding: $spacing-xl;
    background-color: $color-bg-secondary;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    color: $color-text-secondary;
    font-size: $font-size-lg;
  }

  &__load-more {
    display: flex;
    justify-content: center;
    margin-top: $spacing-xl;
  }

  &__load-button {
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

  &__loading {
    margin-top: $spacing-xl;
  }
}
</style>
