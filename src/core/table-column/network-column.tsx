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
import { Network } from "@/core/model/edivence/network.model"


export const networkColumns: ColumnDef<Network>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "sourceIp",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Source IP" }),

    },
    {
        accessorKey: "destIp",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Dest. IP" }),

    },
    {
        accessorKey: "sourcePort",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Source port" }),

    },
    {
        accessorKey: "destPort",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Dest. port" }),

    },
    {
        accessorKey: "protocol",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Protocol" }),

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
