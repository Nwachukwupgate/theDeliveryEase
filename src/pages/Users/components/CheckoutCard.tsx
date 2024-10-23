import React from 'react';
import { Button } from "@mui/material";
import { usePaystackPayment } from 'react-paystack';
import { appToast } from "@/utilities/appToast";
import { useCreateDeliveryMutation } from '@/api/apiSlice';
import { ApiError } from '@/types/types';


const CheckoutCard: React.FC<{ deliveryData: any }> = ({ deliveryData }) => {
    const publicKey = "pk_test_311b7e355abacecbfa3097807660c7109a54659f"
    if (!deliveryData?.name) return null; // Don't render if there's no data

    const config = {
      reference: (new Date()).getTime().toString(),
      email: "user@example.com",
      amount: 20000 * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      publicKey,
    };

    const [createDelivery] = useCreateDeliveryMutation()

    // you can call this function anything
    const onSuccess = async (reference : string) => {
      try{
        const response = await createDelivery({
          contact_name: deliveryData?.name,
          contact_phone: deliveryData?.phoneNumber,
          receiver_name: deliveryData?.recieverName,
          receiver_phone: deliveryData?.recieverNumber,
          pickup_address: deliveryData?.pickupAddress,
          delivery_address: deliveryData?.deliveryAddress,
          delivery_type: deliveryData?.phoneNumber,
          product_name: deliveryData?.productName,
          product_description: deliveryData?.productDescription,
          weight: deliveryData?.weight,
          quantity: deliveryData?.quantity,
        }).unwrap(); 
        console.log("response", response)     
        appToast.Success(response?.message);
      } catch (error) {
        const typedError = error as ApiError;   
        const errorMessage = typedError?.data?.message || "Failed. Please try again.";     
        appToast.Error(errorMessage)
      }
      console.log(reference);
    };

    // you can call this function anything
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    const initializePayment = usePaystackPayment(config);

    return (
        <div className="bg-white p-8">
            <div className="space-y-8">
                <p className="font-bold text-xl">Summary</p>
                <div className="flex flex-col gap-y-4">
                    <div className="flex gap-4"><p>Product Name</p> <p className="font-bold">{deliveryData?.productName}</p></div>
                    <div className="flex gap-4"><p>Description</p> <p className="font-bold">{deliveryData?.productDescription}</p></div>
                    <div className="flex gap-4"><p>Quantity</p> <p className="font-bold">{deliveryData?.quantity}</p></div>
                    <div className="flex gap-4"><p>Weight</p> <p className="font-bold">{deliveryData?.weight}</p></div>
                    <div className="flex gap-4"><p>Delivery Type</p> <p className="font-bold"><span className="py-1 px-3 rounded-full text-sm bg-[#DDBCDC] text-[#330E32]">
                        {deliveryData?.deliveryType}
                      </span></p>
                    </div>
                    <div className="flex gap-4"><p>Pickup Address</p> <p className="font-bold">{deliveryData?.pickupAddress}</p></div>
                    <div className="flex gap-4"><p>Delivery Address</p> <p className="font-bold">{deliveryData?.deliveryAddress}</p></div>
                </div>
                <Button 
                  fullWidth 
                  type="submit" 
                  variant="contained"
                  onClick={() => {
                    initializePayment({onSuccess, onClose})
                  }}
                  disabled={!deliveryData}  // Disable the button while loading
                >
                  Place Order
              </Button>
            </div>
            
        </div>
    );
};

export default CheckoutCard;
