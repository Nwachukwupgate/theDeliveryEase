import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

interface ChartLineProps {
  color: string;
  data: { month: string; desktop: number }[];
  name: string;
  value: number;
}

export default function ChartLine({ color, data, name, value }: ChartLineProps) {
  const chartConfig = {
    desktop: {
      label: "Count",
      color: color,
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="text-2xl font-bold" style={{ color }}>{value}</div>
        <div className="mt-auto h-[80px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <Line
                  dataKey="desktop"
                  type="monotone"
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}