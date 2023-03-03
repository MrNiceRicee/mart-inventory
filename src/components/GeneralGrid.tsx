import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type GeneralGridProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

/**
 * A generic grid component used to display data coming from the backend
 *
 * @param {T[]} data - An array of data objects, coming from the BE,
 * that will be displayed in the grid
 * @param {ColumnDef<T>[]} columns - An array of column definitions,
 * that will determine the number of columns and
 * their configuration in the grid
 *
 *
 */
const GeneralGrid = <T,>({ data, columns }: GeneralGridProps<T>) => {
  const table = useReactTable<T>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-3/4 p-2">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) =>
                header.id === "select" ? (
                  <th
                    key={header.id}
                    className="py-3.5 px-4 text-left text-sm font-normal text-gray-500"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ) : (
                  <th
                    key={header.id}
                    className="py-3.5 px-4 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                )
              )}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralGrid;
