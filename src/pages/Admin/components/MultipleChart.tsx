import { Line, LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface MultipleChartProps {
  usersData: { month: string; desktop: number }[];
  deliveriesData: { month: string; desktop: number }[];
  successfulData: { month: string; desktop: number }[];
}

export default function MultipleChart({ 
  usersData, 
  deliveriesData, 
  successfulData 
}: MultipleChartProps) {
  // Combine data for the chart
  const chartData = usersData.map((userItem, index) => ({
    month: userItem.month,
    users: userItem.desktop,
    deliveries: deliveriesData[index]?.desktop || 0,
    successful: successfulData[index]?.desktop || 0,
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Monthly Trends</CardTitle>
      </CardHeader>
      <div className="h-[300px] px-4 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="month" 
              tickLine={false}
              axisLine={false}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#8884d8" 
              strokeWidth={2}
              name="Total Users"
            />
            <Line 
              type="monotone" 
              dataKey="deliveries" 
              stroke="#82ca9d" 
              strokeWidth={2}
              name="Total Deliveries"
            />
            <Line 
              type="monotone" 
              dataKey="successful" 
              stroke="#ff7300" 
              strokeWidth={2}
              name="Successful Deliveries"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}