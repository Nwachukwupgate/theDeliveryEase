import { DataTable } from './components/DataTable'
import ChartLine from "@/pages/Admin/components/ChartLine"
import MultipleChart from "@/pages/Admin/components/MultipleChart"
import RadialChart from "@/pages/Admin/components/RadialChart"
import DatePicker from "@/components/ui/datePicker";
import { useState, useMemo } from "react"
import { useGetAdminDashboardStatsQuery, useGetHistoryQuery } from '@/api/apiSlice';
import { format, startOfYear } from 'date-fns';
import moment from 'moment';
import {DeliveryItem} from '@/types/types';
import LoadingSpinner from '@/components/LoadingSpinner';


export type Payment = {
  id: string;
  tracker: string;
  services: string;
  product: string;
  weight: string;
  date: string;
  status: "Pending" | "Completed" | "Ongoing";
};

const data: Payment[] = [
  {
    id: "m5gr84i9",
    tracker: "AZ34KLO900",
    services: "Same Day Delivery",
    product: "success",
    weight: "3kg",
    date: "Feb 13th 2025",
    status: "Completed",
  },
  {
    id: "3u1reuv4",
    tracker: "AZ34KLO900",
    services: "Next Day Delivery",
    product: "success",
    weight: "3kg",
    date: "Feb 13th 2025",
    status: "Ongoing",
  },
  {
    id: "derv1ws0",
    tracker: "AZ34KLO900",
    services: "Scheduled Delivery",
    product: "success",
    weight: "3kg",
    date: "Feb 13th 2025",
    status: "Ongoing",
  },
  {
    id: "5kma53ae",
    tracker: "AZ34KLO900",
    services: "Express Delivery",
    product: "success",
    weight: "3kg",
    date: "Feb 13th 2025",
    status: "Pending",
  },
  {
    id: "bhqecj4p",
    tracker: "AZ34KLO900",
    services: "Same Day Delivery",
    product: "success",
    weight: "3kg",
    date: "Feb 13th 2025",
    status: "Ongoing",
  },
];

export const columns = [
  {
    accessorKey: "tracker",
    header: "Tracking Number",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("tracker")}</div>,
  },
  {
    accessorKey: "services",
    header: "Services",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("services")}</div>,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("product")}</div>,
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("weight")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("status")}</div>,
  },
];

interface UserData {
  month: number; // Month as a number (1-12)
  user_count: number; 
}

interface DeliveryData {
  month: number; 
  successful_count?: number; 
  delivery_count?: number; 
}

const DashboardPage = () => {  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: historyData, isLoading } = useGetHistoryQuery({ page: currentPage });
  const [startDate, setStartDate] = useState<string | null>(format(startOfYear(new Date()), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string | null>(format(new Date(), 'yyyy-MM-dd'));

  const{ data: Dashboard, isLoading: statLoading } = useGetAdminDashboardStatsQuery({
    start_date: startDate || undefined,
    end_date: endDate || undefined,
  })
  console.log("the dashboard", Dashboard)
  // const desktopData1 = [
  //   { month: "January", desktop: 305, mobile: 200 },
  //   { month: "February", desktop: 85, mobile: 80 },
  //   { month: "March", desktop: 237, mobile: 120 },
  // ];
  
  // const desktopData2 = [
  //   { month: "January", desktop: 100, mobile: 300 },
  //   { month: "February", desktop: 250, mobile: 150 },
  //   { month: "March", desktop: 120, mobile: 250 },
  // ];
  
  // const desktopData3 = [
  //   { month: "January", desktop: 400, mobile: 180 },
  //   { month: "February", desktop: 330, mobile: 170 },
  //   { month: "March", desktop: 290, mobile: 210 },
  // ];

  const getMonthName = (monthNumber : any) => {
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

  const totalUsersData = Dashboard?.lineCharts?.totalUsers.map((user: UserData) => ({
    month: getMonthName(user.month), 
    desktop: user.user_count,
    mobile: 120, 
  })) || [];

  const successfulDeliveriesData = Dashboard?.lineCharts?.successfulDeliveries.map((delivery: DeliveryData) => ({
    month: getMonthName(delivery.month), 
    desktop: delivery.successful_count,
    mobile: 250,
  })) || [];

  const totalDeliveriesData = Dashboard?.lineCharts?.totalDeliveries.map((delivery: DeliveryData) => ({
    month: getMonthName(delivery.month),
    desktop: delivery.delivery_count,
    mobile: 210,
  })) || [];

  const radialData = useMemo(() => {
    if (!Dashboard || isLoading) {
      return [];
    }

    const { pieChart } = Dashboard;
    const { pendingDeliveries, completedDeliveries } = pieChart;

    const pendingPercentage = (pendingDeliveries / (pendingDeliveries + completedDeliveries)) * 100;
    const completedPercentage = (completedDeliveries / (pendingDeliveries + completedDeliveries)) * 100;

    return [
      { name: "Pending Deliveries", value: pendingPercentage, fill: "#9165B0" },
      { name: "Completed Deliveries", value: completedPercentage, fill: "#3F2C4D" },
    ];
  }, [data, isLoading]);

  console.log("radialData", radialData);
  

  const { sameDayDelivery, nextDayDelivery, scheduledDelivery, expressDelivery } = Dashboard?.serviceStats || {};

  const mergedData = useMemo(() => {
    return historyData?.data?.deliveries?.data?.map((item: DeliveryItem) => {
      return {
        id: item.code || "N/A",
        tracker: item.code || "N/A",
        services: item.delivery_type || "N/A",
        product: item.product_name || "N/A",
        weight: item.weight || "N/A",
        date: item.created_at ? moment(item.created_at).format("YYYY-MM-DD") : "N/A",
        status: item.delivery_status || "N/A",
      };
    }) || [];
  }, [historyData]);

  if (isLoading || statLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">

      <div className='flex justify-between border-b border-gray-400 mb-12 pb-4'>
        <div className='font-bold text-lg'>
          Dashboard
        </div>

        <div>
          <DatePicker
            date={startDate ? new Date(startDate) : null}   // Convert string to Date object
            setDate={(date) => handleDateChange(date, endDate ? new Date(endDate) : null)}
          />
          
          {/* Date Picker for selecting endDate */}
          <DatePicker
            date={endDate ? new Date(endDate) : null}      // Convert string to Date object
            setDate={(date) => handleDateChange(startDate ? new Date(startDate) : null, date)}
          />
        </div>
      </div>

      <div className='flex gap-x-6'>
        <div>
          <ChartLine color="#FF8901" data={totalUsersData} name="Total Users" dashboard={Dashboard?.total_users} />
        </div>
        <div>
          <ChartLine color="#FF392B" data={successfulDeliveriesData} name="Successful Deliveries" dashboard={Dashboard?.successful_orders} />
        </div>
        <div>
          <ChartLine color="#27BF51" data={totalDeliveriesData} name="Total Deliveries" dashboard={Dashboard?.total_orders} />
        </div>
      </div>

      <div className='grid grid-cols-6 gap-x-4 my-10'>
        <div className='col-span-4'>
          <MultipleChart  />
        </div>

        <div className='col-span-2'>
          <RadialChart data={radialData} 
          sameDayDelivery={sameDayDelivery}
          nextDayDelivery={nextDayDelivery}
          scheduledDelivery={scheduledDelivery}
          expressDelivery={expressDelivery} />
        </div>
      </div>
      
      <div className='bg-white p-8'>
        <h1 className="text-xl font-bold mb-4">Latest Orders</h1>      
          <DataTable data={mergedData} columns={columns} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={historyData?.data?.deliveries.last_page || 1} />
      </div>
    </div>
  )
}

export default DashboardPage
