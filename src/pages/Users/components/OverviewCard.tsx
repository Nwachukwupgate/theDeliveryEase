import { Delivery } from "@/types/types";
import { useEffect, useState } from "react";
import { DeliverySteps } from "..";

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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg">
          Tracking ID: <span className="font-bold">{selectedDelivery.code}</span>
        </h3>
        <span
          className={`py-1 px-3 rounded-full text-sm ${
            selectedDelivery.delivery_status === "ongoing"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {selectedDelivery.delivery_status}
        </span>
      </div>

      <div className="w-full border border-gray-400 my-4"></div>

      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-bold">Overview</h3>
        <span className="py-1 px-3 rounded-full text-sm bg-[#DDBCDC] text-[#330E32]">
          {selectedDelivery.delivery_address}
        </span>
      </div>

      {/* Map with overlay */}
      <div className="relative w-full h-[20rem] mt-4 rounded-lg">
        {/* Image */}
        <img src={'selectedDelivery.mapUrl'} alt="Delivery map" className="w-full h-full object-cover rounded-lg" />

        {/* Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg rounded-lg"
          style={{ backgroundColor: currentColor }}
        >
          Coming Soon
        </div>
      </div>

        <div className="flex flex-col lg:flex-row gap-x-8 justify-center mt-8">
            <div>
                <div className="">
                    <h4 className="font-bold mb-2">Product Overview</h4>
                    <p>Product Name: <span className="font-semibold ml-2">{selectedDelivery.product_name}</span></p>
                    <p>Description: <span className="font-semibold ml-2">{selectedDelivery.product_description}</span></p>
                    <p>Quantity: <span className="font-semibold ml-2">{selectedDelivery.quantity}</span></p>
                    <p>Weight: <span className="font-semibold ml-2">{selectedDelivery.weight}</span></p>
                    <p>Price: <span className="font-semibold ml-2">{selectedDelivery.price}</span></p>
                    <p>Tracking ID: <span className="font-semibold ml-2">{selectedDelivery.code}</span></p>
                </div>

                <div className="mt-4">
                    <h4 className="font-bold mb-2">Information</h4>
                    <p>Name: <span className="font-semibold ml-2">{selectedDelivery.contact_name}</span></p>
                    <p>Phone Number: <span className="font-semibold ml-2">{selectedDelivery.contact_phone}</span></p>
                    <p>Reciever Name: <span className="font-semibold ml-2">{selectedDelivery.receiver_name}</span></p>
                    <p>Reciever Number: <span className="font-semibold ml-2">{selectedDelivery.receiver_phone}</span></p>
                    {
                      selectedDelivery?.rider ? (
                        <>
                        <p>Driver's Name: <span className="font-semibold ml-2">{`${selectedDelivery.rider?.first_name} ${selectedDelivery.rider?.last_name}` }</span></p>
                        <p>Driver's Number: <span className="font-semibold ml-2">{selectedDelivery.rider?.phone}</span></p>
                        </>
                      ) : <></>
                    }
                </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-4 mt-4 lg:mt-0">
                <h4 className="font-bold">Stops</h4>
                <div className="relative mt-6">
                {/* Vertical Line */}
                    <div className="absolute w-px h-full bg-[#581756] left-2.5 top-0"></div>
                    <DeliverySteps showExtras={false} delivery={selectedDelivery} />
                </div>
            </div>
        </div>

        <div className="text-center mt-4">
            <p>Estimated Time Delivery</p>
            <p className="font-bold">20MINS : 30SECS</p>
        </div>
    </div>
  );
};

export default OverviewCard;
