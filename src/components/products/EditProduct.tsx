import { ProductSchemaType } from "../../schemas/product.schema";
import { trpc } from "../../utils/trpc";
import GenericModal from "../GenericModal";
import Loader from "../Loader";
import ProductForm from "./ProductForm";

const EditProductForm = ({
  id,
  close,
  visibility,
}: {
  id: string;
  close: () => void;
  visibility: boolean;
}) => {
  const { data: productData, isLoading: productsLoading } =
    trpc.product.getProduct.useQuery(id, {
      enabled: visibility,
      refetchOnWindowFocus: false,
    });

  const { mutateAsync, isLoading: productMutationLoading } =
    trpc.product.updateProduct.useMutation();
  const utils = trpc.useContext();

  const handleFormSubmission = async (productValues: ProductSchemaType) => {
    try {
      await mutateAsync(productValues, {
        onSuccess: () => utils.invalidate(),
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <GenericModal visibility={visibility} close={close}>
      {(productMutationLoading || productsLoading) && <Loader />}
      <ProductForm
        values={productData}
        runQuery={visibility}
        productSubmit={handleFormSubmission}
      />
    </GenericModal>
  );
};

export default EditProductForm;
