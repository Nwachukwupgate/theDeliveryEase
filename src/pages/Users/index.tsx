import { useState, useEffect, useRef } from "react";
import DashboardCard from "./components/DashboardCard";
import SameDay from "../../common/icons/SameDay";
import ExpressIcon from "../../common/icons/ExpressIcon";
import ScheduledIcon from "../../common/icons/ScheduledIcon";
import NextDay from "../../common/icons/NextDay";
import DeliveryTypeButtons from "./components/DeliveryTypeButtons";
import { useGetDeliveriesQuery, useGetDashboardQuery } from "@/api/apiSlice";
import { Delivery } from "@/types/types";
import { CircularProgress } from "@mui/material";
import { DeliveryStatus, DeliveryType } from "@/utilities/constants";
import { X } from "lucide-react"; // Added X icon for close button
import { DeliveryDetailsPanel } from "./components/deliveryDetailsPanel";
import WelcomeGreeting from "./components/welcomeGreeting";

const DashboardPage = () => {
  const [deliveryType, setDeliveryType] = useState<string | undefined>(
    undefined,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: deliveriesResponse,
    isLoading: isDeliveriesLoading,
    isFetching: isDeliveriesFetching,
  } = useGetDeliveriesQuery({
    type: deliveryType,
    page: currentPage,
  });

  const { data: dashboardData, isLoading: isDashboardLoading } =
    useGetDashboardQuery();

  // Get deliveries from response or empty array
  const deliveries = deliveriesResponse?.data?.items || [];
  const pagination = deliveriesResponse?.data?.meta?.pagination;

  const stats = [
    {
      title: "Total Orders",
      amount: dashboardData?.data?.total_orders || 0,
      color: "rgba(181, 126, 220, 0.5)",
    },
    {
      title: "Successful Orders",
      amount: dashboardData?.data?.successful_orders || 0,
      color: "rgba(126, 220, 164, 0.5)",
    },
    {
      title: "Ongoing Orders",
      amount: dashboardData?.data?.ongoing_orders || 0,
      color: "rgba(223, 32, 227, 0.3)",
    },
    {
      title: "Cancelled Orders",
      amount: dashboardData?.data?.cancelled_orders || 0,
      color: "rgba(195, 25, 25, 0.4)",
    },
  ];

  const deliveryTypeData = [
    {
      icon: <SameDay />,
      label: "Same Day",
      type: DeliveryType.SAME_DAY
    },
    {
      icon: <NextDay />,
      label: "Next Day",
      type: DeliveryType.NEXT_DAY
    },
    {
      icon: <ExpressIcon />,
      label: "Express",
      type: DeliveryType.EXPRESS
    },
    {
      icon: <ScheduledIcon />,
      label: "Scheduled",
      type: DeliveryType.SCHEDULED
    },
  ]

  const targetRef = useRef<HTMLDivElement | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null,
  );
  const [showDeliveryModal, setShowDeliveryModal] = useState<boolean>(false);

  function handleDeliveryClick(delivery: Delivery) {
    setSelectedDelivery(delivery);

    // Show modal on medium screens and below
    if (window.innerWidth < 1024) {
      setShowDeliveryModal(true);
    }

    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  function handleDeliveryTypeChange(type: string) {
    // Toggle filter - if same type is clicked again, remove filter
    setDeliveryType((currentType) => (currentType === type ? undefined : type));
  };

  function handleClearFilter() {
    setDeliveryType(undefined);
  };

  // Handle pagination button clicks
  function handleNextPage() {
    if (pagination?.links.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  function handlePreviousPage() {
    if (pagination?.links.previous) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Set first delivery as selected when data loads or changes 
  useEffect(() => {
    if (deliveries.length > 0 && !selectedDelivery) {
      setSelectedDelivery(deliveries[0]);
    }
  }, [deliveries, selectedDelivery]);

  return (
    <div className="flex flex-col gap-y-6 md:gap-y-10 pt-6">
      <div>
        {/* header */}
        <div className="text-lg flex justify-between items-center font-bold mb-6 md:mb-8">
          <div>Dashboard</div>
          <WelcomeGreeting />
        </div>
        {/* Dashboard Stats */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
          {isDashboardLoading ? (
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

      <div className=" lg:flex justify-between items-baseline lg:gap-x-8">
        <div className=" grid gap-y-6 md:gap-y-10 ">
          {/* Delivery type filter buttons */}
          <div className="flex gap-2 items-center justify-between md:justify-evenly">
            {
              deliveryTypeData.map(({ type, icon, label }, index) => <button
                key={index}
                onClick={() => handleDeliveryTypeChange(type)}
                aria-label="Filter same day deliveries"
              >
                <DeliveryTypeButtons
                  icon={icon}
                  label={label}
                  borderClasses={`border border-dashed ${deliveryType === type
                    ? "border-[#581756]"
                    : "border-gray-300"
                    }`}
                />
              </button>)
            }
          </div>

          {/* Deliveries list Section */}
          <div className="rounded-lg bg-white p-4 lg:p-8">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">Deliveries</p>
              {deliveryType &&
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Filtered by: {deliveryType.replace("_", " ")}
                  </span>
                  <button
                    onClick={handleClearFilter}
                    className="ml-2 text-sm text-primaryColor500 font-bold hover:underline focus:outline-none"
                  >
                    Clear Filter
                  </button>
                </div>
              }
            </div>

            {/* List of Deliveries */}
            {isDeliveriesLoading || isDeliveriesFetching ? (
              <div className="flex justify-center py-8">
                <CircularProgress size={24} color="inherit" />
              </div>
            ) : deliveries.length > 0 ? (
              <div className="mt-4">
                <div className="overflow-x-auto flex flex-col gap-y-4">
                  {deliveries.map((delivery: Delivery) => (
                    <div
                      key={delivery.id}
                      className={`p-2 grid grid-cols-3 items-center place-items-stretch md:grid-cols-4 cursor-pointer  text-nowrap rounded-lg transition-colors ${selectedDelivery?.id === delivery.id
                        ? "bg-[#EBE1F1] text-gray-800"
                        : "hover:bg-gray-50"
                        }`}
                      onClick={() => handleDeliveryClick(delivery)}
                    >
                      {/* icons */}
                      <div className="   rounded-full bg-[#B57EDC] h-fit w-fit grid place-items-center p-2">
                        {delivery.delivery_type === DeliveryType.SAME_DAY ? (
                          <SameDay />
                        ) : delivery.delivery_type === DeliveryType.EXPRESS ? (
                          <ExpressIcon />
                        ) : delivery.delivery_type === DeliveryType.SCHEDULED ? (
                          <ScheduledIcon />
                        ) : (
                          <NextDay />
                        )}
                      </div>

                      <p className="text-nowrap md:-ml-20 text-[8px] md:text-sm font-semibold mr-auto">
                        {delivery.code}
                      </p>
                      <p
                        className={`hidden text-nowrap text-[8px] md:text-sm md:block ${selectedDelivery?.id === delivery.id
                          ? "text-gray-600"
                          : "text-gray-500"
                          }`}
                      >
                        {delivery.delivery_address}
                      </p>

                      <p
                        className={`text-[8px] ml-auto md:text-sm ${delivery.delivery_status === DeliveryStatus.PENDING
                          ? "text-[#FFAA05]"
                          : delivery.delivery_status === DeliveryStatus.DELIVERED
                            ? "text-[#0DE622]"
                            : delivery.delivery_status === DeliveryStatus.IN_TRANSIT ? "text-gray-500" : "text-[#E60D0D]"
                          } ${selectedDelivery?.id === delivery.id
                            ? "font-bold"
                            : "font-medium"
                          }`}
                      >
                        {delivery.delivery_status}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.total_pages > 1 && (
                  <div className=" text-xs flex items-center w-fit mx-auto gap-x-2 mt-6">
                    <button
                      onClick={handlePreviousPage}
                      disabled={!pagination.links.previous}
                      className="rounded bg-[#581756] px-4 py-1 text-white disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <span>
                      Page {pagination.current_page} of {pagination.total_pages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={!pagination.links.next}
                      className="rounded bg-[#581756] px-4 py-1 text-white disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                {deliveryType
                  ? `No ${deliveryType.replace("_", " ")} deliveries found`
                  : "No deliveries found"}
              </div>
            )}
          </div>
        </div>

        {/* Delivery Details Panel - shown as modal on medium screens and below */}
        {selectedDelivery && (
          <>
            {/* Desktop view - always visible */}
            <div className="hidden lg:block  bg-white">
              <DeliveryDetailsPanel delivery={selectedDelivery} />
            </div>

            {/* Mobile/Tablet view - modal */}
            {showDeliveryModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start lg:hidden overflow-y-auto p-8">
                <div className="bg-primaryColor100 rounded-lg w-full max-w-2xl mt-4 relative p-8">
                  <button
                    onClick={() => setShowDeliveryModal(false)}
                    className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <X size={24} className=" text-primaryColor800" />
                  </button>
                  <DeliveryDetailsPanel delivery={selectedDelivery} />
                </div>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;