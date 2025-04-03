import { DataTable } from './components/DataTable'
import { useState } from "react"
import { useGetDeliveriesQuery } from '@/api/apiSlice';
import moment from 'moment';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Delivery {
  id: number;
  code: string;
  delivery_type: "same_day" | "next_day" | "scheduled" | "express";
  product_name: string;
  weight: string;
  delivery_status: string;
  created_at: string;
}

export const columns = [
  {
    accessorKey: "code",
    header: "Tracking Number",
    cell: ({ row }: any) => <div className="capitalize">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "delivery_type",
    header: "Service Type",
    cell: ({ row }: any) => {
      const type = row.getValue("delivery_type");
      const formattedType = type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
      return <div>{formattedType}</div>;
    },
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
      <div>{moment(row.getValue("created_at")).format("MMM Do YYYY")}</div>
    ),
  },
  {
    accessorKey: "delivery_status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("delivery_status");
      let statusClass = "";
      switch (status) {
        case "Pending":
          statusClass = "bg-yellow-100 text-yellow-800";
          break;
        case "Completed":
          statusClass = "bg-green-100 text-green-800";
          break;
        case "Ongoing":
          statusClass = "bg-blue-100 text-blue-800";
          break;
        default:
          statusClass = "bg-gray-100 text-gray-800";
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${statusClass}`}>
          {status}
        </span>
      );
    },
  },
];

const ServicesPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deliveryType, setDeliveryType] = useState<string>("");

  const { data: deliveriesData, isLoading } = useGetDeliveriesQuery({
    type: deliveryType,
    page: currentPage
  });

  const deliveryTypes = [
    { value: "", label: "All Types" },
    { value: "same_day", label: "Same Day" },
    { value: "next_day", label: "Next Day" },
    { value: "scheduled", label: "Scheduled" },
    { value: "express", label: "Express" },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className='flex justify-between border-b border-gray-400 mb-6 pb-4'>
        <div className='font-bold text-lg'>
          Delivery Services
        </div>

        {/* <div className="flex gap-4">
          <Select onValueChange={(value) => setDeliveryType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              {deliveryTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
      </div>

      <div className='bg-white p-6 rounded-lg shadow'>
        <h1 className="text-xl font-bold mb-4">Delivery History</h1>
        <DataTable
          data={deliveriesData?.data.items || []}
          columns={columns}
          pagination={{
            currentPage,
            totalPages: deliveriesData?.data.meta.pagination.total_pages || 1,
            onPageChange: handlePageChange
          }}
        />
      </div>
    </div>
  )
}

export default ServicesPage;