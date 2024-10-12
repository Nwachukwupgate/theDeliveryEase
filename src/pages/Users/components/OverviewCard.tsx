import { useEffect, useState } from "react";

type Stop = {
    label: string;
    location: string;
    status: string;
    time: string;
};

type OverviewProps = {
  selectedDelivery: {
    id: string;
    status: string;
    delivery: string;
    product: string;
    weight: string;
    trackingId: string;
    stops: Stop[];
    mapUrl: string; // This can be a static image URL or a map component
  } | null;
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
          Tracking ID: <span className="font-bold">{selectedDelivery.trackingId}</span>
        </h3>
        <span
          className={`py-1 px-3 rounded-full text-sm ${
            selectedDelivery.status === "On the way"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {selectedDelivery.status}
        </span>
      </div>

      <div className="w-full border border-gray-400 my-4"></div>

      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-bold">Overview</h3>
        <span className="py-1 px-3 rounded-full text-sm bg-[#DDBCDC] text-[#330E32]">
          {selectedDelivery.delivery}
        </span>
      </div>

      {/* Map with overlay */}
      <div className="relative w-full h-[20rem] mt-4 rounded-lg">
        {/* Image */}
        <img src={selectedDelivery.mapUrl} alt="Delivery map" className="w-full h-full object-cover rounded-lg" />

        {/* Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg rounded-lg"
          style={{ backgroundColor: currentColor }}
        >
          Coming Soon
        </div>
      </div>

        <div className="flex gap-x-8 justify-center mt-8">
            <div>
                <div className="">
                    <h4 className="font-bold mb-2">Product Overview</h4>
                    <p>Product Name: <span className="font-semibold ml-2">{selectedDelivery.product}</span></p>
                    <p>Description: <span className="font-semibold ml-2">{selectedDelivery.product}</span></p>
                    <p>Quantity: <span className="font-semibold ml-2">{selectedDelivery.product}</span></p>
                    <p>Weight: <span className="font-semibold ml-2">{selectedDelivery.product}</span></p>
                    <p>Price: <span className="font-semibold ml-2">{selectedDelivery.product}</span></p>
                    <p>Tracking ID: <span className="font-semibold ml-2">{selectedDelivery.trackingId}</span></p>
                </div>

                <div className="mt-4">
                    <h4 className="font-bold mb-2">Information</h4>
                    <p>Name: <span className="font-semibold ml-2">{selectedDelivery.product}</span></p>
                    <p>Phone Number: <span className="font-semibold ml-2">{selectedDelivery.product}</span></p>
                    <p>Reciever Name: <span className="font-semibold ml-2">{selectedDelivery.product}</span></p>
                    <p>Reciever Number: <span className="font-semibold ml-2">{selectedDelivery.product}</span></p>
                    <p>Driver's Name: <span className="font-semibold ml-2">{selectedDelivery.product}</span></p>
                    <p>Driver's Number: <span className="font-semibold ml-2">{selectedDelivery.product}</span></p>
                </div>               
            </div>

            <div className="border border-gray-300 rounded-lg p-4">
                <h4 className="font-bold">Stops</h4>
                <div className="relative mt-6">
                {/* Vertical Line */}
                    <div className="absolute w-px h-full bg-[#581756] left-2.5 top-0"></div>
                    {selectedDelivery.stops.map((step, index) => (
                        <div key={index} className="relative flex flex-row items-start gap-x-4 mb-4">
                            {/* Step Circle */}
                            <div
                            className={`relative z-10 w-5 h-5 rounded-full  flex items-center justify-center ${
                                step.status === "Done" ? "bg-[#581756]" : "bg-gray-300"
                            }`}
                            style={{ left: '1px' }} // Aligns with the vertical line
                            >
                            
                            </div>

                            {/* Step Details */}
                            <div className="ml-4">
                                <div className="font-semibold">{step.label}</div>               
                            </div>
                        </div>
                    ))}
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
