import { useState, useEffect, useRef } from "react";
import DashboardCard from "./components/DashboardCard";
import SameDay from "../../common/icons/SameDay";
import ExpressIcon from "../../common/icons/ExpressIcon";
import ScheduledIcon from "../../common/icons/ScheduledIcon";
import NextDay from "../../common/icons/NextDay";
import DeliveryCard from "./components/DeliveryCard";
import ViewIcon from "../../common/icons/ViewIcon";
import { useGetDeliveriesQuery, useGetDashboardQuery } from "@/api/apiSlice";
import { Delivery, DeliveriesResponse } from "@/types/types";
import { CircularProgress } from "@mui/material";
import moment from "moment";

const DashboardPage = () => {
  const [deliveryType, setDeliveryType] = useState<string | undefined>(
    undefined,
  );
  const {
    data: deliveriesResponse,
    isLoading: isDeliveriesLoading,
    isFetching: isDeliveriesFetching,
  } = useGetDeliveriesQuery({
    type: deliveryType,
    page: 1,
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
      color: "#B57EDC",
    },
    {
      title: "Successful Orders",
      amount: dashboardData?.data?.successful_orders || 0,
      color: "#7EDCA4",
    },
    {
      title: "Ongoing Orders",
      amount: dashboardData?.data?.ongoing_orders || 0,
      color: "#DF20E3",
    },
    {
      title: "Cancelled Orders",
      amount: dashboardData?.data?.cancelled_orders || 0,
      color: "#C31919",
    },
  ];

  const targetRef = useRef<HTMLDivElement | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null,
  );

  const handleDeliveryClick = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDeliveryTypeChange = (type: string) => {
    // Toggle filter - if same type is clicked again, remove filter
    setDeliveryType((currentType) => (currentType === type ? undefined : type));
  };

  // Set first delivery as selected when data loads or changes
  useEffect(() => {
    if (deliveries.length > 0 && !selectedDelivery) {
      setSelectedDelivery(deliveries[0]);
    }
  }, [deliveries, selectedDelivery]);

  return (
    <div className="p-3 lg:p-6">
      {/* Dashboard Stats */}
      <div>
        <div className="mb-12 flex justify-between border-b border-gray-400 pb-4">
          <div className="text-lg font-bold">Dashboard</div>
        </div>

        {/* Dashboard Cards */}
        <div className="flex w-full flex-row flex-wrap gap-4">
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

      {/* Delivery Types */}
      <div className="mt-10 grid-cols-1 gap-8 lg:grid lg:grid-cols-6">
        <div className="col-span-4">
          <div>
            <div className="flex flex-row flex-wrap justify-center gap-8">
              <button
                onClick={() => handleDeliveryTypeChange("same_day")}
                aria-label="Filter same day deliveries"
              >
                <DeliveryCard
                  icon={<SameDay />}
                  label="Same Day"
                  amount="Delivery"
                  borderClasses={`border border-dashed ${
                    deliveryType === "same_day"
                      ? "border-[#581756]"
                      : "border-gray-300"
                  }`}
                />
              </button>
              <button
                onClick={() => handleDeliveryTypeChange("next_day")}
                aria-label="Filter next day deliveries"
              >
                <DeliveryCard
                  icon={<NextDay />}
                  label="Next Day"
                  amount="Delivery"
                  borderClasses={`border border-dashed ${
                    deliveryType === "next_day"
                      ? "border-[#581756]"
                      : "border-gray-300"
                  }`}
                />
              </button>
              <button
                onClick={() => handleDeliveryTypeChange("scheduled")}
                aria-label="Filter scheduled deliveries"
              >
                <DeliveryCard
                  icon={<ScheduledIcon />}
                  label="Scheduled"
                  amount="Delivery"
                  borderClasses={`border border-dashed ${
                    deliveryType === "scheduled"
                      ? "border-[#581756]"
                      : "border-gray-300"
                  }`}
                />
              </button>
              <button
                onClick={() => handleDeliveryTypeChange("express")}
                aria-label="Filter express deliveries"
              >
                <DeliveryCard
                  icon={<ExpressIcon />}
                  label="Express"
                  amount="Delivery"
                  borderClasses={`border border-dashed ${
                    deliveryType === "express"
                      ? "border-[#581756]"
                      : "border-gray-300"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Deliveries Section */}
          <div className="mt-10 rounded-lg bg-white p-4 lg:p-8">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">Deliveries</p>
              <div className="flex items-center gap-2">
                {deliveryType && (
                  <span className="text-sm text-gray-600">
                    Filtered by: {deliveryType.replace("_", " ")}
                  </span>
                )}
                <ViewIcon />
              </div>
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
                      className={`mb-4 flex cursor-pointer flex-row items-center justify-between space-x-4 text-nowrap rounded-lg p-3 transition-colors lg:py-2 ${
                        selectedDelivery?.id === delivery.id
                          ? "bg-[#EBE1F1] text-gray-800"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleDeliveryClick(delivery)}
                    >
                      <div className="content-center rounded-full bg-[#B57EDC] p-2">
                        {delivery.delivery_type === "same_day" ? (
                          <SameDay />
                        ) : delivery.delivery_type === "express" ? (
                          <ExpressIcon />
                        ) : delivery.delivery_type === "scheduled" ? (
                          <ScheduledIcon />
                        ) : (
                          <NextDay />
                        )}
                      </div>

                      <p className="text-nowrap font-semibold">
                        {delivery.code}
                      </p>
                      <p
                        className={`hidden text-nowrap text-sm sm:block ${
                          selectedDelivery?.id === delivery.id
                            ? "text-gray-600"
                            : "text-gray-500"
                        }`}
                      >
                        {delivery.delivery_address}
                      </p>

                      <div className="flex items-center gap-x-3 lg:gap-x-6">
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
                      </div>

                      <div>
                        <p
                          className={`text-sm ${
                            delivery.delivery_status === "Pending"
                              ? "text-yellow-500"
                              : delivery.delivery_status === "Delivered"
                                ? "text-green-500"
                                : "text-gray-500"
                          } ${
                            selectedDelivery?.id === delivery.id
                              ? "font-bold"
                              : ""
                          }`}
                        >
                          {delivery.delivery_status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.total_pages > 1 && (
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      disabled={!pagination.links.previous}
                      className="rounded bg-[#581756] px-4 py-2 text-white disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span>
                      Page {pagination.current_page} of {pagination.total_pages}
                    </span>
                    <button
                      disabled={!pagination.links.next}
                      className="rounded bg-[#581756] px-4 py-2 text-white disabled:opacity-50"
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

        {/* Delivery Details Sidebar */}
        <div className="mt-4 h-full rounded-lg bg-white shadow-sm lg:col-span-2 lg:mt-0">
          <DeliveryDetails delivery={selectedDelivery} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

interface DeliveryDetailsProps {
  delivery: Delivery | null;
}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({ delivery }) => {
  if (!delivery) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-center text-gray-500">
          Select a delivery to view details
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Header with status */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {delivery.code}
          </h3>
          <p className="text-sm text-gray-500">
            {moment(delivery.created_at).format("MMM D, h:mm A")}
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            delivery.delivery_status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : delivery.delivery_status === "In Transit"
                ? "bg-blue-100 text-blue-800"
                : delivery.delivery_status === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
          }`}
        >
          {delivery.delivery_status}
        </span>
      </div>

      {/* Product Summary */}
      <div className="rounded-lg bg-gray-50 p-3">
        <h4 className="text-sm font-medium text-gray-700">Product</h4>
        <div className="mt-1">
          <p className="font-medium">{delivery.product_name}</p>
          <p className="text-sm text-gray-600">
            {delivery.product_description}
          </p>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3">
          <h4 className="text-xs font-medium text-gray-500">From</h4>
          <p className="mt-1 truncate text-sm font-medium">
            {delivery.contact_name}
          </p>
          <p className="truncate text-xs text-gray-500">
            {delivery.pickup_address}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3">
          <h4 className="text-xs font-medium text-gray-500">To</h4>
          <p className="mt-1 truncate text-sm font-medium">
            {delivery.receiver_name}
          </p>
          <p className="truncate text-xs text-gray-500">
            {delivery.delivery_address}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-50 p-3">
        <div className="text-center">
          <p className="text-xs text-gray-500">Type</p>
          <p className="text-sm font-medium capitalize">
            {delivery.delivery_type.replace("_", " ")}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Weight</p>
          <p className="text-sm font-medium">{delivery.weight}kg</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Price</p>
          <p className="text-sm font-medium">₦{delivery.price}</p>
        </div>
      </div>

      {/* Action Buttons (optional) */}
      <div className="flex space-x-2 pt-2">
        <button className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none">
          Track
        </button>
        <button className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none">
          Contact
        </button>
      </div>
    </div>
  );
};
