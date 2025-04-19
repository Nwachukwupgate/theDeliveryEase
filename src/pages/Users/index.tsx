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
import { ChevronLeft } from "lucide-react";
import { DeliveryDetailsPanel } from "./components/deliveryDetailsPanel";

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
  const [smallScreenView, setSmallScreenView] = useState<boolean>(
    false
  );

  function handleDeliveryClick(delivery: Delivery) {
    setSelectedDelivery(delivery);

    // hide other dashboard details when a delivery is clicked
    if (window.innerWidth < 1024) {
      setSmallScreenView(true)
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
    if (deliveries.length > 0 && !selectedDelivery && window.innerWidth > 1023) {
      setSelectedDelivery(deliveries[0]);
    }
  }, [deliveries, selectedDelivery]);

  return (
    <div className="p-3 md:p-6">
      {/* Dashboard Stats */}
      {!smallScreenView && <div>
        <div className="mb-6 flex justify-between">
          <div className="text-lg font-bold">Dashboard</div>
        </div>

        {/* Dashboard Cards */}
        <div className=" w-full grid grid-cols-2 gap-4 mb-6">
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
      </div>}
      {/* back button on medium screen below */}
      {smallScreenView && <button onClick={() => setSmallScreenView(false)}>
        <ChevronLeft size={24} className=" text-primaryColor700 mb-8" />
      </button>}

      <div className=" grid-cols-1 gap-8 lg:grid lg:grid-cols-6">

        {/* Delivery type filter buttons */}
        {!smallScreenView && <div className="col-span-4">
          <div className=" flex gap-2 items-center justify-between">
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
          <div className="mt-10 rounded-lg bg-white p-4 lg:p-8">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">Deliveries</p>
              {deliveryType &&
                <div className=" flex flex-col md:flex-row items-center gap-2 ">
                  <span className="text-sm text-gray-600">
                    Filtered by: {deliveryType.replace("_", " ")}
                  </span>
                  <button
                    onClick={handleClearFilter}
                    className="ml-2 text-sm text-blue-500 hover:underline focus:outline-none"
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
                <div className="overflow-x-auto">
                  {deliveries.map((delivery: Delivery) => (
                    <div
                      key={delivery.id}
                      className={`mb-4 flex cursor-pointer flex-row items-center justify-between space-x-4 text-nowrap rounded-lg p-3 transition-colors lg:py-2 ${selectedDelivery?.id === delivery.id
                        ? "bg-[#EBE1F1] text-gray-800"
                        : "hover:bg-gray-50"
                        }`}
                      onClick={() => handleDeliveryClick(delivery)}
                    >
                      <div className="content-center rounded-full bg-[#B57EDC] p-2">
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

                      <p className="text-nowrap text-[8px] md:text-sm font-semibold">
                        {delivery.code}
                      </p>
                      <p
                        className={`hidden text-nowrap text-[8px] md:text-sm  md:block ${selectedDelivery?.id === delivery.id
                          ? "text-gray-600"
                          : "text-gray-500"
                          }`}
                      >
                        {delivery.delivery_address}
                      </p>

                      {/* <div className="flex items-center gap-x-3 lg:gap-x-6">
                        {delivery.receipt && (
                          <img
                            className="h-6 w-6 rounded-full object-cover lg:h-8 lg:w-8"
                            src={`https://deliver.door-steps.pro/storage/${delivery.receipt}`}
                            alt={`Delivery ${delivery.code}`}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/default-delivery-image.png";
                            }}
                          />
                        )}
                      </div> */}

                      <p
                        className={`text-[8px] md:text-sm  ${delivery.delivery_status === DeliveryStatus.PENDING
                          ? "text-[#FFAA05]"
                          : delivery.delivery_status === DeliveryStatus.DELIVERED
                            ? "text-[#0DE622]"
                            : delivery.delivery_status === DeliveryStatus.IN_TRANSIT ? " text-gray-500" : "text-[#E60D0D]"
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
                  <div className="mt-4 text-xs flex items-center justify-between">
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
        </div>}
        {/* Quick Access Sidebar */}
        {smallScreenView && selectedDelivery && <DeliveryDetailsPanel delivery={selectedDelivery} />}
      </div>
    </div>
  );
};

export default DashboardPage;