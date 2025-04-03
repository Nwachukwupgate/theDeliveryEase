import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SameDay from "../../../common/icons/SameDay"
import ExpressIcon from "../../../common/icons/ExpressIcon"
import ScheduledIcon from "../../../common/icons/ScheduledIcon"
import NextDay from "../../../common/icons/NextDay"

interface RadialChartProps {
  sameDayDelivery: number;
  nextDayDelivery: number;
  expressDelivery: number;
  scheduledDelivery: number;
}

export default function RadialChart({
  sameDayDelivery,
  nextDayDelivery,
  expressDelivery,
  scheduledDelivery,
}: RadialChartProps) {
  // Prepare data for the radial chart
  const serviceData = [
    { name: 'Same Day', value: sameDayDelivery, fill: '#8884d8' },
    { name: 'Next Day', value: nextDayDelivery, fill: '#83a6ed' },
    { name: 'Express', value: expressDelivery, fill: '#8dd1e1' },
    { name: 'Scheduled', value: scheduledDelivery, fill: '#82ca9d' },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Delivery Services</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="60%"
              outerRadius="100%"
              data={serviceData}
              startAngle={180}
              endAngle={-180}
            >
              <RadialBar
                dataKey="value"
                background
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#F4E9F4CC] p-1 rounded-full">
              <SameDay className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm">Same Day</div>
              <div className="font-bold">{sameDayDelivery}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#F4E9F4CC] p-1 rounded-full">
              <NextDay className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm">Next Day</div>
              <div className="font-bold">{nextDayDelivery}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#F4E9F4CC] p-1 rounded-full">
              <ExpressIcon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm">Express</div>
              <div className="font-bold">{expressDelivery}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#F4E9F4CC] p-1 rounded-full">
              <ScheduledIcon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm">Scheduled</div>
              <div className="font-bold">{scheduledDelivery}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}