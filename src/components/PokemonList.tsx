import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { fetchPokemonList } from '../services/pokemonApi'
import { PokemonCard } from './PokemonCard'
import { Pagination } from './Pagination'
import { Spinner } from './Spinner'

export const PokemonList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 20

  const {
    data: pokemonList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['pokemonList', currentPage],
    queryFn: () =>
      fetchPokemonList((currentPage - 1) * itemsPerPage, itemsPerPage),
  })

  const filteredPokemon =
    pokemonList?.results.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Error loading Pokemon data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 mb-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Pokémon Collection
        </h1>
        <p className="text-gray-600 mb-6">
          Discover and explore the world of Pokémon
        </p>

        <div className="relative max-w-md mx-auto">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon: any, index: number) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            index={(currentPage - 1) * itemsPerPage + index + 1}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={pokemonList?.count}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
