import { Formik, type FormikHelpers, type FormikValues } from "formik";
import type { PropsWithChildren } from "react";
import type { ZodSchema } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import SubmitButton from "./SubmitButton";

type GenericFormProps<T> = {
  initialValues: T;
  validationSchema: ZodSchema;
  onSubmit: (_attrVals: T, _formikHelpers: FormikHelpers<T>) => Promise<void>;
} & PropsWithChildren;

const GenericForm = <T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}: GenericFormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validationSchema)}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          {children}
          <SubmitButton
            disabled={!props.isValid || props.isSubmitting}
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 disabled:bg-gray-500"
          >
            Добави
          </SubmitButton>
        </form>
      )}
    </Formik>
  );
};

export default GenericForm;
