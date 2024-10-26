import { DeliverySteps } from "@/pages/Users";
import { Delivery } from "@/types/types";
import { useEffect, useState } from "react";

// type Stop = {
//     label: string;
//     location: string;
//     status: string;
//     time: string;
// };

type OverviewProps = {
  selectedDelivery: Delivery | null;
};

const OverviewCard: React.FC<OverviewProps> = ({ selectedDelivery }) => {
  if (!selectedDelivery) {
    return <div className="p-4">Select a delivery to see details.</div>;
  }

  const colors = ["rgba(0, 0, 0, 0.5)", "rgba(255, 0, 0, 0.5)", "rgba(0, 255, 0, 0.5)", "rgba(0, 0, 255, 0.5)"];
  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 4000); // Change color every 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [colors]);

  return (
    <div className="">
      <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg">
            Tracking ID:{" "}
            <span className="font-bold">{selectedDelivery.code}</span>
          </h3>
          <span
            className={`rounded-full px-3 py-1 text-sm ${
              selectedDelivery.delivery_status === "In Transit"
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
            {selectedDelivery.product_name}
          </span>
        </div>

        {/* Map with overlay */}
        <div className="relative mt-4 h-[20rem] w-full rounded-lg">
          {/* Image */}
          <img
            src={"selectedDelivery.mapUrl"}
            alt="Delivery map"
            className="h-full w-full rounded-lg object-cover"
          />

          {/* Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg text-lg font-bold text-white"
            style={{ backgroundColor: currentColor }}
          >
            Coming Soon
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-x-8">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="rounded-lg border border-gray-300 p-4">
            <h4 className="font-bold">Stops</h4>
            <div className="relative mt-6">
              {/* Vertical Line */}
              <div className="absolute left-2.5 top-0 h-full w-px bg-[#581756]"></div>
              <DeliverySteps delivery={selectedDelivery} showExtras={false} />
            </div>
          </div>
        </div>

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
                Reciever Name:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.receiver_name}
                </span>
              </p>
              <p>
                Reciever Number:{" "}
                <span className="ml-2 font-semibold">
                  {selectedDelivery.receiver_phone}
                </span>
              </p>
              <p>
                Driver's Name:{" "}
                <span className="ml-2 font-semibold">{`${selectedDelivery.rider?.first_name} ${selectedDelivery.rider?.last_name}`}</span>
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

      {/* <div className="mt-4 text-center">
        <p>Estimated Time Delivery</p>
        <p className="font-bold">20MINS : 30SECS</p>
      </div> */}
    </div>
  );
};

export default OverviewCard;
