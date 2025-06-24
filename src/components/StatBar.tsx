import type React from "react"

interface StatBarProps {
  name: string
  value: number
  maxValue: number
}

export const StatBar: React.FC<StatBarProps> = ({ name, value, maxValue }) => {
  const percentage = (value / maxValue) * 100

  const statNames: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Attack",
    "special-defense": "Sp. Defense",
    speed: "Speed",
  }

  const getBarColor = (statValue: number) => {
    if (statValue >= 100) return "bg-green-500"
    if (statValue >= 70) return "bg-yellow-500"
    if (statValue >= 40) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="w-24 text-sm font-medium text-gray-700">{statNames[name] || name}</div>
      <div className="flex-1 bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${getBarColor(value)}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="w-12 text-sm font-bold text-gray-800">{value}</div>
    </div>
  )
}
