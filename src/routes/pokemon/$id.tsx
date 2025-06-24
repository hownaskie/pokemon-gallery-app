import { createFileRoute } from "@tanstack/react-router"
import { PokemonDetail } from "../../components/PokemonDetail"

function PokemonDetailComponent() {
  const { id } = Route.useParams()
  return <PokemonDetail id={id} />
}

export const Route = createFileRoute("/pokemon/$id")({
  component: PokemonDetailComponent,
})
