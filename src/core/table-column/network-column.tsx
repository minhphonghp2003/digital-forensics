"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/table-elements/column-header"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Hardware } from "@/core/model/edivence/hardware.model"
import { Button } from "components/ui/button"
import { MoreHorizontal } from "lucide-react"


export const hardwareColumns: ColumnDef<Hardware>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "fileName",
        header: ({ column }) => DataTableColumnHeader({ column, title: "File name" }),

    },
    {
        accessorKey: "fileType",
        header: ({ column }) => DataTableColumnHeader({ column, title: "File name" }),

    },
    {
        accessorKey: "hash",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Hash" }),

    },
    {
        accessorKey: "accessDate",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Access date" }),

    },
    {
        accessorKey: "status",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Status" }),

    },
    {
        id: "actions",
        cell: ({ row }) => {
            let detail = row.original
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
                            onClick={() => navigator.clipboard.writeText(detail?.id)}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                alert("Edit")
                            }}
                        >View details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
