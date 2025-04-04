import { DataTable } from './components/DataTable'
import { useState } from "react"
import { useGetDeliveriesQuery } from '@/api/apiSlice';
import moment from 'moment';
import { DeliveryStatus, DeliveryType } from '@/utilities/constants';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

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
      const formattedType = type.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
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
        case DeliveryStatus.DISPATCHED:
          statusClass = "bg-yellow-100 text-yellow-800";
          break;
        case DeliveryStatus.DELIVERED:
          statusClass = "bg-green-100 text-green-800";
          break;
        case DeliveryStatus.IN_TRANSIT:
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

  const { data: deliveriesData } = useGetDeliveriesQuery({
    type: deliveryType,
    page: currentPage
  });

  const deliveryTypes = [
    { value: "", label: "All Types" },
    { value: DeliveryType.SAME_DAY, label: "Same Day" },
    { value: DeliveryType.NEXT_DAY, label: "Next Day" },
    { value: DeliveryType.SCHEDULED, label: "Scheduled" },
    { value: DeliveryType.EXPRESS, label: "Express" },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const selectedTypeLabel = deliveryTypes.find(type => type.value === deliveryType)?.label || "Filter by type";

  return (
    <div className="p-6">
      <div className='flex justify-between border-b border-gray-400 mb-6 pb-4'>
        <div className='font-bold text-lg'>
          Delivery Services
        </div>

        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start">
                {selectedTypeLabel}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
              {deliveryTypes.map((type) => (
                <DropdownMenuItem
                  key={type.value}
                  onClick={() => setDeliveryType(type.value)}
                  className={deliveryType === type.value ? "bg-accent" : ""}
                >
                  {type.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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