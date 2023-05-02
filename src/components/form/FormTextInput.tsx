import { useFormikContext } from "formik";

export type FormInputProps = {
  name: string;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
};

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormTextInput = ({ name, label, placeholder = "" }: FormInputProps) => {
  const { getFieldProps, getFieldMeta } = useFormikContext();
  const showError = getFieldMeta(name).touched && getFieldMeta(name).error;

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">{label}</Label>
      <Input
        {...getFieldProps(name)}
        type="text"
        placeholder={placeholder}
        className={showError ? "ring-1 ring-red-500" : ""}
      />
    </div>
  );
};

export default FormTextInput;
