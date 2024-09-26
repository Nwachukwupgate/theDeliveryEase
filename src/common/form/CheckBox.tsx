import React from "react";

interface CheckboxProps {
  id: string;
  label: string;
  register: any;
}

const CheckBox: React.FC<CheckboxProps> = ({ id, label, register }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        {...register(id)}
        className="mr-2 h-4 w-4 border border-gray-500 checked:bg-pink-500 checked:border-pink-500 focus:ring-pink-500"
      />
      <label htmlFor={id} className="text-sm font-bold text-gray-600">
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
