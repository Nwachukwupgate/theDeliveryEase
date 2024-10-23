import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DatePicker from "@/components/ui/datePicker";
import { PaginationComponent } from "./PaginationComponent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SameDay from "../../../common/icons/SameDay";
import ExpressIcon from "../../../common/icons/ExpressIcon";
import ScheduledIcon from "../../../common/icons/ScheduledIcon";
import NextDay from "../../../common/icons/NextDay";

// DataTable accepts data and columns as props
export function DataTable({ data, columns, totalPages, currentPage, setCurrentPage }: { data: any[]; columns: ColumnDef<any>[]; totalPages: number; currentPage: number; setCurrentPage: (page: number) => void; }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [date, setDate] = React.useState<Date | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter tracker..."
          value={(table.getColumn("tracker")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("tracker")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex">
          <div className="mr-2">
            <DatePicker date={date} setDate={setDate} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto flex">
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => {
                    const isStatusCell = cell.column.id === 'status';
                    const isServiceCell = cell.column.id === 'services';
                    const statusValue = cell.getValue() as string;
                    const serviceValue = cell.getValue() as string;

                    let textColor;

                    // Determine text color based on status
                    switch (statusValue) {
                        case 'Pending':
                        textColor = '#F9CB28'; // Yellow color for Pending
                        break;
                        case 'Completed':
                        textColor = '#330E32'; // Dark color for Completed
                        break;
                        case 'Ongoing':
                        textColor = '#4AE150'; // Green color for Ongoing
                        break;
                        default:
                        textColor = '#000000'; // Default to black
                    } // Default to black

                    // Determine the icon based on service type
                    const ServiceIcon = {
                      "Same Day Delivery": SameDay,
                      "Next Day Delivery": NextDay,
                      "Scheduled Delivery": ScheduledIcon,
                      "Express Delivery": ExpressIcon,
                    }[serviceValue] || null; // Default to null if no match

                    return (
                      <TableCell
                        key={cell.id}
                        style={isStatusCell ? { color: textColor } : {}} // Apply color if it's the status cell
                      >
                        {isServiceCell ? (
                          <span style={{ display: 'flex', alignItems: 'center' }}>
                            {ServiceIcon && (
                              <ServiceIcon style={{ marginRight: '8px' }} />
                            )}
                            {serviceValue}
                          </span>
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      
    </div>
  );
}
