import DeliveringCard from "./components/DeliveringCard";
import {
  useGetDeliveriesQuery,
  useRiderAssignedDeliveriesQuery,
} from "@/api/apiSlice";
import { CircularProgress, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import routes from '@/navigation/routes';
import { DeliveryStatus } from "@/utilities/constants";

const DeliveriesPage = () => {
  const location = useLocation();
  const isAvailableDeliveries = location.pathname === routes.RidersRoute.AVAILABLE_DELIVERIES;

  const [page, setPage] = useState(1);

  // Choose the right query based on route
  const {
    data: deliveries,
    isLoading,
    isFetching,
  } = isAvailableDeliveries
      ? useGetDeliveriesQuery({ page, status: DeliveryStatus.PENDING })
      : useRiderAssignedDeliveriesQuery({ page });

  const handleNextPage = () => setPage(prev => prev + 1);
  const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-3 lg:p-6">
      <div className="flex justify-between border-b border-gray-400 mb-12 pb-4">
        <div className="font-bold text-lg">
          {isAvailableDeliveries ? 'New Deliveries' : 'Assigned Deliveries'}
        </div>
      </div>

      <div className="my-4 bg-white p-4 rounded-2xl">
        {isLoading || isFetching ? (
          <div className="flex justify-center">
            <CircularProgress size={24} color="inherit" />
          </div>
        ) : deliveries?.data?.items?.length ? (
          <>
            <article className=" grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {deliveries.data.items.map((delivery) => (
                <DeliveringCard
                  key={delivery.id}
                  id={`${delivery.id}`}
                  trackingId={delivery.code}
                  delivery={delivery.product_name}
                  address={delivery.pickup_address}
                  status={delivery.delivery_status}
                  date={delivery.created_at}
                  selected={!isAvailableDeliveries}
                  showAction={true}
                  isAvailableDelivery={isAvailableDeliveries}
                />
              ))}
            </article>
            {/* Pagination Controls */}
            <div className="flex justify-center gap-x-3 items-center mt-6">
              <button
                onClick={handlePrevPage}
                disabled={page === 1 || isFetching}
                className="rounded bg-[#581756] px-4 py-1 text-white disabled:opacity-50"
              >
                Prev
              </button>
              <Typography>
                Page {page} of {deliveries.data.meta?.pagination?.total_pages || 1}
              </Typography>
              <button
                onClick={handleNextPage}
                disabled={!deliveries.data.meta?.pagination.links.next}
                className="rounded bg-[#581756] px-4 py-1 text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <Typography className="text-center py-4">
            {isAvailableDeliveries
              ? 'No available deliveries found'
              : 'No active deliveries found'}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default DeliveriesPage;