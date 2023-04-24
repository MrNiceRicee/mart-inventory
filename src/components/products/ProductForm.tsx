import type { FormikHelpers } from "formik";
import {
  productSchema,
  type ProductSchemaType,
} from "../../schemas/product.schema";
import { trpc } from "../../utils/trpc";
import FormAutocomplete from "../form/FormAutocomplete";
import FormNumberInput from "../form/FormNumberInput";
import FormTextInput from "../form/FormTextInput";
import GenericForm from "../form/GenericForm";
import Loader from "../Loader";

type ProductFormProps = {
  values: ProductSchemaType;
  runQuery: boolean;
  productSubmit: (
    value: ProductSchemaType,
    helpers: FormikHelpers<ProductSchemaType>
  ) => Promise<void>;
};

const ProductForm = ({ values, runQuery, productSubmit }: ProductFormProps) => {
  const { data: categoriesData, isLoading: categoriesLoading } =
    trpc.category.getAll.useQuery(undefined, {
      enabled: runQuery,
      refetchOnWindowFocus: false,
    });
  const { data: suppliersData, isLoading: suppliersLoading } =
    trpc.supplier.getAll.useQuery(undefined, {
      enabled: runQuery,
      refetchOnWindowFocus: false,
    });

  return (
    <>
      {(categoriesLoading || suppliersLoading) && <Loader />}
      <GenericForm
        initialValues={values}
        onSubmit={productSubmit}
        validationSchema={productSchema}
      >
        <FormTextInput label="Име на продукт" name="name" required />
        <FormAutocomplete
          label="Категория"
          name="category"
          data={categoriesData || []}
        />
        <FormNumberInput label="Количество" name="quantity" />
        <FormNumberInput label="Цена" name="price" />
        <FormNumberInput label="Цена Рекламна Агенция" name="priceRA" />
        <FormNumberInput label="Цена Краен Купувач" name="priceKK" />
        <FormAutocomplete
          data={suppliersData || []}
          label="Доставчик"
          name="supplier"
        />
        <FormTextInput label="Линк за поръчване" name="orderLink" />
      </GenericForm>
    </>
  );
};

export default ProductForm;
