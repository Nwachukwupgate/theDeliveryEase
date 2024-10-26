import { useState } from "react"
import DeliveryForm from "@/pages/Users/components/DeliveryForm"
import CheckoutCard from "@/pages/Users/components/CheckoutCard"
import PayWith from "@/pages/Users/components/PayWith"
import { DeliveryReq } from "@/types/types"

const DeliveryPage = () => {  
  const [deliveryData, setDeliveryData] = useState<DeliveryReq | null>(null);;
    
  const handleFormSubmit = (data : DeliveryReq) => {
      setDeliveryData(data);
  };

  // const handlePlaceOrder = async () => {
  //     // Make API call to submit deliveryData
  //     try {
  //         // const response = await fetch('/api/orders', {
  //         //     method: 'POST',
  //         //     headers: {
  //         //         'Content-Type': 'application/json',
  //         //     },
  //         //     body: JSON.stringify(deliveryData),
  //         // });
  //         // if (!response.ok) {
  //         //     throw new Error('Network response was not ok');
  //         // }
  //         // Handle successful order placement, e.g., show success message
  //         console.log('Order placed successfully!');
  //     } catch (error) {
  //         console.error('Error placing order:', error);
  //         // Handle error, e.g., show error message
  //     }
  // };

    return (
      <div className="p-6">
          <div className="mb-4">
                <p className="font-bold text-xl">Add Deliveries</p>  
          </div>  

          <div className="grid grid-col-1 lg:grid-cols-7 gap-6">
            
            <div className="col-span-4">
                <DeliveryForm onSubmit={handleFormSubmit}/>
            </div>

            <div className="col-span-3 space-y-8">
              <CheckoutCard deliveryData={deliveryData} />

              <PayWith deliveryData={deliveryData} />
            </div>
          </div>
      </div>
    );
};

export default DeliveryPage;
