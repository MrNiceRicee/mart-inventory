import { ComponentProps, forwardRef } from "react";
import FormField, { useFormField, UseFormFieldProps } from "./FormField";

type FormTextInputProps = {} & UseFormFieldProps & ComponentProps<"input">;

const FormTextInput = forwardRef<HTMLInputElement, FormTextInputProps>(
  (props, ref) => {
    const { formFieldProps, childProps } = useFormField(props);
    return (
      <FormField {...formFieldProps}>
        <input {...childProps} ref={ref} />
      </FormField>
    );
  }
);

export default FormTextInput;
