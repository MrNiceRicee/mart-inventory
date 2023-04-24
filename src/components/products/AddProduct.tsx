import type { FormikHelpers } from "formik";
import {
  INIT_PRODUCT,
  type ProductSchemaType,
} from "../../schemas/product.schema";
import { trpc } from "../../utils/trpc";
import GenericModal from "../GenericModal";
import ProductForm from "./ProductForm";

const AddProductForm = ({
  close,
  visibility,
}: {
  close: () => void;
  visibility: boolean;
}) => {
  const utils = trpc.useContext();
  const productMutation = trpc.product.createProduct.useMutation();

  const handleFormSubmission = async (
    productValues: ProductSchemaType,
    formikHelpers: FormikHelpers<ProductSchemaType>
  ) => {
    try {
      await productMutation.mutateAsync(productValues, {
        onSuccess: () => utils.invalidate(),
      });
      formikHelpers.resetForm();
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <GenericModal title="Добави продукт" visibility={visibility} close={close}>
      <ProductForm
        values={INIT_PRODUCT}
        runQuery={visibility}
        productSubmit={handleFormSubmission}
      />
    </GenericModal>
  );
};

export default AddProductForm;
