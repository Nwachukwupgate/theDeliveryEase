import { useRiderDashboardQuery, useRiderDeliveriesQuery } from "@/api/apiSlice";
import DashboardCard from "./components/DashboardCard";
import DeliveringCard from "./components/DeliveringCard";
import { CircularProgress } from "@mui/material";

const deliveries = [
    {
      id: "AZ34KLO",
      delivery: "Same Day Delivery",
      address: "Malu road Idumota, Abuja State",
      status: "On the way",
      date: "14 May 2024, 3:04 PM",
      product: "Macbook",
      weight: "2 kg",
      trackingId: "AZ34KLO",
      stops: [
          {
            label: "Delivery Booked",
            location: "2, Malu road Idumota, Abuja",
            status: "Done",
            time: "14 May 2024, 3:04 PM",
          },
          {
            label: "Arrived at pick up point",
            location: "2, Malu road Idumota, Abuja",
            status: "Done",
            time: "14 May 2024, 3:04 PM",
          },
          {
            label: "Route to delivery",
            location: "2, Malu road Idumota, Abuja",
            status: "Ongoing",
            time: "Pending",
          },
          {
            label: "Arrived at delivery",
            location: "Pending",
            status: "Pending",
            time: "Pending",
          },
          {
            label: "Delivery accepted",
            location: "Pending",
            status: "Pending",
            time: "Pending",
          },
      ],
      mapUrl: "https://via.placeholder.com/600x400.png?text=Map", // Placeholder image
    },
    {
      id: "BZ23POI",
      delivery: "Next Day Delivery",
      address: "Malu road Idumota, Abuja State",
      status: "Pending",
      date: "14 May 2024, 3:04 PM",
      product: "Laptop",
      weight: "1.8 kg",
      trackingId: "BZ23POI",
      stops: [
          {
            label: "Delivery Booked",
            location: "3, Malu road Idumota, Abuja",
            status: "Done",
            time: "15 May 2024, 3:04 PM",
          },
          {
            label: "Arrived at pick up point",
            location: "3, Malu road Idumota, Abuja",
            status: "Pending",
            time: "Pending",
          },
          {
            label: "Route to delivery",
            location: "Pending",
            status: "Pending",
            time: "Pending",
          },
      ],
      mapUrl: "https://via.placeholder.com/600x400.png?text=Map",
    },
  ];

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
