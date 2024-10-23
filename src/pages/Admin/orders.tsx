import { useState, useMemo } from "react"
import { DataTable } from './components/DataTable'
import ChartLine from "@/pages/Admin/components/ChartLine"
import DatePicker from "@/components/ui/datePicker";
import { useGetAdminDashboardStatsQuery, useGetHistoryQuery } from '@/api/apiSlice';
import { format, startOfYear } from 'date-fns';
import moment from 'moment';
import {DeliveryItem} from '@/types/types';
import ModalPage  from "./components/ModalPage"


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


const DashboardPage = () => {  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: historyData, isLoading } = useGetHistoryQuery({ page: currentPage });
  const [startDate, setStartDate] = useState<string | null>(format(startOfYear(new Date()), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState<string | null>(format(new Date(), 'yyyy-MM-dd'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleOpenModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedId(null); // Clear selected id when closing
  };

  const columns = [
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
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }: any) => <div className="capitalize">{row.getValue("contact")}</div>,
    },
    {
      accessorKey: "contactPhone",
      header: "Contact Phone",
      cell: ({ row }: any) => <div className="capitalize">{row.getValue("contactPhone")}</div>,
    },
    {
      accessorKey: "recieverName",
      header: "Reciever Name",
      cell: ({ row }: any) => <div className="capitalize">{row.getValue("recieverName")}</div>,
    },
    {
      accessorKey: "recieverPhone",
      header: "Reciever Phone",
      cell: ({ row }: any) => <div className="capitalize">{row.getValue("recieverPhone")}</div>,
    },
    {
      accessorKey: "rider",
      header: "Rider",
      cell: ({ row }: any) => <div className="capitalize">{row.getValue("rider")}</div>,
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
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <button
          onClick={() => handleOpenModal(row.original.id)}
          className="text-blue-500"
        >
          Assign Rider
        </button>
      ),
    },
  ];

  const{ data: Dashboard, isLoading: statLoading } = useGetAdminDashboardStatsQuery({
    start_date: startDate || undefined,
    end_date: endDate || undefined,
  })

  const desktopData1 = [
    { month: "January", desktop: 305, mobile: 200 },
    { month: "February", desktop: 85, mobile: 80 },
    { month: "March", desktop: 237, mobile: 120 },
  ];
  
  const desktopData2 = [
    { month: "January", desktop: 100, mobile: 300 },
    { month: "February", desktop: 250, mobile: 150 },
    { month: "March", desktop: 120, mobile: 250 },
  ];
  
  const desktopData3 = [
    { month: "January", desktop: 400, mobile: 180 },
    { month: "February", desktop: 330, mobile: 170 },
    { month: "March", desktop: 290, mobile: 210 },
  ];

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start ? format(start, 'yyyy-MM-dd') : null);
    setEndDate(end ? format(end, 'yyyy-MM-dd') : null);
  };

  // const radialData = useMemo(() => {
  //   if (!Dashboard || isLoading) {
  //     return [];
  //   }

  //   const { pieChart } = Dashboard;
  //   const { totalDeliveries, pendingDeliveries, completedDeliveries } = pieChart;

  //   const pendingPercentage = (pendingDeliveries / totalDeliveries) * 100;
  //   const completedPercentage = (completedDeliveries / totalDeliveries) * 100;

  //   return [
  //     { name: "Pending Deliveries", value: pendingPercentage, fill: "var(--color-chrome)" },
  //     { name: "Completed Deliveries", value: completedPercentage, fill: "var(--color-safari)" },
  //   ];
  // }, [data, isLoading]);  contact_name


  const mergedData = useMemo(() => {
    return historyData?.data?.deliveries?.data?.map((item: DeliveryItem) => {
      return {
        id: item.code || "N/A",
        tracker: item.code || "N/A",
        services: item.delivery_type || "N/A",
        product: item.product_name || "N/A",
        contact: item.contact_name || "N/A",
        contactPhone: item.contact_phone || "N/A",
        recieverName: item.receiver_name || "N/A",
        recieverPhone: item.receiver_phone || "N/A",
        rider: item.rider || "N/A",
        weight: item.weight || "N/A",
        date: item.created_at ? moment(item.created_at).format("YYYY-MM-DD") : "N/A",
        status: item.delivery_status || "N/A",
      };
    }) || [];
  }, [historyData]);

  if (isLoading || statLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="p-6">

      <div className='flex justify-between border-b border-gray-400 mb-12 pb-4'>
        <div className='font-bold text-lg'>
          Orders
        </div>

        <div>
          <DatePicker
            date={startDate ? new Date(startDate) : null}   // Convert string to Date object
            setDate={(date) => handleDateChange(date, endDate ? new Date(endDate) : null)}
          />
          
          <DatePicker
            date={endDate ? new Date(endDate) : null}      // Convert string to Date object
            setDate={(date) => handleDateChange(startDate ? new Date(startDate) : null, date)}
          />
        </div>
      </div>

      <div className='flex gap-x-6 mb-10'>
        <div> <ChartLine color="#FF8901" data={desktopData1} /> </div>

        <div> <ChartLine color="#FF392B" data={desktopData2} /> </div>

        <div> <ChartLine color="#27BF51" data={desktopData3}  /> </div>
      </div>
      
      <div className='bg-white p-8'>
        <h1 className="text-xl font-bold mb-4">Order History</h1>      
          <DataTable data={mergedData} columns={columns} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={historyData?.data?.deliveries.last_page || 1} />
      </div>

      <ModalPage isOpen={isModalOpen} onClose={handleCloseModal} deliveryId = {selectedId} />
    </div>
  )
}

export default DashboardPage
