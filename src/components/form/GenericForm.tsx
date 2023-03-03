import { ComponentProps } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
} & Omit<ComponentProps<"form">, "onSubmit">;

const GenericForm = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => (
  <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <fieldset disabled={form.formState.isSubmitting}>{children}</fieldset>
    </form>
  </FormProvider>
);

export default GenericForm;
