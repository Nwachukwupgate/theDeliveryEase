import { useState } from "react"
import { DataTable } from './components/DataTable'
import {
  useRiderAvailableDeliveriesQuery,
} from '@/api/apiSlice';
import moment from 'moment';
import AssignRiderModal from "./components/AssignRiderModal";

const OrdersPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch available deliveries
  const { data: deliveriesData } = useRiderAvailableDeliveriesQuery({
    page: currentPage
  });

  const { meta: { pagination }, items } = deliveriesData?.data || { meta: {}, items: [] };

  const handleAssignClick = (deliveryId: string) => {
    setSelectedDeliveryId(deliveryId);
    setIsModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const columns = [
    {
      accessorKey: "code",
      header: "Tracking Number",
      cell: ({ row }: any) => <div className="font-medium">{row.getValue("code")}</div>,
    },
    {
      accessorKey: "delivery_type",
      header: "Service Type",
      cell: ({ row }: any) => <div>{row.getValue("delivery_type")}</div>,
    },
    {
      accessorKey: "product_name",
      header: "Product",
      cell: ({ row }: any) => <div>{row.getValue("product_name")}</div>,
    },
    {
      accessorKey: "receiver",
      header: "Receiver",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.original.receiver_name}</div>
          <div className="text-sm text-gray-600">{row.original.receiver_phone}</div>
        </div>
      ),
    },
    {
      accessorKey: "pickup_address",
      header: "Pickup Location",
      cell: ({ row }: any) => <div className="max-w-[200px] truncate">{row.getValue("pickup_address")}</div>,
    },
    {
      accessorKey: "created_at",
      header: "Created Date",
      cell: ({ row }: any) => (
        <div>
          {moment(row.getValue("created_at")).format("MMM D, YYYY")}
        </div>
      ),
    },
    {
      accessorKey: "delivery_status",
      header: "Status",
      cell: ({ row }: any) => (
        <span className={`px-2 py-1 rounded-full text-xs text-gray-800 bg-gray-100`}>
          {row.getValue("delivery_status")}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <button
          onClick={() => handleAssignClick(row.original.id)}
          className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition-colors"
        >
          Assign Rider
        </button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className='flex justify-between border-b border-gray-200 mb-6 pb-4'>
        <h1 className='font-bold text-lg text-gray-800'>
          Available Deliveries
        </h1>
        <div className="text-sm text-gray-500">
          {pagination?.total ? `${pagination.total} deliveries found` : 'No deliveries'}
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg border border-gray-200'>
        <DataTable
          columns={columns}
          data={items || []}
          pagination={{
            currentPage,
            totalPages: (pagination?.total_pages ?? 1),
            onPageChange: handlePageChange
          }}
        />
      </div>

      {/* Rider Assignment Modal */}
      <AssignRiderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        deliveryId={selectedDeliveryId} />
    </div>
  )
}

export default OrdersPage;