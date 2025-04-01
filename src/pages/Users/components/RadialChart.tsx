import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import SameDay from "../../../common/icons/SameDay";
import ExpressIcon from "../../../common/icons/ExpressIcon";
import ScheduledIcon from "../../../common/icons/ScheduledIcon";
import NextDay from "../../../common/icons/NextDay";
import ArrowIcon from "../../../common/icons/ArrowIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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

const chartConfig = {
  Pending: {
    label: "Pending",
    color: "#9165B0",
  },
  Completed: {
    label: "Completed",
    color: "#3F2C4D",
  },
} satisfies ChartConfig;

export default function RadialChart({
  data,
  sameDayDelivery = 0,
  nextDayDelivery = 0,
  scheduledDelivery = 0,
  expressDelivery = 0,
}: RadialChartProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Services</CardTitle>
        <CardDescription>
          <ArrowIcon />
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            No data available
          </div>
        ) : (
          <div className="h-[200px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="60%"
                  outerRadius="80%"
                  data={data}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={4}
                    background={{ fill: "#f3f4f6" }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="name" />}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-0 p-0 text-sm">
        <div className="flex items-center gap-3 border-b border-r border-dashed border-gray-200 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4E9F4CC]">
            <SameDay />
          </div>
          <div>
            <div className="text-gray-600">Same Day</div>
            <div className="text-base font-bold">{sameDayDelivery}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-b border-dashed border-gray-200 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4E9F4CC]">
            <ExpressIcon />
          </div>
          <div>
            <div className="text-gray-600">Express</div>
            <div className="text-base font-bold">{expressDelivery}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-r border-dashed border-gray-200 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4E9F4CC]">
            <ScheduledIcon />
          </div>
          <div>
            <div className="text-gray-600">Scheduled</div>
            <div className="text-base font-bold">{scheduledDelivery}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4E9F4CC]">
            <NextDay />
          </div>
          <div>
            <div className="text-gray-600">Next Day</div>
            <div className="text-base font-bold">{nextDayDelivery}</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
