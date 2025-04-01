import { useState } from "react";
import DeliveryForm from "@/pages/Users/components/DeliveryForm";
import CheckoutCard from "@/pages/Users/components/CheckoutCard";
import PayWith from "@/pages/Users/components/PayWith";
import { DeliveryReq } from "@/types/types";

const DeliveryPage = () => {
  const [deliveryData, setDeliveryData] = useState<DeliveryReq | null>(null);

  console.log(deliveryData);

  const handleFormSubmit = (data: DeliveryReq) => {
    console.log(data);

    setDeliveryData(data);
  };

  return (
    <div className="p-3 lg:p-6">
      <div className="mb-4">
        <p className="text-xl font-bold">Add Deliveries</p>
      </div>

      <div className="grid-col-1 w-full gap-6 lg:grid lg:grid-cols-7">
        <div className="col-span-4">
          <DeliveryForm onSubmit={handleFormSubmit} />
        </div>

        <div className="mt-4 w-full space-y-8 lg:col-span-3 lg:mt-0">
          <div className="w-full">
            {deliveryData && <CheckoutCard deliveryData={deliveryData} />}
          </div>

          <PayWith deliveryData={deliveryData} />
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
