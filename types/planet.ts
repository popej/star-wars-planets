// SWAPI Planet Response Interface
export interface SwapiPlanet {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

// Processed Planet with calculated distance
export interface Planet extends Pick<SwapiPlanet, 'name' | 'climate' | 'gravity' | 'terrain' | 'url'> {
  id: number
  population: number // Parsed from string
  populationString: string // For display (handles "unknown")
  orbitalPeriod: number // Parsed from string
  distanceFromSun: number // Calculated using Kepler's law
  diameter: number // Parsed from string
  diameterString: string // For display (handles "unknown")
}

// SWAPI Paginated Response
export interface SwapiPaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Sort options
export type SortField = 'population' | 'distanceFromSun'
export type SortOrder = 'asc' | 'desc'

// Search filters
export interface SearchFilters {
  name: string
  population: string
}
