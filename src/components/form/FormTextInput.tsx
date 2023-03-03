import { ComponentProps, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import FormField, { useFormField, UseFormFieldProps } from "./FormField";

type FormTextInputProps = {
  isRequired?: boolean;
} & UseFormFieldProps &
  Omit<ComponentProps<"input">, "required">;

const FormTextInput = forwardRef<HTMLInputElement, FormTextInputProps>(
  ({ isRequired, ...props }, ref) => {
    const { formFieldProps, childProps } = useFormField(props);
    const { register } = useFormContext();
    return (
      <FormField {...formFieldProps}>
        <input
          type="text"
          className={`rounded-md`}
          {...register(props.name, {
            required: isRequired && "This field is required",
          })}
          {...childProps}
          ref={ref}
        />
      </FormField>
    );
  }
);

export default FormTextInput;
