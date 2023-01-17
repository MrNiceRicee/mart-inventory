import { HTMLInputTypeAttribute } from "react";

export type TextFieldType = {
  label?: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  name: string;
  required?: boolean;
  onChange?: (...event: any[]) => void;
};

const TextField = ({
  name,
  label,
  placeholder,
  type,
  value,
  required = false,
  onChange,
}: TextFieldType) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        onChange={onChange && onChange}
        required={required}
        value={value}
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
    </div>
  );
};

export default TextField;
