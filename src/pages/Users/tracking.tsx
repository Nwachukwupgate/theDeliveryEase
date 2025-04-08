import { useParams } from "react-router-dom";
import { useGetDeliveryQuery } from "@/api/apiSlice";
import DriverLocationUpdater from "@/components/tracker/driverLocationUpdater";
import { DeliveryTracker } from "@/components/tracker/DeliveryTracker";
import userStore from "@/utilities/stores";
import { useSnapshot } from "valtio";
import { DeliveryStatus } from "@/utilities/constants";

const TrackingPage = () => {
  const { trackingId } = useParams<{ trackingId: string }>();

  const deliveryId = Number(trackingId);
  const { user, userType } = useSnapshot(userStore);

  // Get delivery data to check if current user is the assigned rider
  const { data: delivery } = useGetDeliveryQuery(deliveryId);

  // Determine if current user should see driver controls
  const shouldShowDriverControls = () => {
    // User must be a rider
    if (userType !== 'rider') return false;

    // Either:
    // 1. Is the assigned rider for this delivery
    return (
      delivery?.data?.item?.rider?.id === user?.id
    );
  };

  // Check if delivery is in transit
  const isInTransit = delivery?.data?.item?.delivery_status === DeliveryStatus.IN_TRANSIT;

  if (!isInTransit) {
    return (
      <div className="tracking-page">
        <p>This delivery is not in transit and cannot be tracked.</p>
      </div>
    );
  }

  return (
    <div className="tracking-page">
      {shouldShowDriverControls() && (
        <DriverLocationUpdater deliveryId={deliveryId} />
      )}

      <DeliveryTracker deliveryId={deliveryId} />
    </div>
  );
};

export default TrackingPage;