import React from 'react';
import { Button } from "@mui/material";


const CheckoutCard: React.FC<{ deliveryData: any }> = ({ deliveryData }) => {
    if (!deliveryData) return null; // Don't render if there's no data

    return (
        <div className="bg-white p-8">
            <div className="space-y-8">
                <p className="font-bold text-xl">Summary</p>
                <div className="flex flex-col gap-y-4">
                    <div className="flex gap-4"><p>Product Name</p> <p className="font-bold">{deliveryData.productName}</p></div>
                    <div className="flex gap-4"><p>Description</p> <p className="font-bold">{deliveryData.productDescription}</p></div>
                    <div className="flex gap-4"><p>Quantity</p> <p className="font-bold">{deliveryData.quantity}</p></div>
                    <div className="flex gap-4"><p>Weight</p> <p className="font-bold">{deliveryData.weight}</p></div>
                    <div className="flex gap-4"><p>Delivery Type</p> <p className="font-bold"><span className="py-1 px-3 rounded-full text-sm bg-[#DDBCDC] text-[#330E32]">
                        Next Day Delivery
                      </span></p>
                    </div>
                    <div className="flex gap-4"><p>Pickup Address</p> <p className="font-bold">{deliveryData.pickupAddress}</p></div>
                    <div className="flex gap-4"><p>Delivery Address</p> <p className="font-bold">{deliveryData.deliveryAddress}</p></div>
                </div>
                <Button 
                  fullWidth 
                  type="submit" 
                  variant="contained"
                  // disabled={isLoading}  // Disable the button while loading
                >
                  Place Order
              </Button>
            </div>
            
        </div>
    );
};

export default CheckoutCard;
