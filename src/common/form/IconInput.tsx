import { FieldError } from "react-hook-form";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any; // For registering the input with react-hook-form
  error?: FieldError; // Error message passed from validation
  icon?: JSX.Element; // Optional prop for an icon
}

const IconInput = ({ label, placeholder, name, type = "text", register, error, icon }: InputProps) => {
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
        <input
          id={name}
          placeholder={placeholder}
          type={type}
          {...register(name)}
          className={`w-full pl-10 pr-3 py-2 border rounded-3xl shadow-sm focus:outline-none bg-primaryActiveColorLight ${
            error ? "border-[#FFDEDE] bg-[#FFDEDE]" : "border-[#000000] bg-white"
          }`}
        />
      </div>
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default IconInput;
