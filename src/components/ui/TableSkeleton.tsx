import { Skeleton } from "@mui/material";
import DataTable from "../../pages/Admin/components/DataTable"
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type tableProps<T> = {
  columns: ColumnDef<T, any>[];
};

export default function TableLoading<T>({ columns }: tableProps<T>) {
  const table = useReactTable({
    columns,
    data: [],
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable<T> table={table} />
      <div>
        {new Array(5).fill(undefined).map((_, index) => {
          return (
            <Skeleton
                key={`table-skeleton-${index}`}  // Corrected string template for the key
                sx={{ width: "100%", height: "70px", borderRadius: "0px" }}
            />
          );
        })}
      </div>
    </>
  );
}