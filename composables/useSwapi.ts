import type { SwapiPaginatedResponse, SwapiPlanet, Planet } from '~/types/planet'
import { transformPlanet } from '~/utils/planetUtils'

const SWAPI_BASE_URL = 'https://swapi.dev/api'

export const useSwapi = () => {
  /**
   * Fetch planets with optional search parameter
   */
  const fetchPlanets = async (
    page: number = 1,
    searchName?: string
  ): Promise<SwapiPaginatedResponse<Planet>> => {
    try {
      let url = `${SWAPI_BASE_URL}/planets/?page=${page}`

      if (searchName && searchName.trim()) {
        url += `&search=${encodeURIComponent(searchName.trim())}`
      }

      const response = await $fetch<SwapiPaginatedResponse<SwapiPlanet>>(url)

      return {
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformPlanet)
      }
    } catch (error) {
      console.error('Error fetching planets:', error)
      throw error
    }
  }

  /**
   * Fetch a single planet by ID
   */
  const fetchPlanet = async (id: number): Promise<Planet> => {
    try {
      const response = await $fetch<SwapiPlanet>(`${SWAPI_BASE_URL}/planets/${id}/`)
      return transformPlanet(response)
    } catch (error) {
      console.error(`Error fetching planet ${id}:`, error)
      throw error
    }
  }

  /**
   * Fetch planet by URL (for pagination)
   */
  const fetchPlanetsByUrl = async (url: string): Promise<SwapiPaginatedResponse<Planet>> => {
    try {
      const response = await $fetch<SwapiPaginatedResponse<SwapiPlanet>>(url)

      return {
        count: response.count,
        next: response.next,
        previous: response.previous,
        results: response.results.map(transformPlanet)
      }
    } catch (error) {
      console.error('Error fetching planets by URL:', error)
      throw error
    }
  }

  return {
    fetchPlanets,
    fetchPlanet,
    fetchPlanetsByUrl
  }
}
