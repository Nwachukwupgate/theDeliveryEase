import { useParams } from "react-router-dom";
import { useGetDeliveryQuery } from "@/api/apiSlice";
import { CircularProgress } from "@mui/material";
import UpdateStatus from "./components/UpdateStatus";
import { DeliveryStatus } from "@/utilities/constants";
import userStore from "@/utilities/stores";
import { useSnapshot } from "valtio";
import { DeliveryDetailsPanel } from "../Users/components/deliveryDetailsPanel";

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

  return (
    <section>
      <DeliveryDetailsPanel delivery={deliveryItem} />
      <div className="mt-4">
        {deliveryItem.delivery_status !== DeliveryStatus.DELIVERED && deliveryItem.rider_id == user?.id && <UpdateStatus />}
      </div>
    </section>
  );
};

export default RiderDetail;