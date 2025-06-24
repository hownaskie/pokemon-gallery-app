import { PokemonList } from '@/components/PokemonList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokemon/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <PokemonList />
    </>
  )
}
