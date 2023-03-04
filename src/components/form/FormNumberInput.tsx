import { useFormikContext } from "formik";
import { FormInputProps } from "./FormTextInput";

const FormNumberInput = ({ name, label, ...props }: FormInputProps) => {
  const { getFieldProps, getFieldMeta } = useFormikContext();
  const showError = getFieldMeta(name).touched && getFieldMeta(name).error;
  return (
    <div className="my-4">
      <label className="mr-3" htmlFor="name">
        {label}
      </label>
      <input
        className={`relative w-full rounded py-2  pr-2 pl-2 text-sm text-black placeholder-gray-400 focus:border-indigo-400 focus:outline-none sm:text-base ${
          showError && "border border-red-500"
        }`}
        type="number"
        {...props}
        {...getFieldProps(name)}
        required={props.isRequired}
      />
      {showError && (
        <p className="mt-1 ml-1 text-xs font-medium tracking-wide text-red-500">
          {getFieldMeta(name).error}
        </p>
      )}
    </div>
  );
};

export default FormNumberInput;
