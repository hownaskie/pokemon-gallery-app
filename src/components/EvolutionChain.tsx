import React from "react"
import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

interface EvolutionChainProps {
  chain: any
}

export const EvolutionChain: React.FC<EvolutionChainProps> = ({ chain }) => {
  const renderEvolution = (evolution: any, level = 0) => {
    const pokemonId = evolution.species.url.split("/").slice(-2, -1)[0]

    return (
      <div key={evolution.species.name} className="flex items-center">
        <Link
          to="/pokemon/$id"
          params={{ id: evolution.species.name }}
          className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
            alt={evolution.species.name}
            className="w-20 h-20 object-contain mb-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=80&width=80"
            }}
          />
          <span className="text-sm font-medium capitalize">{evolution.species.name}</span>
          {evolution.evolution_details[0] && (
            <span className="text-xs text-gray-500 mt-1">
              {evolution.evolution_details[0].min_level && `Lv. ${evolution.evolution_details[0].min_level}`}
              {evolution.evolution_details[0].item && evolution.evolution_details[0].item.name}
            </span>
          )}
        </Link>

        {evolution.evolves_to.length > 0 && (
          <>
            <ArrowRight className="mx-4 text-gray-400" size={24} />
            <div className="flex space-x-4">
              {evolution.evolves_to.map((nextEvolution: any) => renderEvolution(nextEvolution, level + 1))}
            </div>
          </>
        )}
      </div>
    )
  }

  return <div className="flex items-center justify-center overflow-x-auto pb-4">{renderEvolution(chain)}</div>
}
