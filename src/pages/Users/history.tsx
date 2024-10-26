import { DataTable } from './components/DataTable'
import UserChart from "@/pages/Users/components/UserChart"
import RadialChart from "./components/RadialChart"
import DatePicker from "@/components/ui/datePicker";
import { useState, useMemo } from "react";
import { useGetHistoryQuery, useGetDashboardStatsQuery } from '@/api/apiSlice';
import moment from 'moment';
import {DeliveryItem} from '@/types/types';
import { addDays, subMonths, format, startOfYear } from 'date-fns';
import LoadingSpinner from '@/components/LoadingSpinner';

interface BarChartItem {
  month: number;
  year: number;
  avg_cost: number;
  delivery_count: number;
  
}

export type Payment = {
  id: string;
  tracker: string;
  services: string;
  product: string;
  weight: string;
  date: string;
  status: "Pending" | "Completed" | "Ongoing";
};

// const data: Payment[] = [
//   {
//     id: "m5gr84i9",
//     tracker: "AZ34KLO900",
//     services: "Same Day Delivery",
//     product: "success",
//     weight: "3kg",
//     date: "Feb 13th 2025",
//     status: "Completed",
//   },
//   {
//     id: "3u1reuv4",
//     tracker: "AZ34KLO900",
//     services: "Next Day Delivery",
//     product: "success",
//     weight: "3kg",
//     date: "Feb 13th 2025",
//     status: "Ongoing",
//   },
//   {
//     id: "derv1ws0",
//     tracker: "AZ34KLO900",
//     services: "Scheduled Delivery",
//     product: "success",
//     weight: "3kg",
//     date: "Feb 13th 2025",
//     status: "Ongoing",
//   },
//   {
//     id: "5kma53ae",
//     tracker: "AZ34KLO900",
//     services: "Express Delivery",
//     product: "success",
//     weight: "3kg",
//     date: "Feb 13th 2025",
//     status: "Pending",
//   },
//   {
//     id: "bhqecj4p",
//     tracker: "AZ34KLO900",
//     services: "Same Day Delivery",
//     product: "success",
//     weight: "3kg",
//     date: "Feb 13th 2025",
//     status: "Ongoing",
//   },
// ];

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

const history = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { data: historyData, isLoading } = useGetHistoryQuery({ page: currentPage });
    const [startDate, setStartDate] = useState<string | null>(format(startOfYear(new Date()), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState<string | null>(format(new Date(), 'yyyy-MM-dd'));

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Trigger the query with the selected start and end dates
    const { data, isLoading: statLoading } = useGetDashboardStatsQuery({
      start_date: startDate || undefined,
      end_date: endDate || undefined,
    });

    const radialData = useMemo(() => {
      if (!data || isLoading) {
        return [];
      }
  
      const { pieChart } = data;
      const { totalDeliveries, pendingDeliveries, completedDeliveries } = pieChart;
  
      const pendingPercentage = (pendingDeliveries / totalDeliveries) * 100;
      const completedPercentage = (completedDeliveries / totalDeliveries) * 100;
  
      return [
        { name: "Pending Deliveries", value: pendingPercentage, fill: "var(--color-chrome)" },
        { name: "Completed Deliveries", value: completedPercentage, fill: "var(--color-safari)" },
      ];
    }, [data, isLoading]);

    const { sameDayDelivery, nextDayDelivery, scheduledDelivery, expressDelivery } = data?.serviceStats || {};
   
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

    const chartData = data?.barChart.map((item: BarChartItem) => ({
      month: `${monthNames[item.month - 1]} ${item.year}`, // Format month and year
      avg_cost: item.avg_cost,
      delivery_count: item.delivery_count,
    }));

    console.log("chartData", chartData);
    
  
    const handleDateChange = (start: Date | null, end: Date | null) => {
      setStartDate(start ? format(start, 'yyyy-MM-dd') : null);
      setEndDate(end ? format(end, 'yyyy-MM-dd') : null);
    };

    const calculateDateRange = (period: string) => {
      const today = new Date();
      let start: Date;
  
      switch (period) {
        case '12 Months':
          start = subMonths(today, 12);
          break;
        case '30 Days':
          start = subMonths(today, 1); // Last 30 days
          break;
        case '7 Days':
          start = addDays(today, -7);
          break;
        case '24 Hours':
          start = addDays(today, -1);
          break;
        default:
          start = subMonths(today, 12); // Default to 12 months
      }
  
      // Update state with calculated date range
      setStartDate(format(start, 'yyyy-MM-dd'));
      setEndDate(format(today, 'yyyy-MM-dd'));
    };
  

  return (
    <div className="p-6">

      <div className='border-b border-gray-400 mb-12 pb-4'>
        <div className='font-bold text-xl'>
          History
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-y-6 lg:justify-between mb-10'>
        <div className='flex gap-x-2 flex-wrap'>
          <div
            className='bg-white p-2 border border-gray-300 cursor-pointer'
            onClick={() => calculateDateRange('12 Months')}
          >
            12 Months
          </div>

            <div
              className='bg-white p-2 border border-gray-300 cursor-pointer'
              onClick={() => calculateDateRange('30 Days')}
            >
                30 Days
            </div>

            <div
              className='bg-white p-2 border border-gray-300 cursor-pointer'
              onClick={() => calculateDateRange('7 Days')}
            >
                7 Days
            </div>

            <div
              className='bg-white p-2 border border-gray-300 cursor-pointer'
              onClick={() => calculateDateRange('24 Hours')}
            >
                24 Hours
            </div>
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

      <div className='grid grid-cols-1 gap-y-8 lg:grid-cols-6 gap-x-4 my-10'>
        <div className='col-span-4'>
          <UserChart data={chartData || []}  />
        </div>

        <div className='col-span-2'>
          <RadialChart data={radialData} 
          sameDayDelivery={sameDayDelivery}
          nextDayDelivery={nextDayDelivery}
          scheduledDelivery={scheduledDelivery}
          expressDelivery={expressDelivery}/>
        </div>
      </div>
      
      <div className='bg-white p-2 lg:p-8'>
        <h1 className="text-xl font-bold mb-4">Order History</h1>      
          <DataTable data={mergedData} columns={columns} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={historyData?.data?.deliveries.last_page || 1}  />
      </div>
    </div>
  )
}

export default history