import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

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
      <label className="mr-3" htmlFor={name}>
        {label}
      </label>
      {children}
      {state.error && (
        <ErrorMessage
          errors={state.error}
          name={name}
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />
      )}
    </div>
  );
};

export default FormField;
