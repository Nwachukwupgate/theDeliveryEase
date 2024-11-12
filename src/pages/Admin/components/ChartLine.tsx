import { Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

export const description = "A line chart with a label"



interface ChartLineProps {
  color: string;
  data: { month: string; desktop: number; mobile: number }[];
  name: string;
  dashboard: string;
}

export default function ChartLine({ color, data, name, dashboard }: ChartLineProps) {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: color || "#FF8901",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  return (
    <Card className="flex">
      <CardHeader className="flex flex-col justify-between">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{dashboard}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-between">
        <div style={{ color: color }} className="justify-self-end text-right mt-4">
        {parseFloat(dashboard.toString()) / 100}%
        </div>
        <ChartContainer config={chartConfig} className="min-h-[100px] h-[50px] w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            {/* <CartesianGrid vertical={false} horizontal={false} /> */}
            <XAxis
              // dataKey="month"
              // tickLine={false}
              // axisLine={false}
              // tickMargin={8}
              // tickFormatter={(value) => value.slice(0, 3)}
              hide={true}
            />
            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            /> */}
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              {/* <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              /> */}
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
