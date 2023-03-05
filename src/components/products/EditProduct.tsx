import { FormikHelpers } from "formik";
import {
  INIT_PRODUCT,
  productSchema,
  ProductSchemaType,
} from "../../schemas/product.schema";
import { trpc } from "../../utils/trpc";
import FormAutocomplete from "../form/FormAutocomplete";
import FormNumberInput from "../form/FormNumberInput";
import FormTextInput from "../form/FormTextInput";
import GenericForm from "../form/GenericForm";
import GenericModal from "../GenericModal";
import Loader from "../Loader";

const EditProductForm = ({
  id,
  close,
  visibility,
}: {
  id: string;
  close: () => void;
  visibility: boolean;
}) => {
  const { data: categoriesData, isLoading: categoriesLoading } =
    trpc.category.getAll.useQuery(undefined, {
      enabled: visibility,
      refetchOnWindowFocus: false,
    });

  const { data: product, isLoading: productsLoading } =
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
      {(categoriesLoading ||
        productMutationLoading ||
        (productsLoading && !product)) && <Loader />}
      <GenericForm<ProductSchemaType>
        initialValues={product!}
        onSubmit={handleFormSubmission}
        validationSchema={productSchema}
      >
        <FormTextInput label="Име на продукт" name="name" required />
        <FormAutocomplete
          label="Категория"
          name="category"
          data={categoriesData || []}
        />
        <FormNumberInput label="Количество" name="quantity" />
        <FormNumberInput label="Цена Рекламна Агенция" name="priceRA" />
        <FormNumberInput label="Цена Краен Купувач" name="priceKK" />
        <FormTextInput label="Линк за поръчване" name="orderLink" />
      </GenericForm>
    </GenericModal>
  );
};

export default EditProductForm;
