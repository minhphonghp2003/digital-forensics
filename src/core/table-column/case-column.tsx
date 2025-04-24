"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/table-elements/column-header"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Case } from "@/core/model/case/case.model"

import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"


export const caseColumns: ColumnDef<Case>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "title",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Title" }),

    },
    {
        accessorKey: "description",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Description" }),

    },
    {
        accessorKey: "status",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Status" }),

    },
    {
        accessorKey: "createdDate",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Created At" }),

    },
    {
        id: "actions",
        cell: ({ row }) => {
            let caseDetail = row.original
            const router = useRouter();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(caseDetail.id.toString())}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            router.push('/case-detail/' + caseDetail.id);

                        }}>View details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
