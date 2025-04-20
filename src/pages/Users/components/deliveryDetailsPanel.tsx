import { Delivery } from "@/types/types";
import { DeliveryStatus } from "@/utilities/constants";

interface QuickAccessPanelProps {
    delivery: Delivery;
}

export const DeliveryDetailsPanel: React.FC<QuickAccessPanelProps> = ({ delivery }) => {

    // Helper function to format time
    const formatTime = (dateString: string | null) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Calculate all possible statuses with their timestamps
    const getTrackingFlowData = () => {
        const flow = [];

        // Always show creation
        flow.push({
            status: "Delivery created",
            time: formatTime(delivery.created_at),
            isCurrent: false,
            timestamp: new Date(delivery.created_at).getTime()
        });

        // Check if we should show "Awaiting Rider" (always show if time condition is met)
        if (delivery.created_at) {
            const createdAt = new Date(delivery.created_at);
            const threeMinutesLater = new Date(createdAt.getTime() + 3 * 60 * 1000);
            const now = new Date();

            if (now >= threeMinutesLater) {
                flow.push({
                    status: "Awaiting Rider",
                    time: formatTime(threeMinutesLater.toISOString()),
                    isCurrent: delivery.delivery_status === DeliveryStatus.PENDING && !delivery.rider_id,
                    timestamp: threeMinutesLater.getTime()
                });
            }
        }

        // Rider assigned (dispatched)
        if (delivery.rider_id && delivery.dispatched_at) {
            flow.push({
                status: "Rider Assigned",
                time: formatTime(delivery.dispatched_at),
                isCurrent: delivery.delivery_status === DeliveryStatus.DISPATCHED,
                timestamp: new Date(delivery.dispatched_at).getTime()
            });
        }

        // In transit and "Rider is close" statuses
        if (delivery.in_transit_at) {
            const inTransitTime = new Date(delivery.in_transit_at);
            const fiveMinutesLater = new Date(inTransitTime.getTime() + 5 * 60 * 1000);
            const now = new Date();

            // Always show "In Transit"
            flow.push({
                status: "In Transit",
                time: formatTime(delivery.in_transit_at),
                isCurrent: delivery.delivery_status === DeliveryStatus.IN_TRANSIT && now < fiveMinutesLater,
                timestamp: inTransitTime.getTime()
            });

            // Always show "Rider is close" if time condition is met
            if (now >= fiveMinutesLater && delivery.delivery_status !== DeliveryStatus.DELIVERED) {
                flow.push({
                    status: "Rider is close to your destination",
                    time: formatTime(fiveMinutesLater.toISOString()),
                    isCurrent: delivery.delivery_status === DeliveryStatus.IN_TRANSIT,
                    timestamp: fiveMinutesLater.getTime()
                });
            }
        }

        // Delivered
        if (delivery.delivered_at) {
            flow.push({
                status: "Delivered",
                time: formatTime(delivery.delivered_at),
                isCurrent: true,
                timestamp: new Date(delivery.delivered_at).getTime()
            });
        }

        // Cancelled
        if (delivery.cancelled_at) {
            flow.push({
                status: "Cancelled",
                time: formatTime(delivery.cancelled_at),
                isCurrent: true,
                timestamp: new Date(delivery.cancelled_at).getTime()
            });
        }

        // Sort by timestamp
        const sortedFlow = flow.sort((a, b) => a.timestamp - b.timestamp);

        // Ensure only one status is marked as current
        let currentFound = false;
        return sortedFlow.map(item => {
            // If we haven't found a current status yet and this one is marked as current
            if (!currentFound && item.isCurrent) {
                currentFound = true;
                return { ...item, isCurrent: true };
            }
            return { ...item, isCurrent: false };
        });
    };

    const trackingFlowData = getTrackingFlowData();

    return (
        <div>
            <h2 className="mb-4 font-semibold text-sm lg:hidden">
                {delivery.delivery_status === DeliveryStatus.DISPATCHED ||
                    delivery.delivery_status === DeliveryStatus.IN_TRANSIT
                    ? "Ongoing Delivery"
                    : delivery.delivery_status}
            </h2>
            <div className="overflow-auto">
                {/* tracking */}
                <div className="bg-white rounded-3xl p-4 grid gap-y-2 mb-6">
                    <h2 className="text-sm md:text-base font-medium">Tracking</h2>
                    <div>
                        {trackingFlowData.map(({ status, time, isCurrent }, index) => (
                            <div key={`${status}-${index}`} className="flex items-baseline gap-x-2">
                                {/* tracking points */}
                                <div className="flex flex-col justify-center items-center">
                                    <span
                                        className={`h-[14px] w-[14px] rounded-full ${isCurrent ? "bg-primaryColor600" : "bg-gray-300"
                                            }`}
                                    ></span>
                                    {index !== trackingFlowData.length - 1 && (
                                        <span
                                            className={`h-[62px] w-[1px] ${isCurrent ? "bg-primaryColor600" : "bg-gray-300"
                                                }`}
                                        ></span>
                                    )}
                                </div>
                                {/* tracking details */}
                                <div>
                                    <p
                                        className={`relative -top-1 text-xs md:text-sm ${isCurrent ? "font-medium text-black" : "text-gray-500"
                                            }`}
                                    >
                                        {status}
                                    </p>
                                    <p className="text-gray-500 font-medium text-[10px]">{time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* package summary */}
            <div className="bg-white rounded-3xl p-4 grid gap-y-2 mb-6">
                <h2 className="text-sm md:text-base font-medium">Product Overview</h2>
                <ProductDetail detail={delivery.product_name} title="Product Name" />
                <ProductDetail detail={delivery.product_description} title="Description" />
                <ProductDetail detail={delivery.quantity} title="Quantity" />
                <ProductDetail detail={delivery.weight} title="Weight" />
                <ProductDetail detail={delivery.price} title="Price" />
            </div>

            {/* package information */}
            <div className="bg-white rounded-3xl p-4 grid gap-y-2">
                <h2 className="text-sm md:text-base font-medium">Information</h2>
                <ProductDetail detail={delivery.contact_name} title="Name" />
                <ProductDetail detail={delivery.contact_phone} title="Phone" />
                <ProductDetail detail={delivery.receiver_name} title="Receiver Name" />
                <ProductDetail detail={delivery.receiver_phone} title="Receiver Phone" />
                <ProductDetail detail={delivery.rider?.first_name || ""} title="Rider Name" />
                <ProductDetail detail={delivery.rider?.phone || ""} title="Rider Phone" />
            </div>
        </div>
    );
};

interface ProductDetailProps {
    title: string;
    detail: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ title, detail }) => {
    return (
        <div className="flex gap-x-3 text-xs md:text-sm">
            <p className="font-medium text-gray-500">{title}:</p>
            <p className="font-medium">{detail}</p>
        </div>
    );
};