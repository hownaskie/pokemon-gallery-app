import { createFileRoute, redirect } from '@tanstack/react-router'
import { Gauge, SparkLineChart } from '@mui/x-charts'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (context?.auth === null) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen gap-3">
      <div className="flex justify-center gap-2 bg-gray-100">
        <Gauge
          value={75}
          startAngle={0}
          endAngle={360}
          innerRadius="80%"
          outerRadius="100%"
          // ...
        />
        <SparkLineChart
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          height={100}
          curve="natural"
          area
        />
      </div>
      <div className="flex justify-center gap-2 bg-gray-100">
        <Gauge
          value={75}
          startAngle={0}
          endAngle={360}
          innerRadius="80%"
          outerRadius="100%"
          // ...
        />
        <SparkLineChart
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          height={100}
          curve="natural"
          area
        />
      </div>
    </div>
  )
}
