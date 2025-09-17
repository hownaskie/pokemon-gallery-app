import axios from "axios"

const BASE_URL = window.__RUNTIME_CONFIG__.POKEMON_API_URL;

export const fetchPokemonList = async (offset: number, limit: number) => {
  const response = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`)
  return response.data
}

export const fetchPokemonDetails = async (nameOrId: string) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`)
  return response.data
}

export const fetchPokemonSpecies = async (nameOrId: string) => {
  const response = await axios.get(`${BASE_URL}/pokemon-species/${nameOrId}`)
  return response.data
}

export const fetchEvolutionChain = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}
