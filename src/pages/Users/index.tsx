import { useState, ReactNode } from "react";
import DashboardCard from "./components/DashboardCard";
import SameDay from "../../common/icons/SameDay";
import ExpressIcon from "../../common/icons/ExpressIcon";
import ScheduledIcon from "../../common/icons/ScheduledIcon";
import NextDay from "../../common/icons/NextDay";
import DeliveryCard from "./components/DeliveryCard";
import ViewIcon from "../../common/icons/ViewIcon";
import { useGetDashboardQuery } from "@/api/apiSlice";

// Define the type for each step in the delivery process
interface DeliveryStep {
  label: string;
  location: string;
  status: "Done" | "Ongoing" | "Pending";
  time: string;
}

// Define the type for each delivery
interface Delivery {
  id: string;
  address: string;
  status: "Ongoing" | "Pending" | "Completed";
  timestamp: string;
  steps: DeliveryStep[];
  icon: ReactNode; // Accepts JSX as the icon
  image: string;
  stage?: number;
}

const DashboardPage = () => {
  // Delivery data type
  const { data } = useGetDashboardQuery()

  const steps: string[] = [
    "Delivery Booked",
    "Delivery accepted",
    "Arrived at pick up point",
    "Route to delivery",
    "Arrived at delivery",
    "Delivery accepted",
  ];
  const deliveries: Delivery[] = [
    {
      id: "AZ34KLO",
      address: "2, Malu road Idumota, Abuja",
      status: "Ongoing",
      timestamp: "14 May 2024, 3:04 PM",
      steps: [
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
      icon: <SameDay />, // Icon for same-day delivery
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100",
    },
    {
      id: "AZ34KLO2",
      address: "3, Malu road Idumota, Abuja",
      status: "Pending",
      timestamp: "15 May 2024, 3:04 PM",
      steps: [
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
        {
          label: "Arrived at delivery",
          location: "Pending",
          status: "Pending",
          time: "Pending",
        },
      ],
      icon: <ExpressIcon />, // Icon for express delivery
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
    },
    {
        id: "AZ34KLY",
        address: "2, Malu road Idumota, Abuja",
        status: "Ongoing",
        timestamp: "14 May 2024, 3:04 PM",
        steps: [
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
        icon: <SameDay />, // Icon for same-day delivery
        image:
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100",
      },
  ];

  // Manage the currently selected delivery
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery>(deliveries[0]);

  // Handle delivery selection
  const handleDeliveryClick = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
  };

  function DeliverySteps({ delivery }: { delivery: Delivery }) {
    return steps.map((step: string, index: number) => (
      <div
        key={index}
        className="relative mb-10 flex flex-row items-start gap-x-4"
      >
        {/* Step Circle */}
        <div
          className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full ${
            (delivery.stage ?? 0) === index + 1 ? "bg-[#581756]" : "bg-gray-300"
          }`}
          style={{ left: "1px" }} // Aligns with the vertical line
        >
          {/* Checkmark for completed steps */}
          {(delivery.stage ?? 0) === index + 1 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>

        {/* Step Details */}
        <div className="ml-4">
          <div className="font-semibold">{step}</div>
          <div className="text-sm text-gray-600">
            {(delivery?.stage ?? 1) < 5 ? delivery.address : delivery.address}
          </div>
          <div className="text-xs text-gray-400">{delivery.timestamp}</div>
        </div>
      </div>
    ));
  }

  return (
    <div className="p-3 lg:p-6">
      {/* Dashboard Header */}
      <div className="flex justify-between border-b border-gray-400 mb-12 pb-4">
        <div className="font-bold text-lg">Dashboard</div>
      </div>

      {/* Dashboard Cards */}
      <div className="flex flex-row flex-wrap gap-4 w-full">
        <DashboardCard name="T" title="Total Order" amount="2000" color="#B57EDC" />
        <DashboardCard name="S" title="Successful Order" amount="200" color="#7EDCA4" />
        <DashboardCard name="O" title="Ongoing Order" amount="2000" color="#DF20E3" />
        <DashboardCard name="C" title="Cancelled Order" amount="2000" color="#C31919" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mt-10">
        <div className="col-span-4">
            {/* Delivery Cards */}
            <div className="">
                <div className="flex flex-row flex-wrap gap-8 justify-center">
                <DeliveryCard
                    icon={<SameDay />}
                    label="Same Day"
                    amount="Delivery"
                    borderClasses="border border-dashed border-black"
                />
                <DeliveryCard
                    icon={<ExpressIcon />}
                    label="Next Day"
                    amount="Delivery"
                    borderClasses="border border-dashed border-black"
                />
                <DeliveryCard
                    icon={<ScheduledIcon />}
                    label="Scheduled"
                    amount="Delivery"
                    borderClasses="border border-dashed border-black"
                />
                <DeliveryCard
                    icon={<NextDay />}
                    label="Express"
                    amount="Delivery"
                    borderClasses="border border-dashed border-black"
                />
                </div>
            </div>

            {/* Deliveries Section */}
            <div className="mt-10 bg-white p-4 lg:p-8 rounded-lg">
                <div className="flex justify-between items-center">
                <p className="font-bold text-lg">Deliveries</p>
                <ViewIcon />
                </div>

                {/* List of Deliveries */}
                <div className="mt-4">
                {deliveries.map((delivery) => (
                    <div
                    key={delivery.id}
                    className="flex flex-row justify-between items-center mb-4 lg:py-2 cursor-pointer"
                    onClick={() => handleDeliveryClick(delivery)}
                    >
                    <div className="bg-[#B57EDC] content-center p-2 rounded-full">
                        {delivery.icon}
                    </div>


                    <p className="font-semibold">{delivery.id}</p>
                    <p className="text-sm text-gray-500">{delivery.address}</p>


                    <div className="flex items-center gap-x-3 lg:gap-x-6">
                        <img
                        className="object-cover w-6 lg:w-8 h-6 lg:h-8 rounded-full"
                        src={delivery.image}
                        alt="Delivery"
                        />
                    </div>

                    <div>
                        <p
                        className={`text-sm ${
                            delivery.status === "Ongoing" ? "text-yellow-500" : "text-gray-500"
                        }`}
                        >
                        {delivery.status}
                        </p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>

        <div className="bg-white p-8 col-span-2 rounded-lg">
            <div className="font-bold">Quick Access</div>
            <div className="relative mt-4">
                {/* Vertical Line */}
                <div className="absolute w-px h-full bg-[#581756] left-2.5 top-0"></div>

                {
                  selectedDelivery ? <DeliverySteps delivery={selectedDelivery}/> : <></>
                }
            </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
