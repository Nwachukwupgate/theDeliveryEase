import { FieldError } from "react-hook-form";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any; // For registering the input with react-hook-form
  error?: FieldError; // Error message passed from validation
}

const Input = ({ label, placeholder, name, type = "text", register, error }: InputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        {...register(name)}
        className={`w-full px-3 py-2 border rounded-3xl shadow-sm focus:outline-none bg-primaryActiveColorLight ${
          error ? "border-[#FFDEDE] bg-[#FFDEDE]" : "border-gray-300 bg-primaryActiveColorLight"
        }`}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};

export default Input;
