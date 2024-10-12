import { FieldError } from "react-hook-form";

interface SelectProps {
  label?: string;
  name: string;
  register: any; // For registering the select with react-hook-form
  error?: FieldError; // Error message passed from validation
  options: { value: string; label: string }[]; // Array of options
  icon?: JSX.Element; // Optional prop for an icon
}

const SelectDropdown = ({ label, name, register, error, options, icon }: SelectProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <div className="relative">
        {/* Icon Container */}
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </span>
        )}
        <select
          id={name}
          {...register(name)}
          className={`w-full pl-10 pr-3 py-2 border rounded-3xl shadow-sm focus:outline-none bg-primaryActiveColorLight ${
            error ? "border-[#FFDEDE] bg-[#FFDEDE]" : "border-gray-300 bg-white"
          }`}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default SelectDropdown;
