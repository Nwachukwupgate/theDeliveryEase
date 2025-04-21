import {
  useRiderAssignedDeliveriesQuery,
  useRiderDashboardStatsQuery,
  useGetDeliveriesQuery
} from "@/api/apiSlice";
import DeliveringCard from "./components/DeliveringCard";
import { CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom';
import routes from '@/navigation/routes';
import DashboardCard from "../Users/components/DashboardCard";
import WelcomeGreeting from "../Users/components/welcomeGreeting";

const DashboardPage = () => {
  // Dashboard stats
  const { data: dashboardData, isLoading: statsLoading } = useRiderDashboardStatsQuery();

  const { completed = 0, active = 0, rejected = 0, total_assignments = 0 } = dashboardData?.data || {};

  // Available deliveries (not yet claimed)
  const { data: availableDeliveries,
    isLoading: loadingAvailable } = useGetDeliveriesQuery({
      page: 1
    });

  // Assigned deliveries (already claimed by rider)
  const {
    data: assignedDeliveries,
    isLoading: loadingActive
  } = useRiderAssignedDeliveriesQuery({ page: 1 });

  const stats = [
    {
      title: "Total Orders",
      amount: total_assignments,
      color: "rgba(181, 126, 220, 0.5)",
    },
    {
      title: "Active",
      amount: active,
      color: "rgba(223, 32, 227, 0.3)",
    },
    {
      title: "Completed",
      amount: completed,
      color: "rgba(126, 220, 164, 0.5)",
    },
    {
      title: "Rejected",
      amount: rejected,
      color: "rgba(195, 25, 25, 0.4)",
    },
  ];

  return (
    <div className="p-3 lg:p-6">
      {/* header */}
      <div className="text-lg flex justify-between items-center font-bold mb-6 md:mb-8">
        <div>Dashboard</div>
        <WelcomeGreeting />
      </div>

      <div className=" grid gap-y-16">
        {/* Stats Cards */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsLoading ? (
            <div className="flex justify-center py-8">
              <CircularProgress size={24} color="inherit" />
            </div>
          ) : (
            stats.map((stat, index) => (
              <DashboardCard
                key={index}
                name={stat.title.charAt(0)}
                title={stat.title}
                amount={stat.amount}
                color={stat.color}
              />
            ))
          )}
        </div>

        {/* Active Deliveries Section */}
        <div className="  rounded-2xl bg-white px-4 md:p-6 py-2 shadow-sm">
          <h2 className="mb-4 text-lg md:text-xl font-bold">Assigned Deliveries</h2>
          {loadingActive ? (
            <CircularProgress size={"24px"} color="inherit" />
          ) : assignedDeliveries?.data?.items?.length ? (
            <div>
              <article className=" grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {assignedDeliveries.data.items.slice(0, 5).map((delivery) => (
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
              </article>
              <div className=" px-2 py-1 hover:bg-primaryColor500 hover:text-white ml-auto text-end w-fit text-xs font-bold border border-primaryColor500 rounded-2xl shadow-sm">
                <Link to={routes.RidersRoute.RIDER_DELIVERIES}>View All</Link>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No assigned deliveries found</p>
          )}
        </div>

        {/* New Deliveries Section */}
        <div className="  rounded-2xl bg-white px-4 md:p-6 py-2 shadow-sm">
          <h2 className="mb-4 text-lg md:text-xl font-bold">New Deliveries</h2>
          {loadingAvailable ? (
            <CircularProgress size={"24px"} color="inherit" />
          ) : availableDeliveries?.data?.items?.length ? (
            <>
              <article className=" grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
              </article>
              <div className=" px-2 py-1 hover:bg-primaryColor500 hover:text-white ml-auto text-end w-fit text-xs font-bold border border-primaryColor500 rounded-2xl shadow-sm">
                <Link to={routes.RidersRoute.AVAILABLE_DELIVERIES}>View All</Link>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No available deliveries at this time</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;