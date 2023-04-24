import { useFormikContext } from "formik";
import type { FormInputProps } from "./FormTextInput";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormNumberInput = ({ name, label, placeholder = "" }: FormInputProps) => {
  const { getFieldProps, getFieldMeta } = useFormikContext();
  const showError = getFieldMeta(name).touched && getFieldMeta(name).error;
  return (
    <div className="my-4">
      <Label htmlFor="email">{label}</Label>
      <Input
        {...getFieldProps(name)}
        type="number"
        placeholder={placeholder}
        className={showError ? "border border-red-500" : ""}
      />
    </div>
  );
};

export default FormNumberInput;
