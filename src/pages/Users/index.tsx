import { useState, useEffect, useRef } from "react";
import DashboardCard from "./components/DashboardCard";
import SameDay from "../../common/icons/SameDay";
import ExpressIcon from "../../common/icons/ExpressIcon";
import ScheduledIcon from "../../common/icons/ScheduledIcon";
import NextDay from "../../common/icons/NextDay";
import DeliveryCard from "./components/DeliveryCard";
import ViewIcon from "../../common/icons/ViewIcon";
import {
  useGetDeliveryHistoryQuery,
  useGetDashboardQuery,
} from "@/api/apiSlice";
import { Delivery } from "@/types/types";
import { CircularProgress } from "@mui/material";
import moment from "moment";

const DashboardPage = () => {
  // const { data, isLoading } = useGetDeliveryHistoryQuery({ page: 1 });

  const { data: dashboardData, isLoading } = useGetDashboardQuery();

  // Destructure the stats from the API response
  const { total_orders, successful_orders, ongoing_orders, cancelled_orders } =
    dashboardData?.data || {};

  const stats = [
    { title: "Total Orders", amount: total_orders, color: "#B57EDC" },
    { title: "Successful Orders", amount: successful_orders, color: "#7EDCA4" },
    { title: "Ongoing Orders", amount: ongoing_orders, color: "#DF20E3" },
    { title: "Cancelled Orders", amount: cancelled_orders, color: "#C31919" },
  ];

  const targetRef = useRef<HTMLDivElement | null>(null);

  // console.log(data)

  // Manage the currently selected delivery
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery>();

  // Handle delivery selection
  const handleDeliveryClick = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // useEffect(() => {
  //   if (data) {
  //     setSelectedDelivery(data?.data?.deliveries?.data[0]);
  //   }
  // }, [data]);

  return (
    <div className="p-3 lg:p-6">
      {/* Dashboard Stats */}
      <div>
        <div className="mb-12 flex justify-between border-b border-gray-400 pb-4">
          <div className="text-lg font-bold">Dashboard</div>
        </div>

        {/* Dashboard Cards */}
        <div className="flex w-full flex-row flex-wrap gap-4">
          {isLoading ? (
            <p>Loading...</p>
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
      </div>

      {/* Delivery Types */}
      <div className="mt-10 grid-cols-1 gap-8 lg:grid lg:grid-cols-6">
        <div className="col-span-4">
          <div className="">
            <div className="flex flex-row flex-wrap justify-center gap-8">
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
          <div className="mt-10 rounded-lg bg-white p-4 lg:p-8">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">Deliveries</p>
              <ViewIcon />
            </div>

            {/* List of Deliveries */}
            {isLoading ? (
              <CircularProgress size={"24px"} color="inherit" />
            ) : (
              <div className="mt-4">
                {/* <div className="overflow-x-auto">
                  {data?.data?.deliveries?.data?.map(
                    (delivery: Delivery, index: number) => (
                      <div
                        key={index}
                        className={`mb-4 flex cursor-pointer flex-row items-center justify-between space-x-4 text-nowrap lg:py-2 ${
                          selectedDelivery === delivery
                            ? "w-fit bg-[#EBE1F1] px-4 py-1 text-gray-800 sm:w-full lg:w-full"
                            : ""
                        }`}
                        onClick={() => handleDeliveryClick(delivery)}
                      >
                        <div className="content-center rounded-full bg-[#B57EDC] p-2">
                          {delivery.delivery_type === "Same Day Delivery" ? (
                            <SameDay />
                          ) : (
                            <ExpressIcon />
                          )}
                        </div>

                        <p className="text-nowrap font-semibold">
                          {delivery.code}
                        </p>
                        <p
                          className={`text-nowrap text-sm ${selectedDelivery === delivery ? "text-gray-600" : "text-gray-500"} text-ellipsis`}
                        >
                          {delivery.delivery_address}
                        </p>

                        <div className="flex items-center gap-x-3 lg:gap-x-6">
                          <img
                            className="h-6 w-6 rounded-full object-cover lg:h-8 lg:w-8"
                            src={`https://deliver.door-steps.pro/storage/${delivery.receipt}`}
                            alt="Delivery"
                          />
                        </div>

                        <div>
                          <p
                            className={`text-sm ${
                              delivery.delivery_status === "pending"
                                ? "text-yellow-500"
                                : "text-gray-500"
                            } ${selectedDelivery === delivery ? "font-bold" : ""}`}
                          >
                            {delivery.delivery_status}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div> */}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 w-full rounded-lg bg-white p-4 lg:col-span-2 lg:mt-0 lg:p-8">
          <div className="font-bold">Quick Access</div>
          <div className="relative mt-4 w-full">
            {/* Vertical Line */}
            <div className="absolute left-2.5 top-0 h-full w-px bg-[#581756]"></div>

            {selectedDelivery ? (
              <div ref={targetRef}>
                <DeliverySteps delivery={selectedDelivery} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

export function DeliverySteps({
  delivery,
  showExtras = true,
}: {
  delivery: Delivery | null;
  showExtras?: boolean;
}) {
  const steps: string[] = [
    "Delivery Booked",
    "Delivery accepted",
    "Arrived at pick up point",
    "Route to delivery",
    "Arrived at delivery",
    "Delivery accepted",
  ];

  // Map delivery statuses to steps using a function
  // function getStepByStatus(status: string): number {
  //   switch (status) {
  //     case "Pending":
  //       return 1; // Delivery Booked
  //     case "Dispatched":
  //       return 3; // Arrived at pick up point
  //     case "In Transit":
  //       return 4; // Route to delivery
  //     case "Delivered":
  //       return 6; // Delivery accepted
  //     default:
  //       return -1; // Unknown status
  //   }
  // }

  // Helper function to find the most recent location for each step
  const getLocationForStep = (stepIndex: number) => {
    const statusForStep = Object.entries({
      Pending: 1,
      Dispatched: 3,
      "In Transit": 4,
      Delivered: 6,
    }).find(([_, step]) => step === stepIndex + 1)?.[0];

    if (statusForStep) {
      const locationsForStatus = delivery?.locations?.filter(
        (location) => location.status === statusForStep,
      );

      // Find the location with the highest `id` (most recent)
      const latestLocation = locationsForStatus?.reduce(
        (latest, current) =>
          current.id > (latest?.id ?? 0) ? current : latest,
        delivery?.locations ? delivery.locations[0] : null,
      );

      return latestLocation?.location;
    }
    return null;
  };

  return (
    <>
      {steps.map((step: string, index: number) => (
        <div
          key={index}
          className="relative mb-10 flex flex-row items-start gap-x-4"
        >
          {/* Step Circle */}
          <div
            className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full ${
              (delivery?.stage ?? 0) >= index + 1
                ? "bg-[#581756]"
                : "bg-gray-300"
            }`}
            style={{ left: "1px" }} // Aligns with the vertical line
          >
            {/* Checkmark for completed steps */}
            {(delivery?.stage ?? 0) >= index + 1 && (
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
            {showExtras && (
              <>
                <div className="text-sm text-gray-600">
                  {getLocationForStep(index) ||
                    (index < 3
                      ? delivery?.pickup_address
                      : delivery?.delivery_address)}
                </div>
                <div className="text-xs text-gray-400">
                  {moment(delivery?.created_at).format("DD MMM YYYY")}{" "}
                  {moment(delivery?.created_at).format("h:mm A")}
                </div>
                {/* <div className="text-xs text-gray-400">{moment(delivery?.created_at).format("h:mm A")}</div> */}
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
