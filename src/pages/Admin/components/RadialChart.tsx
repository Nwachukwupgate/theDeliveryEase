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

export const description = "A radial chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#9165B0",
  },
  safari: {
    label: "Safari",
    color: "#3F2C4D",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function RadialChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex justify-between content-center items-center w-full flex-row pb-0">
        <CardTitle>Services</CardTitle>
        <CardDescription><ArrowIcon /> </CardDescription> 
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <RadialBarChart data={chartData} innerRadius={60} outerRadius={80}>
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
            <div className="flex flex-row gap-x-2 p-3 border-r border-b border-dashed border-black">
                <div className="bg-[#F4E9F4CC] content-center px-2 rounded-full"> <SameDay /> </div>
                <div className="">
                    <div>Same Day Delivery</div>
                    <div className="font-bold text-base">400</div>
                </div>
            </div>

            <div className="flex flex-row gap-x-2 p-3 border-b border-dashed border-black">
                <div className="bg-[#F4E9F4CC] content-center px-2 rounded-full"> <ExpressIcon /> </div>
                <div className="">
                    <div>Same Day Delivery</div>
                    <div className="font-bold text-base">400</div>
                </div>
            </div>

            <div className="flex flex-row gap-x-2 p-3 border-r border-dashed border-black">
                <div className="bg-[#F4E9F4CC] content-center px-2 rounded-full"> <ScheduledIcon /> </div>
                <div className="">
                    <div>Same Day Delivery</div>
                    <div className="font-bold text-base">400</div>
                </div>
            </div>


            <div className="flex flex-row gap-x-2 p-3">
                <div className="bg-[#F4E9F4CC] content-center px-2 rounded-full"> <NextDay /> </div>
                <div className="">
                    <div>Same Day Delivery</div>
                    <div className="font-bold text-base">400</div>
                </div>
            </div>
        </div>
      </CardFooter>
    </Card>
  )
}
