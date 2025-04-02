import {
  useRiderAvailableDeliveriesQuery,
  useRiderActiveDeliveriesQuery,
  useRiderDashboardStatsQuery
} from "@/api/apiSlice";
import DashboardCard from "./components/DashboardCard";
import DeliveringCard from "./components/DeliveringCard";
import { CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom';
import routes from '@/navigation/routes';

const DashboardPage = () => {
  // Dashboard stats
  const { data: dashboardData } = useRiderDashboardStatsQuery();

  // Available deliveries (not yet claimed)
  const {
    data: availableDeliveries,
    isLoading: loadingAvailable
  } = useRiderAvailableDeliveriesQuery({ page: 1 });

  // Active deliveries (already claimed by rider)
  const {
    data: activeDeliveries,
    isLoading: loadingActive
  } = useRiderActiveDeliveriesQuery({ page: 1 });

  return (
    <div className="p-3 lg:p-6">
      <div className="mb-12 flex justify-between border-b border-gray-400 pb-4">
        <div className="text-lg font-bold">Dashboard</div>
      </div>

      {/* Stats Cards */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 flex-row flex-wrap gap-4 lg:flex">
        <DashboardCard
          name="T"
          title="Total Assignments"
          amount={`${dashboardData?.data?.total_assignments ?? "0"}`}
          color="#B57EDC"
        />
        <DashboardCard
          name="C"
          title="Completed"
          amount={`${dashboardData?.data?.completed ?? "0"}`}
          color="#7EDCA4"
        />
        <DashboardCard
          name="A"
          title="Active"
          amount={`${dashboardData?.data?.active ?? "0"}`}
          color="#DF20E3"
        />
        <DashboardCard
          name="R"
          title="Rejected"
          amount={`${dashboardData?.data?.rejected ?? "0"}`}
          color="#C31919"
        />
      </div>

      {/* Active Deliveries Section */}
      <div className="my-4 rounded-2xl bg-white p-4">
        <h2 className="my-3 text-xl font-bold">My Active Deliveries</h2>

        {loadingActive ? (
          <CircularProgress size={"24px"} color="inherit" />
        ) : activeDeliveries?.data?.items?.length ? (
          <>
            {activeDeliveries.data.items.slice(0, 6).map((delivery) => (
              <DeliveringCard
                key={delivery.code}
                id={`${delivery.id}`}
                trackingId={delivery.code}
                delivery={delivery.product_name}
                address={delivery.pickup_address}
                status={delivery.delivery_status}
                date={delivery.created_at}
                selected={true}
                showAction={true}
              />
            ))}
            <div className="text-end font-bold">
              <Link to={routes.RidersRoute.RIDER_DELIVERIES}>View All</Link>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No active deliveries found</p>
        )}
      </div>

      {/* Available Deliveries Section */}
      <div className="my-4 rounded-2xl bg-white p-4">
        <h2 className="my-3 text-xl font-bold">Available Deliveries</h2>

        {loadingAvailable ? (
          <CircularProgress size={"24px"} color="inherit" />
        ) : availableDeliveries?.data?.items?.length ? (
          <>
            {availableDeliveries.data.items.slice(0, 6).map((delivery) => (

              <DeliveringCard
                key={delivery.code}
                id={`${delivery.id}`}
                trackingId={delivery.code}
                delivery={delivery.product_name}
                address={delivery.pickup_address}
                status={delivery.delivery_status}
                date={delivery.created_at}
                selected={false}
                showAction={true}
                isAvailableDelivery={true}
              />

            ))}
            <div className="text-end font-bold">
              <Link to={routes.RidersRoute.AVAILABLE_DELIVERIES}>View All</Link>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No available deliveries at this time</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;