"use client"

import { ColumnDef } from "@tanstack/react-table"

import TextInput from "@/components/form/text-input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AccountContext } from "@/core/context/account.context"
import { Investigator } from "@/core/model/investigator/investigator.model"
import { Button } from "components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useContext, useState } from "react"


export const invColumns: ColumnDef<Investigator>[] = [
    {
        accessorKey: "address",
        header: "Address",
    },
{
        accessorKey: "nickname",
        header: "Nick name",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            let detail = row.original
            let [open, setOpen] = useState(false)
           
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
                            onClick={() => navigator.clipboard.writeText(detail?.address)}
                        >
                            Copy Address
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                setOpen(true)
                            }}
                        >View details</DropdownMenuItem>
                      
                    </DropdownMenuContent>
                    <Dialog open={open} onOpenChange={setOpen} >

                        <DialogContent className="sm:max-w-[800px]">
                            <DialogHeader>
                                <DialogTitle>Investigator detail</DialogTitle>

                            </DialogHeader>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-6'>
                                        <TextInput readonly value={detail?.address} title={'Address'} onChange={(e: any) => {
                                        }} />
                                        <TextInput readonly value={detail?.nickname} title={'Nick name'} onChange={(e: any) => {
                                        }} />
                                       
                                </div>
                            </div>

                        </DialogContent>

                    </Dialog>
                </DropdownMenu>
            )
        },
    },
]
