import React from 'react';

type DeliveryCardProps = {
  icon: JSX.Element;
  label: string;
  amount: string | number;
  borderClasses?: string;
};

const DeliveryCard: React.FC<DeliveryCardProps> = ({ icon, label, amount, borderClasses = "" }) => {
  return (
    <div className={`flex items-center rounded-lg justify-center flex-col gap-y-6 py-4 px-6 ${borderClasses}`}>
      <div className="bg-[#B57EDC] content-center p-4 rounded-full">
        {icon}
      </div>
      <div>
        <div>{label}</div>
        <div className="font-bold text-base">{amount}</div>
      </div>
    </div>
  );
};

export default DeliveryCard;
