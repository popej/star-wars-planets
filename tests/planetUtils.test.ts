import { describe, it, expect } from 'vitest'
import {
  calculateDistanceFromSun,
  extractPlanetId,
  parseNumberOrZero,
  transformPlanet,
  formatNumber,
  formatDistance
} from '../utils/planetUtils'
import type { SwapiPlanet } from '../types/planet'

describe('planetUtils', () => {
  describe('calculateDistanceFromSun', () => {
    it('should calculate distance using Kepler\'s third law', () => {
      const distance = calculateDistanceFromSun(304)
      expect(distance).toBeCloseTo(45.21, 1)
    })

    it('should return 0 for invalid orbital period', () => {
      expect(calculateDistanceFromSun(0)).toBe(0)
      expect(calculateDistanceFromSun(-1)).toBe(0)
    })

    it('should handle Earth-like orbital period', () => {
      const distance = calculateDistanceFromSun(365)
      expect(distance).toBeGreaterThan(40)
    })
  })

  describe('extractPlanetId', () => {
    it('should extract planet ID from SWAPI URL', () => {
      expect(extractPlanetId('https://swapi.dev/api/planets/1/')).toBe(1)
      expect(extractPlanetId('https://swapi.dev/api/planets/10/')).toBe(10)
      expect(extractPlanetId('https://swapi.dev/api/planets/42/')).toBe(42)
    })

    it('should handle URLs without trailing slash', () => {
      expect(extractPlanetId('https://swapi.dev/api/planets/5')).toBe(5)
    })

    it('should return 0 for invalid URLs', () => {
      expect(extractPlanetId('invalid-url')).toBe(0)
      expect(extractPlanetId('https://swapi.dev/api/people/1/')).toBe(0)
    })
  })

  describe('parseNumberOrZero', () => {
    it('should parse valid numbers', () => {
      expect(parseNumberOrZero('1000')).toBe(1000)
      expect(parseNumberOrZero('1,000,000')).toBe(1000000)
      expect(parseNumberOrZero('3.14')).toBe(3.14)
    })

    it('should return 0 for "unknown" values', () => {
      expect(parseNumberOrZero('unknown')).toBe(0)
      expect(parseNumberOrZero('Unknown')).toBe(0)
      expect(parseNumberOrZero('UNKNOWN')).toBe(0)
      expect(parseNumberOrZero('n/a')).toBe(0)
    })

    it('should handle empty or invalid strings', () => {
      expect(parseNumberOrZero('')).toBe(0)
      expect(parseNumberOrZero('abc')).toBe(0)
    })
  })

  describe('transformPlanet', () => {
    const mockSwapiPlanet: SwapiPlanet = {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      residents: [],
      films: [],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.411000Z',
      url: 'https://swapi.dev/api/planets/1/'
    }

    it('should transform SWAPI planet to Planet object', () => {
      const planet = transformPlanet(mockSwapiPlanet)

      expect(planet.name).toBe('Tatooine')
      expect(planet.id).toBe(1)
      expect(planet.population).toBe(200000)
      expect(planet.orbitalPeriod).toBe(304)
      expect(planet.diameter).toBe(10465)
      expect(planet.climate).toBe('arid')
      expect(planet.gravity).toBe('1 standard')
      expect(planet.terrain).toBe('desert')
    })

    it('should calculate distance from sun', () => {
      const planet = transformPlanet(mockSwapiPlanet)
      expect(planet.distanceFromSun).toBeGreaterThan(0)
      expect(planet.distanceFromSun).toBeCloseTo(45.21, 1)
    })

    it('should handle unknown values', () => {
      const unknownPlanet: SwapiPlanet = {
        ...mockSwapiPlanet,
        population: 'unknown',
        diameter: 'unknown',
        orbital_period: 'unknown'
      }

      const planet = transformPlanet(unknownPlanet)
      expect(planet.population).toBe(0)
      expect(planet.diameter).toBe(0)
      expect(planet.distanceFromSun).toBe(0)
    })
  })

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000')
      expect(formatNumber(1000000)).toBe('1,000,000')
      expect(formatNumber(200000)).toBe('200,000')
    })

    it('should return "Unknown" for zero', () => {
      expect(formatNumber(0)).toBe('Unknown')
    })
  })

  describe('formatDistance', () => {
    it('should format distance to 2 decimal places', () => {
      expect(formatDistance(42.7)).toBe('42.70')
      expect(formatDistance(100.123)).toBe('100.12')
      expect(formatDistance(5)).toBe('5.00')
    })

    it('should return "Unknown" for zero', () => {
      expect(formatDistance(0)).toBe('Unknown')
    })
  })
})
