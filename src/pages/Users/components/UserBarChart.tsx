import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
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

interface BarChartItem {
  month: string;
  avg_cost: number;
  delivery_count: number;
}

interface UserChartProps {
  data: BarChartItem[];
}

const chartConfig: ChartConfig = {
  avg_cost: {
    label: "Avg Cost",
    color: "#513963",
  },
  delivery_count: {
    label: "Delivery Count",
    color: "#9165B0",
  },
}

export default function UserBarChart({ data }: UserChartProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Deliveries Over Time</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-57px)]">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            No data available
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#6b7280' }}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />} 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="avg_cost"
                    name="Avg Cost"
                    fill={chartConfig.avg_cost.color}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="delivery_count"
                    name="Delivery Count"
                    fill={chartConfig.delivery_count.color}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}