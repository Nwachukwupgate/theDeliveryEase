import { Delivery } from "@/types/types";
import { DeliveryStatus, DeliveryType } from "@/utilities/constants";

interface QuickAccessPanelProps {
    delivery: Delivery;
}

export const QuickAccessPanel: React.FC<QuickAccessPanelProps> = ({ delivery }) => {

    const trackingFlowData = [
        {
            status: "Delivered",
            time: "time"
        },
        {
            status: "Rider is close to your destination",
            time: "time"
        },
        {
            status: "In transit",
            time: "time"
        },
        {
            status: "Rider Assigned",
            time: "time"
        },
        {
            status: "Awaiting Rider",
            time: "time"
        },
        {
            status: "Delivery created",
            time: "time"
        },
    ]

    function getActiveTrackingSteps(delivery: Delivery) {
        const createdAt = new Date(delivery.created_at); // assume your BE sends this
        const now = new Date();
        const minutesSinceCreated = (now.getTime() - createdAt.getTime()) / 60000;

        const steps: { status: string, time?: string }[] = [];

        if (delivery.delivery_status === DeliveryStatus.PENDING) {
            steps.push({ status: "Delivery created", time: createdAt.toLocaleTimeString() });

            if (minutesSinceCreated >= 3) {
                steps.push({ status: "Awaiting Rider", time: new Date(createdAt.getTime() + 3 * 60000).toLocaleTimeString() });
            }
        }

        if (delivery.delivery_status === DeliveryStatus.DISPATCHED) {
            steps.push(
                { status: "Delivery created", time: createdAt.toLocaleTimeString() },
                { status: "Awaiting Rider", time: new Date(createdAt.getTime() + 3 * 60000).toLocaleTimeString() },
                { status: "Rider Assigned", time: createdAt.toLocaleTimeString() }
            );
        }

        if (delivery.delivery_status === DeliveryStatus.IN_TRANSIT) {
            steps.push(
                { status: "Delivery created", time: createdAt.toLocaleTimeString() },
                { status: "Awaiting Rider", time: new Date(createdAt.getTime() + 3 * 60000).toLocaleTimeString() },
                { status: "Rider Assigned", time: "some time" },
                { status: "In transit", time: new Date().toLocaleTimeString() }
            );

            if (minutesSinceCreated >= 5) {
                steps.push({
                    status: "Rider is close to your destination",
                    time: new Date(createdAt.getTime() + 5 * 60000).toLocaleTimeString()
                });
            }
        }

        if (delivery.delivery_status === DeliveryStatus.DELIVERED) {
            steps.push(
                { status: "Delivery created", time: createdAt.toLocaleTimeString() },
                { status: "Awaiting Rider", time: new Date(createdAt.getTime() + 3 * 60000).toLocaleTimeString() },
                { status: "Rider Assigned", time: "some time" },
                { status: "In transit", time: "some time" },
                { status: "Rider is close to your destination", time: "some time" },
                { status: "Delivered", time: new Date().toLocaleTimeString() }
            );
        }

        return steps;
    }


    return (
        <div>
            <h2 className=" mb-4 font-semibold text-sm">{delivery.delivery_status === (DeliveryStatus.DISPATCHED || DeliveryStatus.IN_TRANSIT) ? "Ongoing Delivery" : `${delivery.delivery_status}`}</h2>
            <div className=" overflow-auto h-[80vh]">
                {/* tracking */}
                <div className=" bg-white rounded-3xl p-4 grid gap-y-2 mb-6">
                    <h2 className=" text-sm md:text-base font-medium">Tracking</h2>
                    <div>
                        {
                            trackingFlowData.map(({ status, time }) => <div className=" flex items-baseline gap-x-2">
                                {/* tracking points */}
                                <div className=" flex flex-col  justify-center items-center">
                                    <span className=" bg-primaryColor600 h-[17px] w-[17px] rounded-full"></span>
                                    <span className="bg-primaryColor600 h-[62px] w-[1px]"></span>
                                </div>
                                {/* tracking details */}
                                <div>
                                    <p className=" relative -top-1 font-medium text-sm md:text-base" >{status}</p>
                                    <p className=" text-gray-500 font-medium text-xs">{time}</p>
                                </div>
                            </div>)

                        }
                    </div>
                </div>
                {/* package summary */}
                <div className=" bg-white rounded-3xl p-4 grid gap-y-2 mb-6">
                    <h2 className=" text-sm md:text-base font-medium">Product Overview</h2>
                    <ProductDetail detail={delivery.product_name} title="Product Name" />
                    <ProductDetail detail={delivery.product_description} title="Description" />
                    <ProductDetail detail={delivery.quantity} title="Quantity" />
                    <ProductDetail detail={delivery.weight} title="Weight" />
                    <ProductDetail detail={delivery.price} title="Price" />
                </div>
                {/* package information */}
                <div className=" bg-white rounded-3xl p-4 grid gap-y-2">
                    <h2 className=" text-sm md:text-base font-medium">Information</h2>
                    <ProductDetail detail={delivery.contact_name} title="Name" />
                    <ProductDetail detail={delivery.contact_phone} title="Phone" />
                    <ProductDetail detail={delivery.receiver_name} title="Receiver Name" />
                    <ProductDetail detail={delivery.receiver_phone} title="Receiver Phone" />
                    <ProductDetail detail={delivery.rider?.first_name || ""} title="Rider Name" />
                    <ProductDetail detail={delivery.rider?.phone || ""} title="Rider Phone" />
                </div>
            </div>
        </div>
    )
}


interface ProductDetailProps {
    title: string;
    detail: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ title, detail }) => {
    return (
        <div className=" flex gap-x-3 text-xs md:text-sm">
            <p className=" font-medium text-gray-500 ">{title}:</p>
            <p className=" font-medium">{detail}</p>
        </div>
    );
};