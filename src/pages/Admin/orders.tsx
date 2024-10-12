import { DataTable } from './components/DataTable'
import ChartLine from "@/pages/Admin/components/ChartLine"
import DatePicker from "@/components/ui/datePicker";
import { useState } from "react"


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

const DashboardPage = () => {  

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

  const [date, setDate] = useState<Date | null>(null);


  return (
    <div className="p-6">

      <div className='flex justify-between border-b border-gray-400 mb-12 pb-4'>
        <div className='font-bold text-lg'>
          Orders
        </div>

        <div>
          <DatePicker date={date} setDate={setDate} />
        </div>
      </div>

      <div className='flex gap-x-6 mb-10'>
        <div> <ChartLine color="#FF8901" data={desktopData1} /> </div>

        <div> <ChartLine color="#FF392B" data={desktopData2} /> </div>

        <div> <ChartLine color="#27BF51" data={desktopData3}  /> </div>
      </div>

      {/* <div className='grid grid-cols-6 gap-x-4 my-10'>
        <div className='col-span-4'>
          <MultipleChart />
        </div>

        <div className='col-span-2'>
          <RadialChart />
        </div>
      </div> */}
      
      <div className='bg-white p-8'>
        <h1 className="text-xl font-bold mb-4">Order History</h1>      
          <DataTable data={data} columns={columns} />
      </div>
    </div>
  )
}

export default DashboardPage
