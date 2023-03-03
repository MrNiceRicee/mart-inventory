import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

export type UseFormFieldProps = {
  name: string;
  label: string;
} & PropsWithChildren;

export const useFormField = <P extends UseFormFieldProps>(props: P) => {
  const { label, name, ...otherProps } = props;
  const id = name;

  return {
    formFieldProps: { id, name, label },
    childProps: { ...otherProps, id, name },
  };
};

export type FormFieldProps = {
  id: string;
} & UseFormFieldProps;

const FormField = ({ children, name, label }: FormFieldProps) => {
  const { getFieldState, formState } = useFormContext();
  const state = getFieldState(name, formState);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {children}
      {state.error && <p>{state.error.message}</p>}
    </div>
  );
};

export default FormField;
