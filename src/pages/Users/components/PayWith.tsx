import React from 'react'
import PaystackIcon from "@/assets/image/paystack.png"


const PayWith: React.FC<{ deliveryData: any }> = ({ deliveryData }) => {
  if (!deliveryData) return null;
  
  return (
    <div className="bg-white p-8 space-y-6">
        <div>
            <p className="font-bold text-xl">Pay With</p>
        </div>

        <div>
            <img className="w-auto lg:h-12 sm:h-7" src={PaystackIcon} alt="Logo" />
        </div>

        <div>
            <p> <span className="font-bold">Please Note:</span> All transactions made on this platform with whichever payment method chosen is highly secured.`</p>
        </div>
    </div>
  )
}

export default PayWith