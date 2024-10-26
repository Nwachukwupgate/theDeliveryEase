import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"

interface BarChartItem {
  month: string;
  avg_cost: number;
  delivery_count: number;
}

// Define the type for the props that the component will accept
interface UserChartProps {
  data: BarChartItem[];
}

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig: ChartConfig = {
  desktop: {
    label: "Avg Cost",
    color: "#513963",
  },
  mobile: {
    label: "Delivery Count",
    color: "#9165B0",
  },
}

export default function UserChart({ data }: UserChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deliveries Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[380px] h-[100px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="avg_cost"
              stackId="a"
              fill={chartConfig.desktop.color}
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="delivery_count"
              stackId="a"
              fill={chartConfig.mobile.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
