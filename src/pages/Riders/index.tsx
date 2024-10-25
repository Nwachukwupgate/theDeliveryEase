import { useRiderDashboardQuery, useRiderDeliveriesQuery } from "@/api/apiSlice";
import DashboardCard from "./components/DashboardCard";
import DeliveringCard from "./components/DeliveringCard";
import { CircularProgress } from "@mui/material";
import { Link } from 'react-router-dom';
import routes from '@/navigation/routes';



const DashboardPage = () => {
  const { data } = useRiderDashboardQuery();

  const { data: query, isLoading } = useRiderDeliveriesQuery();

  return (
    <div className="p-3 lg:p-6">
      <div className="mb-12 flex justify-between border-b border-gray-400 pb-4">
        <div className="text-lg font-bold">Dashboard</div>
      </div>

      <div className="grid w-full grid-cols-2 flex-row flex-wrap gap-4 lg:flex">
        <DashboardCard
          name="T"
          title="Total Order"
          amount={`${data?.totalOrders ?? "0"}`}
          color="#B57EDC"
        />
        <DashboardCard
          name="S"
          title="Successful Order"
          amount={`${data?.successfulOrders ?? "0"}`}
          color="#7EDCA4"
        />
        <DashboardCard
          name="O"
          title="Ongoing Order"
          amount={`${data?.ongoingOrders ?? "0"}`}
          color="#DF20E3"
        />
        <DashboardCard
          name="C"
          title="Cancelled Order"
          amount={`${data?.cancelledOrders ?? "0"}`}
          color="#C31919"
        />
      </div>

      <div className="my-4 rounded-2xl bg-white p-4">

        <h2 className="my-3 font-bold text-xl">Active Deliveries</h2>

        {isLoading ? (
          <CircularProgress size={"24px"} color="inherit" />
        ) : (
          query?.deliveries?.slice(0, 6).map((delivery) => (
            <Link to={`/rider/${delivery.id}`} key={delivery.code}>
              <DeliveringCard
                key={delivery.code}
                id={`${delivery.id}`}
                delivery={delivery.product_name}
                address={delivery.pickup_address}
                status={delivery.delivery_status}
                date={delivery.created_at}
                selected={true}
                showAction={false}
              />
            </Link>
          ))
        )}

        <div className="text-end font-bold"><Link to={routes.RidersRoute.RIDER_DELIVERIES}> View All </Link></div>
      </div>

      <div className="my-4 rounded-2xl bg-white p-4">

        <h2 className="my-3 font-bold text-xl">New Deliveries</h2>

        {query?.pendingDeliveries?.map((delivery) => (
          <Link to={`/rider/${delivery.id}`} key={delivery.code}>
            <DeliveringCard
              id={`${delivery.id}`}
              delivery={delivery.product_name}
              address={delivery.pickup_address}
              status={delivery.delivery_status}
              date={delivery.created_at}
              selected={false}
              showAction={true}
            />
          </Link>
        ))}

        <div className="text-end font-bold">View All</div>
      </div>
    </div>
  );
};

export default DashboardPage;
