import { NextPage } from "next";
import { trpc } from "../utils/trpc";
import FormTextInput from "../components/form/FormTextInput";
import {
  categorySchema,
  CategorySchemaType,
  INIT_CATEGORY,
} from "../schemas/category.schema";
import GenericForm from "../components/form/GenericForm";
import { FormikHelpers } from "formik";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import GeneralGrid from "../components/GeneralGrid";
import GenericModal from "../components/GenericModal";

const Categories: NextPage = () => {
  const utils = trpc.useContext();
  const mutation = trpc.category.createCategory.useMutation();

  const columns = useMemo<ColumnDef<CategorySchemaType>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <input
              type="checkbox"
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Category Name",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const { data: categoriesData } = trpc.category.getAll.useQuery();

  const handleFormSubmission = async (
    categoryValues: CategorySchemaType,
    formikHelpers: FormikHelpers<CategorySchemaType>
  ) => {
    try {
      await mutation.mutateAsync(categoryValues, {
        onSuccess: () => utils.invalidate(),
      });
      formikHelpers.resetForm();
    } catch (error) {
      console.log("err", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-12">
        <GenericModal
          visibility={isOpen}
          close={handleClose}
          title="Добави категория"
        >
          <GenericForm<CategorySchemaType>
            initialValues={INIT_CATEGORY}
            validationSchema={categorySchema}
            onSubmit={handleFormSubmission}
          >
            <FormTextInput label="Име на категория" name="name" required />
          </GenericForm>
        </GenericModal>
        <button type="button" onClick={() => setIsOpen(true)}>
          Open modal
        </button>
        <GeneralGrid data={categoriesData || []} columns={columns} />
      </div>
    </Layout>
  );
};

export default Categories;
