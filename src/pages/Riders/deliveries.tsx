import DeliveringCard from "./components/DeliveringCard";
import {
  useRiderActiveDeliveriesQuery,
  useRiderAvailableDeliveriesQuery
} from "@/api/apiSlice";
import { CircularProgress, Button, Typography } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import routes from '@/navigation/routes';

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
      ? useRiderAvailableDeliveriesQuery({ page })
      : useRiderActiveDeliveriesQuery({ page });

  const handleNextPage = () => setPage(prev => prev + 1);
  const handlePrevPage = () => setPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-3 lg:p-6">
      <div className="flex justify-between border-b border-gray-400 mb-12 pb-4">
        <div className="font-bold text-lg">
          {isAvailableDeliveries ? 'Available Deliveries' : 'My Active Deliveries'}
        </div>
      </div>

      <div className="my-4 bg-white p-4 rounded-2xl">
        {isLoading || isFetching ? (
          <div className="flex justify-center">
            <CircularProgress size={24} color="inherit" />
          </div>
        ) : deliveries?.data?.items?.length ? (
          <>
            {deliveries.data.items.map((delivery) => (
              <DeliveringCard
                key={delivery.id}
                id={`${delivery.id}`}
                trackingId={delivery.code}
                delivery={delivery.product_name}
                address={delivery.pickup_address}
                status={delivery.delivery_status}
                date={delivery.created_at}
                selected={!isAvailableDeliveries} // Highlight active deliveries
                showAction={true}
                isAvailableDelivery={isAvailableDeliveries}
              />

            ))}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outlined"
                onClick={handlePrevPage}
                disabled={page === 1 || isFetching}
              >
                Previous
              </Button>

              <Typography>
                Page {page} of {deliveries.data.meta?.pagination?.total_pages || 1}
              </Typography>

              <Button
                variant="outlined"
                onClick={handleNextPage}
                disabled={
                  page >= (deliveries.data.meta?.pagination?.total_pages || 1) ||
                  isFetching
                }
              >
                Next
              </Button>
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