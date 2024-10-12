// import * as React from "react"
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"
// import SameDay from "../../../common/icons/SameDay"
// import ExpressIcon from "../../../common/icons/ExpressIcon"
// import ScheduledIcon from "../../../common/icons/ScheduledIcon"
// import NextDay from "../../../common/icons/NextDay"
// import FilterIcon from "../../../common/icons/FilterIcon"
// import DatePicker from "@/components/ui/datePicker"
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// const data: Payment[] = [
//   {
//     id: "m5gr84i9",
//     tracker: "AZ34KLO900",
//     services: "Same Day Delivery",
//     product: "success",
//     weight: "3kg",
//     date: "Feb 13th 2025",
//     status: "Completed"
//   },
//   {
//     id: "3u1reuv4",
//     tracker: "AZ34KLO900",
//     services: "Next Day Delivery",
//     product: "success",
//     weight: "3kg",
//     date: "Feb 13th 2025",
//     status: "Ongoing"
//   },
//   {
//     id: "derv1ws0",
//     tracker: "AZ34KLO900",
//     services: "Scheduled Delivery",
//     product: "success",
//     weight: "3kg",
//     date: "Feb 13th 2025",
//     status: "Ongoing"
//   },
//   {
//     id: "5kma53ae",
//     tracker: "AZ34KLO900",
//     services: "Express Delivery",
//     product: "success",
//     weight: "3kg",
//     date: "Feb 13th 2025",
//     status: "Pending"
//   },
//   {
//     id: "bhqecj4p",
//     tracker: "AZ34KLO900",
//     services: "Same Day Delivery",
//     product: "success",
//     weight: "3kg",
//     date: "Feb 13th 2025",
//     status: "Ongoing"
//   },
// ]

// export type Payment = {
//   id: string,
//   tracker: string,
//   services: string ,
//   product: string,
//   weight: string,
//   date: string,
//   status: "Pending" | "Completed" | "Ongoing"
// }

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "tracker",
//     header: "Tracking Number",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("tracker")}</div>
//     ),
//   },
//   {
//     accessorKey: "services",
//     header: "Services",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("services")}</div>
//     ),
//   },
//   {
//     accessorKey: "product",
//     header: "Product",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("product")}</div>
//     ),
//   },
//   {
//     accessorKey: "weight",
//     header: "Weight",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("weight")}</div>
//     ),
//   },
//   {
//     accessorKey: "date",
//     header: "Date",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("date")}</div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("status")}</div>
//     ),
//   },
// //   {
// //     accessorKey: "email",
// //     header: ({ column }) => {
// //       return (
// //         <Button
// //           variant="ghost"
// //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
// //         >
// //           Email
// //           <ArrowUpDown className="ml-2 h-4 w-4" />
// //         </Button>
// //       )
// //     },
// //     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
// //   },
// //   {
// //     accessorKey: "amount",
// //     header: () => <div className="text-right">Amount</div>,
// //     cell: ({ row }) => {
// //       const amount = parseFloat(row.getValue("amount"))

// //       // Format the amount as a dollar amount
// //       const formatted = new Intl.NumberFormat("en-US", {
// //         style: "currency",
// //         currency: "USD",
// //       }).format(amount)

// //       return <div className="text-right font-medium">{formatted}</div>
// //     },
// //   },
// //   {
// //     id: "actions",
// //     enableHiding: false,
// //     cell: ({ row }) => {
// //       const payment = row.original

// //       return (
// //         <DropdownMenu>
// //           <DropdownMenuTrigger asChild>
// //             <Button variant="ghost" className="h-8 w-8 p-0">
// //               <span className="sr-only">Open menu</span>
// //               <MoreHorizontal className="h-4 w-4" />
// //             </Button>
// //           </DropdownMenuTrigger>
// //           <DropdownMenuContent align="end">
// //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
// //             <DropdownMenuItem
// //               onClick={() => navigator.clipboard.writeText(payment.id)}
// //             >
// //               Copy payment ID
// //             </DropdownMenuItem>
// //             <DropdownMenuSeparator />
// //             <DropdownMenuItem>View customer</DropdownMenuItem>
// //             <DropdownMenuItem>View payment details</DropdownMenuItem>
// //           </DropdownMenuContent>
// //         </DropdownMenu>
// //       )
// //     },
// //   },
// ]

// export function DataTable() {
//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({})
//   const [rowSelection, setRowSelection] = React.useState({})

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   })
//   const [date, setDate] = React.useState<Date | null>(null);

//   return (
//     <div className="w-full">
//       <div className="flex items-center justify-between py-4">
//         <Input
//           placeholder="Filter emails..."
//           value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
//           onChange={(event) =>
//             table.getColumn("email")?.setFilterValue(event.target.value)
//           }
//           className="max-w-sm"
//         />
//         <div className="flex">
//             <DatePicker date={date} setDate={setDate}/>

//             <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="ml-auto flex">
//                 <p> <FilterIcon className="mr-2 mt-4" />  </p>  <p>Filters</p>
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//                 {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                     return (
//                     <DropdownMenuCheckboxItem
//                         key={column.id}
//                         className="capitalize"
//                         checked={column.getIsVisible()}
//                         onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                         }
//                     >
//                         {column.id}
//                     </DropdownMenuCheckboxItem>
//                     )
//                 })}
//             </DropdownMenuContent>
//             </DropdownMenu> 
//         </div>      
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   )
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
//                     {row.getVisibleCells().map((cell) => {
//                         const isStatusCell = cell.column.id === 'status';
//                         const isServiceCell = cell.column.id === 'services';
                        
//                         // Cast the values to string, as you know these are strings
//                         const statusValue = cell.getValue() as string;
//                         const serviceValue = cell.getValue() as string;

//                         let textColor;

//                         // Apply conditional text color based on the status value
//                         switch (statusValue) {
//                             case 'Pending':
//                             textColor = '#F9CB28'; // Yellow color for Pending
//                             break;
//                             case 'Completed':
//                             textColor = '#330E32'; // Dark color for Completed
//                             break;
//                             case 'Ongoing':
//                             textColor = '#4AE150'; // Green color for Ongoing
//                             break;
//                             default:
//                             textColor = '#000000'; // Default to black
//                         }

//                         // Determine which icon to display based on the service type
//                         let ServiceIconComponent;
//                         switch (serviceValue) {
//                             case "Same Day Delivery":
//                             ServiceIconComponent = SameDay;
//                             break;
//                             case "Next Day Delivery":
//                             ServiceIconComponent = NextDay;
//                             break;
//                             case "Scheduled Delivery":
//                             ServiceIconComponent = ScheduledIcon;
//                             break;
//                             case "Express Delivery":
//                             ServiceIconComponent = ExpressIcon;
//                             break;
//                             default:
//                             ServiceIconComponent = null; // No icon if no match
//                         }

//                         return (
//                             <TableCell
//                             key={cell.id}
//                             style={isStatusCell ? { color: textColor } : {}} // Apply color if it's the status cell
//                             >
//                             {/* Render service icon and name if it's the services column */}
//                             {isServiceCell ? (
//                                 <span style={{ display: 'flex', alignItems: 'center' }}>
//                                 {ServiceIconComponent && (
//                                     <ServiceIconComponent style={{ marginRight: '8px' }} />
//                                 )}
//                                 {serviceValue}
//                                 </span>
//                             ) : (
//                                 flexRender(cell.column.columnDef.cell, cell.getContext())
//                             )}
//                             </TableCell>
//                         );
//                     })}
//                 </TableRow>
//                 ))
//             ) : (
//                 <TableRow>
//                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                     No results.
//                 </TableCell>
//                 </TableRow>
//             )}
//           </TableBody>

//         </Table>
//       </div>
//       <div className="flex items-center justify-center space-x-2 py-4">
        
//         <Pagination>
//         <PaginationContent>

//             <PaginationItem>
//                 <PaginationPrevious href="#" />
//             </PaginationItem>

//             <PaginationItem>
//                 <PaginationLink href="#">1</PaginationLink>
//             </PaginationItem>

//             <PaginationItem>
//                 <PaginationLink href="#" isActive>
//                     2
//                 </PaginationLink>
//             </PaginationItem>

//             <PaginationItem>
//                 <PaginationLink href="#">3</PaginationLink>
//             </PaginationItem>

//             <PaginationItem>
//                 <PaginationEllipsis />
//             </PaginationItem>

//             <PaginationItem>
//                 <PaginationNext href="#" />
//             </PaginationItem>

//         </PaginationContent>
//         </Pagination>
//       </div>
//     </div>
//   )
// }

// DataTable.tsx
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import SameDay from "../../../common/icons/SameDay"
import ExpressIcon from "../../../common/icons/ExpressIcon"
import ScheduledIcon from "../../../common/icons/ScheduledIcon"
import NextDay from "../../../common/icons/NextDay"


// DataTable accepts data and columns as props
export function DataTable({ data, columns }: { data: any[]; columns: ColumnDef<any>[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [date, setDate] = React.useState<Date | null>(null);

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
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
             {table.getRowModel().rows?.length ? (
                 table.getRowModel().rows.map((row) => (
                 <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                     {row.getVisibleCells().map((cell) => {
                         const isStatusCell = cell.column.id === 'status';
                         const isServiceCell = cell.column.id === 'services';
                        
                         // Cast the values to string, as you know these are strings
                         const statusValue = cell.getValue() as string;
                         const serviceValue = cell.getValue() as string;

                         let textColor;

                         // Apply conditional text color based on the status value
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
                         }

                         // Determine which icon to display based on the service type
                         let ServiceIconComponent;
                         switch (serviceValue) {
                             case "Same Day Delivery":
                             ServiceIconComponent = SameDay;
                             break;
                             case "Next Day Delivery":
                             ServiceIconComponent = NextDay;
                             break;
                             case "Scheduled Delivery":
                             ServiceIconComponent = ScheduledIcon;
                             break;
                             case "Express Delivery":
                             ServiceIconComponent = ExpressIcon;
                             break;
                             default:
                             ServiceIconComponent = null; // No icon if no match
                         }

                         return (
                             <TableCell
                             key={cell.id}
                            style={isStatusCell ? { color: textColor } : {}} // Apply color if it's the status cell
                             >
                             {/* Render service icon and name if it's the services column */}
                             {isServiceCell ? (
                                 <span style={{ display: 'flex', alignItems: 'center' }}>
                                 {ServiceIconComponent && (
                                     <ServiceIconComponent style={{ marginRight: '8px' }} />
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
         <Pagination>
         <PaginationContent>

             <PaginationItem>
                 <PaginationPrevious href="#" />
             </PaginationItem>

             <PaginationItem>
                 <PaginationLink href="#">1</PaginationLink>
             </PaginationItem>

             <PaginationItem>
                 <PaginationLink href="#" isActive>
                     2
                 </PaginationLink>
             </PaginationItem>

             <PaginationItem>
                 <PaginationLink href="#">3</PaginationLink>
             </PaginationItem>

             <PaginationItem>
                 <PaginationEllipsis />
             </PaginationItem>

             <PaginationItem>
                 <PaginationNext href="#" />
            </PaginationItem>

         </PaginationContent>
         </Pagination>
      </div>
    </div>
  );
}
