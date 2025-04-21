import React from 'react';

type DeliveryTypeButtonsProps = {
  icon: JSX.Element;
  label: string;
  borderClasses?: string;
};

const DeliveryTypeButtons: React.FC<DeliveryTypeButtonsProps> = ({ icon, label, borderClasses = "" }) => {
  return (
    <div className={`min-w-[75px] flex items-center rounded-2xl shadow-sm justify-center flex-col gap-2 px-2 py-4 ${borderClasses}`}>
      <div className="bg-[#B57EDC] bg-opacity-30 h-[33px] w-[33px] grid place-items-center  rounded-full">
        {icon}
      </div>
      <div className="font-medium text-[8px] mx-auto text-[#330E32]">
        <p>{label}</p>
        <p>Delivery</p>
      </div>
    </div>
  );
};

export default DeliveryTypeButtons;
