import { DataTable } from './components/DataTable'
import ChartLine from "@/pages/Admin/components/ChartLine"
import MultipleChart from "@/pages/Admin/components/MultipleChart"
import RadialChart from "@/pages/Admin/components/RadialChart"
import DatePicker from "@/components/ui/datePicker";
import { useState } from "react"
import { useGetAdminDashboardStatsQuery } from '@/api/apiSlice';
import { format, startOfYear } from 'date-fns';
import moment from 'moment';

export const columns = [
  {
    accessorKey: "code",
    header: "Tracking Number",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "delivery_type",
    header: "Services",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("delivery_type")}</div>,
  },
  {
    accessorKey: "product_name",
    header: "Product",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("product_name")}</div>,
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("weight")}</div>,
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }: any) => (
      <div className="capitalize">
        {moment(row.getValue("created_at")).format("YYYY-MM-DD")}
      </div>
    ),
  },
  {
    accessorKey: "delivery_status",
    header: "Status",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("delivery_status")}</div>,
  },
];

const DashboardPage = () => {
  const [startDate, setStartDate] = useState<string | null>(format(startOfYear(new Date()), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string | null>(format(new Date(), 'yyyy-MM-dd'));

  const { data: dashboardData, isLoading } = useGetAdminDashboardStatsQuery({
    start_date: startDate || undefined,
    end_date: endDate || undefined,
  });

  const getMonthName = (monthNumber: number) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber - 1] || "";
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start ? format(start, 'yyyy-MM-dd') : null);
    setEndDate(end ? format(end, 'yyyy-MM-dd') : null);
  };

  // Prepare chart data
  const totalUsersData = dashboardData?.data?.monthly_trends?.total_users?.map((item: any) => ({
    month: getMonthName(item.month),
    desktop: item.count,
    mobile: 0, // Placeholder if needed
  })) || [];

  const totalDeliveriesData = dashboardData?.data?.monthly_trends?.total_deliveries?.map((item: any) => ({
    month: getMonthName(item.month),
    desktop: item.count,
    mobile: 0, // Placeholder if needed
  })) || [];

  const successfulDeliveriesData = dashboardData?.data?.monthly_trends?.successful_deliveries?.map((item: any) => ({
    month: getMonthName(item.month),
    desktop: item.count,
    mobile: 0, // Placeholder if needed
  })) || [];

  // Prepare latest orders data for table
  const latestOrders = dashboardData?.data?.latest_orders?.map((order: any) => ({
    ...order,
    created_at: moment(order.created_at).format("YYYY-MM-DD")
  })) || [];

  return (
    <div className="p-6">
      <div className='flex justify-between border-b border-gray-400 mb-12 pb-4'>
        <div className='font-bold text-lg'>
          Dashboard
        </div>
        <div>
          <DatePicker
            date={startDate ? new Date(startDate) : null}
            setDate={(date) => handleDateChange(date, endDate ? new Date(endDate) : null)}
          />
          <DatePicker
            date={endDate ? new Date(endDate) : null}
            setDate={(date) => handleDateChange(startDate ? new Date(startDate) : null, date)}
          />
        </div>
      </div>

      <div className='flex gap-x-6'>
        <div>
          <ChartLine
            color="#FF8901"
            data={totalUsersData}
            name="Total Users"
            value={dashboardData?.data?.delivery_status_counts?.new_deliveries || 0}
          />
        </div>
        <div>
          <ChartLine
            color="#FF392B"
            data={successfulDeliveriesData}
            name="Successful Deliveries"
            value={dashboardData?.data?.delivery_status_counts?.delivered || 0}
          />
        </div>
        <div>
          <ChartLine
            color="#27BF51"
            data={totalDeliveriesData}
            name="Total Deliveries"
            value={dashboardData?.data?.delivery_status_counts?.active_deliveries || 0}
          />
        </div>
      </div>

      <div className='grid grid-cols-6 gap-x-4 my-10'>
        <div className='col-span-4'>
          <MultipleChart
            usersData={totalUsersData}
            deliveriesData={totalDeliveriesData}
            successfulData={successfulDeliveriesData}
          />
        </div>
        <div className='col-span-2'>
          <RadialChart
            sameDayDelivery={dashboardData?.data?.service_stats?.same_day || 0}
            nextDayDelivery={dashboardData?.data?.service_stats?.next_day || 0}
            scheduledDelivery={dashboardData?.data?.service_stats?.scheduled || 0}
            expressDelivery={dashboardData?.data?.service_stats?.express || 0}
          />
        </div>
      </div>

      <div className='bg-white p-8'>
        <h1 className="text-xl font-bold mb-4">Latest Orders</h1>
        <DataTable
          data={latestOrders}
          columns={columns}
        />
      </div>
    </div>
  )
}

export default DashboardPage