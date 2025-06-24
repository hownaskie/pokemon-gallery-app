import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Gamepad2, MapPin } from 'lucide-react'
import {
  fetchEvolutionChain,
  fetchPokemonDetails,
  fetchPokemonSpecies,
} from '../services/pokemonApi'
import { EvolutionChain } from './EvolutionChain'
import { StatBar } from './StatBar'
import { SkeletonAvatar } from './SkeletonAvatar'

interface PokemonDetailProps {
  id: string
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ id }) => {
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonDetails(id),
  })

  const { data: species } = useQuery({
    queryKey: ['pokemonSpecies', id],
    queryFn: () => fetchPokemonSpecies(id),
    enabled: !!pokemon,
  })

  const { data: evolutionChain } = useQuery({
    queryKey: ['evolutionChain', species?.evolution_chain?.url],
    queryFn: () => fetchEvolutionChain(species!.evolution_chain.url),
    enabled: !!species?.evolution_chain?.url,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Pokemon not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto my-8">
      <Link
        to="/pokemon"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Pokédex</span>
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-8 text-white bg-gradient-to-r from-red-500 to-red-600">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold capitalize mb-2">
                {pokemon.name}
              </h1>
              <p className="text-xl opacity-90">
                #{pokemon.id.toString().padStart(3, '0')}
              </p>
            </div>
            <div className="text-right">
              <div className="flex space-x-2 mb-2">
                {pokemon.types.map((type: any) => (
                  <span
                    key={type.type.name}
                    className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium capitalize"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
              <p className="text-lg opacity-90">
                {pokemon.height / 10}m • {pokemon.weight / 10}kg
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-6">
              <div className="text-center">
                <img
                  src={
                    pokemon.sprites.other?.['official-artwork']
                      ?.front_default || pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                  className="w-64 h-64 mx-auto object-contain"
                />
              </div>

              {/* Animated Sprites */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Sprites</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    {pokemon.sprites.front_default ? (
                      <img
                        src={pokemon.sprites.front_default}
                        alt="Front"
                        className="w-20 h-20 mx-auto"
                      />
                    ) : (
                      <SkeletonAvatar />
                    )}

                    <p className="text-sm text-gray-600">Front</p>
                  </div>
                  <div className="text-center">
                    {pokemon.sprites.back_default ? (
                      <img
                        src={pokemon.sprites.back_default}
                        alt="Back"
                        className="w-20 h-20 mx-auto"
                      />
                    ) : (
                      <SkeletonAvatar />
                    )}

                    <p className="text-sm text-gray-600">Back</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Animated Sprites</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    {pokemon.sprites.versions['generation-v']['black-white']
                      .animated.front_default ? (
                      <img
                        src={
                          pokemon.sprites.versions['generation-v'][
                            'black-white'
                          ].animated.front_default
                        }
                        alt="Front"
                        className="w-20 h-20 mx-auto"
                      />
                    ) : (
                      <SkeletonAvatar />
                    )}

                    <p className="text-sm text-gray-600">Front</p>
                  </div>
                  <div className="text-center">
                    {pokemon.sprites.versions['generation-v']['black-white']
                      .animated.back_default ? (
                      <img
                        src={
                          pokemon.sprites.versions['generation-v'][
                            'black-white'
                          ].animated.back_default
                        }
                        alt="Back"
                        className="w-20 h-20 mx-auto"
                      />
                    ) : (
                      <SkeletonAvatar />
                    )}

                    <p className="text-sm text-gray-600">Back</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Abilities */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Abilities</h3>
                <div className="space-y-2">
                  {pokemon.abilities.map((ability: any) => (
                    <div
                      key={ability.ability.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="capitalize font-medium">
                        {ability.ability.name.replace('-', ' ')}
                      </span>
                      {ability.is_hidden && (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          Hidden
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Base Stats</h3>
                <div className="space-y-3">
                  {pokemon.stats.map((stat: any) => (
                    <StatBar
                      key={stat.stat.name}
                      name={stat.stat.name}
                      value={stat.base_stat}
                      maxValue={255}
                    />
                  ))}
                </div>
              </div>

              {/* Game Versions */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Gamepad2 className="mr-2" size={20} />
                  Game Versions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.game_indices.slice(0, 8).map((game: any) => (
                    <span
                      key={game.version.name}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize"
                    >
                      {game.version.name.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Evolution Chain */}
          {evolutionChain && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-2xl font-semibold mb-6">Evolution Chain</h3>
              <EvolutionChain chain={evolutionChain.chain} />
            </div>
          )}

          {/* Location */}
          {species && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <MapPin className="mr-2" size={20} />
                Habitat
              </h3>
              <p className="text-gray-600 capitalize">
                {species.habitat?.name?.replace('-', ' ') || 'Unknown'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
