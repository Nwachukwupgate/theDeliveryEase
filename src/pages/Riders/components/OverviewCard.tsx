// import DeliveryTrackingMap from "@/components/DeliveryTrackingMap";
import { Delivery } from "@/types/types";

type OverviewProps = {
  selectedDelivery: Delivery;
};

const OverviewCard: React.FC<OverviewProps> = ({ selectedDelivery }) => {
  return (
    <div className="">
      <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg">
            Tracking ID:{" "}
            <span className="font-bold">{selectedDelivery.code}</span>
          </h3>
          <span
            className={`rounded-full px-3 py-1 text-sm ${selectedDelivery.delivery_status === "In Transit"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
              }`}
          >
            {selectedDelivery.delivery_status}
          </span>
        </div>

        <div className="my-4 w-full border border-gray-400"></div>

        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-bold">Overview</h3>
          <span className="rounded-full bg-[#DDBCDC] px-3 py-1 text-sm text-[#330E32]">
            {selectedDelivery.delivery_type}
          </span>
        </div>
        {/*   SHOW MAP HERE */}
        {/* <DeliveryTrackingMap
          deliveryId={selectedDelivery.id}
          className="h-[300px] my-4 rounded-lg border border-gray-200"
        /> */}
      </div>

      <div className="mt-8 flex flex-col justify-center gap-x-8">
        <div className="mt-8 rounded-lg bg-white p-4 shadow-md">
          <div>
            <div className="mt-4">
              <h4 className="mb-2 font-bold">Information</h4>
              <p>
                Name:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.contact_name}
                </span>
              </p>
              <p>
                Phone Number:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.contact_phone}
                </span>
              </p>
              <p>
                Receiver Name:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.receiver_name}
                </span>
              </p>
              <p>
                Receiver Number:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.receiver_phone}
                </span>
              </p>
              <p>
                Driver's Name:{" "}
                <span className="ml-2 font-semibold">{`${selectedDelivery.rider?.first_name} ${selectedDelivery?.rider?.last_name}`}</span>
              </p>
              <p>
                Driver's Number:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.rider?.phone}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-white p-4 shadow-md">
          <div>
            <div className="">
              <h4 className="mb-2 font-bold">Product Overview</h4>
              <p>
                Product Name:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.product_name}
                </span>
              </p>
              <p>
                Description:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.product_description}
                </span>
              </p>
              <p>
                Quantity:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.quantity}
                </span>
              </p>
              <p>
                Weight:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.weight}
                </span>
              </p>
              <p>
                Price:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.price}
                </span>
              </p>
              <p>
                Tracking ID:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.code}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;