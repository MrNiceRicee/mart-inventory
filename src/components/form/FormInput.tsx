import { ComponentProps, forwardRef } from "react";
import FormField, { FormFieldProps, useFormField } from "./FormField";

type FormTextInputProps = {} & FormFieldProps & ComponentProps<"input">;

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
