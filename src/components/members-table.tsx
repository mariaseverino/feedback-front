import { useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from '@tanstack/react-table';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './ui/table';
import { useQuery } from '@tanstack/react-query';
import { auth } from '@/lib/auth.client';
import { roleMap } from '@/utils/roleMap';
import { useGetMembers } from '@/hooks/organization';

// const data: Payment[] = [
//     {
//         id: 'm5gr84i9',
//         amount: 316,
//         status: 'success',
//         email: 'ken99@example.com',
//     },
//     {
//         id: '3u1reuv4',
//         amount: 242,
//         status: 'success',
//         email: 'Abe45@example.com',
//     },
//     {
//         id: 'derv1ws0',
//         amount: 837,
//         status: 'processing',
//         email: 'Monserrat44@example.com',
//     },
//     {
//         id: '5kma53ae',
//         amount: 874,
//         status: 'success',
//         email: 'Silas22@example.com',
//     },
//     {
//         id: 'bhqecj4p',
//         amount: 721,
//         status: 'failed',
//         email: 'carmella@example.com',
//     },
// ];

export type Payment = {
    id: string;
    amount: number;
    status: 'pending' | 'processing' | 'success' | 'failed';
    email: string;
};

export const columns: ColumnDef<Member>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: 'Nome',
        cell: ({ row }) => (
            <div className="capitalize">{row.original.name}</div>
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Email
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.original.email}</div>
        ),
    },
    {
        accessorKey: 'role',
        header: 'Função',
        cell: ({ row }) => (
            <div className="capitalize">
                {roleMap[row.getValue('role') as keyof typeof roleMap]}
            </div>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Membro desde',
        cell: ({ row }) => {
            const date = row.getValue<Date>('createdAt');

            return <div>{new Date(date).toLocaleDateString('pt-BR')}</div>;
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(payment.userId!)
                            }
                        >
                            Remover membro
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const columns2: ColumnDef<Invite>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Email
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.original.email}</div>
        ),
    },
    {
        accessorKey: 'role',
        header: 'Função',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('role')}</div>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Convite enviado em',
        cell: ({ row }) => {
            const date = row.getValue<Date>('createdAt');

            return <div>{new Date(date).toLocaleDateString('pt-BR')}</div>;
        },
    },
    // {
    //     id: 'actions',
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const payment = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() =>
    //                             navigator.clipboard.writeText(payment.userId)
    //                         }
    //                     >
    //                         Remover membro
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];

// interface Member {
//     id: string;
//     organizationId: string;
//     role: 'member' | 'admin' | 'owner';
//     createdAt: Date;
//     userId: string;
//     user: {
//         id: string;
//         email: string;
//         name: string;
//         image?: string;
//     };
// }

interface Member {
    userId: string;
    name: string;
    email: string;
    role: 'member' | 'admin' | 'owner';
    createdAt: Date;
}

interface Invite {
    id: string;
    // organizationId: string;
    email: string;
    role: 'member' | 'admin' | 'owner';
    createdAt: Date;
}

export function MembersTable({ organizationId }: { organizationId: string }) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});

    const { data = [] } = useGetMembers(organizationId);

    const table = useReactTable({
        data,
        columns: columns,
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
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrar emails..."
                    value={
                        (table
                            .getColumn('email')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('email')
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm placeholder:text-foreground"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="ml-auto bg-gray-200/40"
                        >
                            Colunas <ChevronDown />
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
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Sem resultados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div> */}
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="bg-gray-200/40"
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="bg-gray-200/40"
                    >
                        Proximo
                    </Button>
                </div>
            </div>
        </div>
    );
}
