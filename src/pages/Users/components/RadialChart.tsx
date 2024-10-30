import { RadialBar, RadialBarChart } from "recharts"
import SameDay from "../../../common/icons/SameDay"
import ExpressIcon from "../../../common/icons/ExpressIcon"
import ScheduledIcon from "../../../common/icons/ScheduledIcon"
import NextDay from "../../../common/icons/NextDay"
import ArrowIcon from "../../../common/icons/ArrowIcon"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface RadialChartData {
  name: string;
  value: number;
  fill: string;
}

interface RadialChartProps {
  data: RadialChartData[];
  sameDayDelivery?: number;
  nextDayDelivery?: number;
  scheduledDelivery?: number;
  expressDelivery?: number;
}

export const description = "A radial chart"

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
// //   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
// //   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
// //   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]

const chartConfig = {
  Pending: {
    label: "Pending",
    color: "#9165B0"
  },
  Completed: {
    label: "Completed",
    color: "#3F2C4D",
  },
} satisfies ChartConfig;

export default function RadialChart({ data, sameDayDelivery, nextDayDelivery, scheduledDelivery, expressDelivery }: RadialChartProps) {

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="flex justify-between content-center items-center w-full flex-row pb-0">
        <CardTitle>Services</CardTitle>
        <CardDescription><ArrowIcon /> </CardDescription> 
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <RadialBarChart data={data} innerRadius={60} outerRadius={80} startAngle={180} endAngle={0}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="grid grid-cols-2">
        <div className="flex flex-row items-center gap-x-2 p-3 border-r border-b border-dashed border-black">
            <div className="bg-[#F4E9F4CC] content-center justify-items-center px-2 rounded-full h-10 w-10"><SameDay /></div>
            <div>
              <div>Same Day Delivery</div>
              <div className="font-bold text-base">{sameDayDelivery || 0}</div>
            </div>
          </div>

          <div className="flex flex-row items-center gap-x-2 p-3 border-b border-dashed border-black">
            <div className="bg-[#F4E9F4CC] content-center justify-center justify-items-center h-10 w-10 rounded-full"><ExpressIcon /></div>
            <div>
              <div>Express Delivery</div>
              <div className="font-bold text-base">{expressDelivery || 0}</div>
            </div>
          </div>

          <div className="flex flex-row items-center gap-x-2 p-3 border-r border-dashed border-black">
            <div className="bg-[#F4E9F4CC] content-center justify-items-center px-2 rounded-full h-10 w-10"><ScheduledIcon /></div>
            <div>
              <div>Scheduled Delivery</div>
              <div className="font-bold text-base">{scheduledDelivery || 0}</div>
            </div>
          </div>

          <div className="flex flex-row items-center gap-x-2 p-3">
            <div className="bg-[#F4E9F4CC] content-center justify-items-center px-2 rounded-full h-10 w-10"><NextDay /></div>
            <div>
              <div>Next Day Delivery</div>
              <div className="font-bold text-base">{nextDayDelivery || 0}</div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
