import { useParams } from "react-router-dom";
import DeliveringCard from "./components/DeliveringCard";
import OverviewCard from "./components/OverviewCard";
import { useGetDeliveryQuery } from "@/api/apiSlice";
import { CircularProgress } from "@mui/material";
import UpdateStatus from "./components/UpdateStatus";
import { DeliveryStatus } from "@/utilities/constants";
import userStore from "@/utilities/stores";
import { useSnapshot } from "valtio";

const RiderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { user } = useSnapshot(userStore)

  if (!id) {
    return <div>Delivery ID is missing.</div>;
  }

  const pageId = parseInt(id);
  const { data, isLoading, isError } = useGetDeliveryQuery(pageId);

  if (!id || isNaN(pageId)) {
    return <div>Invalid delivery ID</div>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !data?.success) {
    return <div>Error loading delivery</div>;
  }

  const deliveryItem = data.data.item;
  if (!deliveryItem) {
    return
  }
  const { product_name, code, delivery_status, created_at, pickup_address } = deliveryItem

  return (
    <div className="p-3 lg:p-6">
      <div className="mb-12 flex justify-between border-b border-gray-400 pb-4">
        <div className="text-lg font-bold">Delivery Details</div>
      </div>

      <div className="my-4 rounded-2xl bg-white p-4">
        <DeliveringCard
          trackingId={`${code}`}
          id={`${id}`}
          delivery={`${product_name}`}
          address={`${pickup_address}`}
          status={`${delivery_status}`}
          date={`${created_at}`}
          selected={true}
          showAction={false}
        />
      </div>

      <div className="">
        <OverviewCard selectedDelivery={deliveryItem} />
      </div>

      <div className="mt-4">
        {delivery_status !== DeliveryStatus.DELIVERED && deliveryItem.rider_id == user?.id && <UpdateStatus />}
      </div>
    </div>
  );
};

export default RiderDetail;