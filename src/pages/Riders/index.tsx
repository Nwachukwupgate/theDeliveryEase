import { useRiderDashboardQuery, useRiderDeliveriesQuery } from "@/api/apiSlice";
import DashboardCard from "./components/DashboardCard";
import DeliveringCard from "./components/DeliveringCard";
import { CircularProgress } from "@mui/material";

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
        {isLoading ? (
          <CircularProgress size={"24px"} color="inherit" />
        ) : (
          query?.deliveries?.map((delivery) => (
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
          ))
        )}

        <div className="text-end font-bold">View All</div>
      </div>

      <div className="my-4 rounded-2xl bg-white p-4">
        {query?.pendingDeliveries?.map((delivery) => (
          <DeliveringCard
            key={delivery.code}
            id={`${delivery.id}`}
            delivery={delivery.product_name}
            address={delivery.pickup_address}
            status={delivery.delivery_status}
            date={delivery.created_at}
            selected={false}
            showAction={true}
          />
        ))}

        <div className="text-end font-bold">View All</div>
      </div>
    </div>
  );
};

export default DashboardPage;
