import { Formik, type FormikHelpers, type FormikValues } from "formik";
import type { PropsWithChildren } from "react";
import type { ZodSchema } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Button } from "../ui/button";

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
          <Button
            disabled={!props.isValid || props.isSubmitting}
            className="mt-4"
          >
            Добави
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default GenericForm;
