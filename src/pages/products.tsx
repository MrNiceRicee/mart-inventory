import { ColumnDef, Row } from "@tanstack/react-table";
import { NextPage } from "next";
import { useMemo, useState } from "react";
import GeneralGrid from "../components/GeneralGrid";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import AddProductForm from "../components/products/AddProduct";
import EditProductForm from "../components/products/EditProduct";
import { type RouterOutputs, trpc } from "../utils/trpc";

type ProductGridReturnType = RouterOutputs["product"]["getAll"][number];

const Products: NextPage = () => {
  const columns = useMemo<ColumnDef<ProductGridReturnType>[]>(
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
        header: "Продукт",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "category.name",
        header: "Категория",
        accessorFn: (row) => row.category.name,
      },
      {
        accessorKey: "quantity",
        header: "Количество",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "priceRA",
        header: "Цена Рекламна Агенция",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "priceKK",
        header: "Цена Краен Купувач",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const { data: productsData, isLoading: productLoadingState } =
    trpc.product.getAll.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  const [openAddProduct, setOpenAddProduct] = useState(false);

  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [productId, setProductId] = useState<string | undefined>();

  const handleProductEdit = ({ original }: Row<ProductGridReturnType>) => {
    setProductId(original.id);
    setOpenEditProduct(true);
  };

  return (
    <Layout>
      {productLoadingState && <Loader />}
      <EditProductForm
        id={productId!}
        visibility={openEditProduct}
        close={() => setOpenEditProduct(false)}
      />
      <AddProductForm
        visibility={openAddProduct}
        close={() => setOpenAddProduct(false)}
      />
      <button type="button" onClick={() => setOpenAddProduct(true)}>
        Добави продукт
      </button>
      <GeneralGrid
        data={productsData || []}
        columns={columns}
        onRowClick={handleProductEdit}
      />
    </Layout>
  );
};

export default Products;
