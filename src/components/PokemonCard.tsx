import React from "react"
import { Link } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { fetchPokemonDetails } from "../services/pokemonApi"

interface PokemonCardProps {
  pokemon: {
    name: string
    url: string
  }
  index: number
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, index }) => {
  const { data: pokemonDetails } = useQuery({
    queryKey: ["pokemon", pokemon.name],
    queryFn: () => fetchPokemonDetails(pokemon.name),
  })

  const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-300",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-green-400",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
  }

  return (
    <Link
      to="/pokemon/$id"
      params={{ id: pokemon.name }}
      className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
    >
      <div className="p-6">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            {pokemonDetails ? (
              <img
                src={pokemonDetails.sprites.front_default}
                alt={pokemon.name}
                className="w-20 h-20 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=96&width=96"
                }}
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
            )}
          </div>

          <h3 className="text-lg font-bold text-gray-800 capitalize mb-2">{pokemon.name}</h3>

          <p className="text-sm text-gray-500 mb-3">#{index.toString().padStart(3, "0")}</p>

          {pokemonDetails && (
            <div className="flex justify-center space-x-2">
              {pokemonDetails.types.map((type: any) => (
                <span
                  key={type.type.name}
                  className={`px-2 py-1 text-xs font-medium text-white rounded-full bug ${
                    typeColors[type.type.name] || "bg-gray-400"
                  }`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
