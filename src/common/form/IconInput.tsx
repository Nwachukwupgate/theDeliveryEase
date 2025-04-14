import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  icon?: JSX.Element;
  showPasswordToggle?: boolean;
  className?: string;
  disabled?: boolean;
  rules?: RegisterOptions;
}

const IconInput = ({
  label,
  placeholder,
  name,
  type = "text",
  register,
  error,
  icon,
  showPasswordToggle = false,
  className = "",
  disabled = false,
  rules = {}
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

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
          type={inputType}
          disabled={disabled}
          {...register(name, rules)}
          className={`w-full rounded-3xl border px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${icon ? 'pl-10' : ''} ${error
              ? "border-error bg-errorBg placeholder-errorLight"
              : "border-gray-300 bg-primaryActiveColorLight hover:border-gray-400"
            } ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
          aria-invalid={error ? "true" : "false"}
        />

        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <VisibilityOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Visibility className="h-5 w-5 text-gray-500" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 mt-1 text-sm" id={`${name}-error`}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default IconInput;