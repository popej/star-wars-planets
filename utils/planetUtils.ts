import type { SwapiPlanet, Planet } from '~/types/planet'

/**
 * Calculate relative distance from sun using Kepler's Third Law
 * Formula: distance ∝ orbital_period^(2/3)
 *
 * @param orbitalPeriod - The orbital period in days
 * @returns Relative distance from sun in arbitrary units
 */
export function calculateDistanceFromSun(orbitalPeriod: number): number {
  if (!orbitalPeriod || orbitalPeriod <= 0) {
    return 0
  }
  // Using Kepler's Third Law: a = T^(2/3)
  return Math.pow(orbitalPeriod, 2 / 3)
}

/**
 * Extract planet ID from SWAPI URL
 * Example: "https://swapi.dev/api/planets/1/" -> 1
 */
export function extractPlanetId(url: string): number {
  const match = url.match(/\/planets\/(\d+)\/?$/)
  return match ? parseInt(match[1], 10) : 0
}

/**
 * Parse string to number, handling "unknown" values
 */
export function parseNumberOrZero(value: string): number {
  if (!value || value.toLowerCase() === 'unknown' || value === 'n/a') {
    return 0
  }
  // Remove commas from numbers
  const cleaned = value.replace(/,/g, '')
  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

/**
 * Convert SWAPI planet to processed Planet object
 */
export function transformPlanet(swapiPlanet: SwapiPlanet): Planet {
  const orbitalPeriod = parseNumberOrZero(swapiPlanet.orbital_period)
  const population = parseNumberOrZero(swapiPlanet.population)
  const diameter = parseNumberOrZero(swapiPlanet.diameter)

  return {
    id: extractPlanetId(swapiPlanet.url),
    name: swapiPlanet.name,
    population,
    populationString: swapiPlanet.population,
    orbitalPeriod,
    distanceFromSun: calculateDistanceFromSun(orbitalPeriod),
    diameter,
    diameterString: swapiPlanet.diameter,
    climate: swapiPlanet.climate,
    gravity: swapiPlanet.gravity,
    terrain: swapiPlanet.terrain,
    url: swapiPlanet.url
  }
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
  if (num === 0) return 'Unknown'
  return num.toLocaleString()
}

/**
 * Format distance for display (rounded to 2 decimal places)
 */
export function formatDistance(distance: number): string {
  if (distance === 0) return 'Unknown'
  return distance.toFixed(2)
}
