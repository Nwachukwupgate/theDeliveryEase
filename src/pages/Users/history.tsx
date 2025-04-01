import { useState, useMemo } from "react";
import moment from "moment";
import { format, startOfYear, subMonths, addDays } from "date-fns";
import {
  useGetDeliveryHistoryStatsQuery,
  useGetHistoryQuery,
} from "@/api/apiSlice";
import { BarChartItem, DeliveryItem } from "@/types/types";
import { DataTable } from "./components/DataTable";
import RadialChart from "./components/RadialChart";
import DatePicker from "@/components/ui/datePicker";
import UserBarChart from "@/pages/Users/components/UserBarChart";

// Types

interface DeliveryTableItem {
  id: string;
  tracker: string;
  services: string;
  product: string;
  weight: string;
  date: string;
  status: string;
}

interface RadialChartData {
  name: string;
  value: number;
  fill: string;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const columns = [
  {
    accessorKey: "tracker",
    header: "Tracking Number",
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue("tracker")}</div>
    ),
  },
  {
    accessorKey: "services",
    header: "Services",
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue("services")}</div>
    ),
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue("product")}</div>
    ),
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue("weight")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue("date")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
];

const HistoryPage = () => {
  // State management
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<string | null>(
    format(startOfYear(new Date()), "yyyy-MM-dd"),
  );
  const [endDate, setEndDate] = useState<string | null>(
    format(new Date(), "yyyy-MM-dd"),
  );

  // API Queries
  const { data: historyData } = useGetHistoryQuery({ page: currentPage });
  const { data: statsData } = useGetDeliveryHistoryStatsQuery({
    start_date: startDate || undefined,
    end_date: endDate || undefined,
  });

  // Add this transformation before passing data to UserChart
  const barChartData = useMemo(() => {
    return (
      statsData?.data?.bar_chart?.map((item: BarChartItem) => ({
        month: `${monthNames[item.month - 1]} ${item.year}`, // Convert to "Mar 2025" format
        avg_cost: item.avg_cost,
        delivery_count: item.delivery_count,
      })) || []
    );
  }, [statsData]);

  const radialData = useMemo<RadialChartData[]>(() => {
    if (!statsData?.data?.pie_chart) return [];

    const { total, pending, completed } = statsData.data.pie_chart;
    const totalDeliveries = total || 1; // Prevent division by zero

    return [
      {
        name: "Pending Deliveries",
        value: (pending / totalDeliveries) * 100,
        fill: "#9165B0",
      },
      {
        name: "Completed Deliveries",
        value: (completed / totalDeliveries) * 100,
        fill: "#3F2C4D",
      },
    ];
  }, [statsData]);

  const tableData = useMemo<DeliveryTableItem[]>(() => {
    return (
      historyData?.data?.items?.map((item: DeliveryItem) => ({
        id: item.code || "N/A",
        tracker: item.code || "N/A",
        services: item.delivery_type || "N/A",
        product: item.product_name || "N/A",
        weight: item.weight || "N/A",
        date: item.created_at
          ? moment(item.created_at).format("YYYY-MM-DD")
          : "N/A",
        status: item.delivery_status || "N/A",
      })) || []
    );
  }, [historyData]);

  // Handlers
  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start ? format(start, "yyyy-MM-dd") : null);
    setEndDate(end ? format(end, "yyyy-MM-dd") : null);
  };

  const handleTimePeriodChange = (period: string) => {
    const today = new Date();
    let startDate: Date;

    switch (period) {
      case "12 Months":
        startDate = subMonths(today, 12);
        break;
      case "30 Days":
        startDate = subMonths(today, 1);
        break;
      case "7 Days":
        startDate = addDays(today, -7);
        break;
      case "24 Hours":
        startDate = addDays(today, -1);
        break;
      default:
        startDate = subMonths(today, 12);
    }

    setStartDate(format(startDate, "yyyy-MM-dd"));
    setEndDate(format(today, "yyyy-MM-dd"));
  };

  return (
    <div className="p-3 lg:p-6">
      {/* Header */}
      <div className="mb-12 border-b border-gray-400 pb-4">
        <h1 className="text-xl font-bold">History</h1>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-y-6 lg:flex-row lg:justify-between">
        {/* Time period buttons */}
        <div className="flex flex-wrap gap-x-2">
          {["12 Months", "30 Days", "7 Days", "24 Hours"].map((period) => (
            <button
              key={period}
              className="cursor-pointer border border-gray-300 bg-white p-2 hover:bg-gray-50"
              onClick={() => handleTimePeriodChange(period)}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Date pickers */}
        <div className="flex flex-col gap-2 lg:flex-row">
          <DatePicker
            date={startDate ? new Date(startDate) : null}
            setDate={(date) =>
              handleDateChange(date, endDate ? new Date(endDate) : null)
            }
          />
          <div className="lg:ml-4">
            <DatePicker
              date={endDate ? new Date(endDate) : null}
              setDate={(date) =>
                handleDateChange(startDate ? new Date(startDate) : null, date)
              }
            />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="my-10 grid-cols-1 gap-x-4 gap-y-8 lg:grid lg:grid-cols-6">
        <div className="lg:col-span-4">
          <UserBarChart data={barChartData} />
        </div>
        <div className="mt-5 w-full lg:col-span-2 lg:mt-0">
          <RadialChart
            data={radialData}
            sameDayDelivery={statsData?.data?.service_stats?.same_day}
            nextDayDelivery={statsData?.data?.service_stats?.next_day}
            scheduledDelivery={statsData?.data?.service_stats?.scheduled}
            expressDelivery={statsData?.data?.service_stats?.express}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white p-2 lg:p-8">
        <h2 className="mb-4 text-xl font-bold">Order History</h2>
        <DataTable
          data={tableData}
          columns={columns}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={historyData?.data?.meta?.pagination?.total_pages || 1}
        />
      </div>
    </div>
  );
};

export default HistoryPage;
