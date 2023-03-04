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

const AddProductForm = ({
  close,
  visibility,
}: {
  close: () => void;
  visibility: boolean;
}) => {
  const utils = trpc.useContext();
  const productMutation = trpc.product.createProduct.useMutation();

  const { data: categoriesData } = trpc.category.getAll.useQuery(undefined, {
    enabled: visibility,
    refetchOnWindowFocus: false,
  });

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
    <GenericModal visibility={visibility} close={close}>
      <GenericForm
        initialValues={INIT_PRODUCT}
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

export default AddProductForm;
