import DashboardCard from "./components/DashboardCard";
import DeliveringCard from "./components/DeliveringCard";

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
  return (
    <div className="p-3 lg:p-6">
      <div className="flex justify-between border-b border-gray-400 mb-12 pb-4">
        <div className="font-bold text-lg">Dashboard</div>
      </div>

      <div className="lg:flex flex-row flex-wrap grid grid-cols-2 gap-4 w-full">
        <DashboardCard name="T" title="Total Order" amount="2000" color="#B57EDC" />
        <DashboardCard name="S" title="Successful Order" amount="200" color="#7EDCA4" />
        <DashboardCard name="O" title="Ongoing Order" amount="2000" color="#DF20E3" />
        <DashboardCard name="C" title="Cancelled Order" amount="2000" color="#C31919" />
      </div>

      <div className="my-4 bg-white p-4 rounded-2xl">
        {deliveries.map((delivery) => (
            <DeliveringCard
                key={delivery.id}
                id={delivery.id}
                delivery={delivery.delivery}
                address={delivery.address}
                status={delivery.status}
                date={delivery.date}
                selected = { true }
                showAction= {false}
            />
        ))}

        <div className="text-end font-bold">
            View All
        </div>
      </div>

      <div className="my-4 bg-white p-4 rounded-2xl">
        {deliveries.map((delivery) => (
            <DeliveringCard
                key={delivery.id}
                id={delivery.id}
                delivery={delivery.delivery}
                address={delivery.address}
                status={delivery.status}
                date={delivery.date}
                selected = { false }
                showAction= {true}
            />
        ))}

        <div className="text-end font-bold">
            View All
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
