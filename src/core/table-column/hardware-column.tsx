"use client"

import { ColumnDef } from "@tanstack/react-table"

import DatePickerInput from '@/components/form/date-picker-input'
import TextInput from '@/components/form/text-input'
import UpdateStatusDialog from "@/components/form/update-status"
import { DataTableColumnHeader } from "@/components/table-elements/column-header"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AccountContext } from "@/core/context/account.context"
import { Hardware } from "@/core/model/edivence/hardware.model"
import { updateHardwareStatus } from "@/service/evidence.service"
import { Button } from "components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useContext, useState } from "react"
import { toast } from "sonner"
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
        header: ({ column }) => DataTableColumnHeader({ column, title: "File type" }),

    },
    // {
    //     accessorKey: "hash",
    //     header: ({ column }) => DataTableColumnHeader({ column, title: "Hash" }),

    // },
    {
        accessorKey: "formatedAccessDate",
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
            let { account } = useContext(AccountContext)
            let [open, setOpen] = useState(false)
            let [openStatus, setOpenStatus] = useState(false)
            let [newHardware, setNewHardware] = useState<{
                fileName: string,
                fileType: string,
                fileSize: any,
                hash: string,
                createdDate: any,
                modifiedDate: any,
                accessDate: any,
                diskType: any,
                filePath: any,
            }>({
                accessDate: detail.accessDate,
                createdDate: detail.createdDate,
                modifiedDate: detail.modifiedDate,
                diskType: detail.diskType,
                filePath: detail.filePath,
                fileName: detail.fileName,
                fileSize: detail.fileSize,
                fileType: detail.fileType,
                hash: detail.hash
            })



            async function handleUpdateStatus(status: any) {
                try {

                    let tx = await updateHardwareStatus({ contract: account.contract, hardwareId: detail.id, caseId: detail.caseId, newStatus: status })
                    if (tx) {
                        setOpenStatus(false)
                    } else {
                        setOpenStatus(false)
                        toast("Error", {
                            description: "Error occur while calling contract"
                        })
                    }
                } catch (error) {
                    setOpenStatus(false)
                    toast("Error", {
                        description: "Error occur while calling contract"
                    })
                }

            }

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
                                setOpen(true)
                            }}
                        >View details</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setOpenStatus(true)
                            }}
                        >Update status</DropdownMenuItem>
                    </DropdownMenuContent>
                    <Dialog open={open} onOpenChange={setOpen} >
                        <DialogContent className="sm:max-w-[800px]">
                            <DialogHeader>
                                <DialogTitle>Hardware details</DialogTitle>

                            </DialogHeader>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-6'>
                                    <div className='grow flex flex-col gap-2'>
                                        <TextInput readonly  value={newHardware.fileName} title={'File name'} onChange={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                fileName: e.target.value
                                            })
                                        }} />
                                        <TextInput readonly value={newHardware.fileSize} title={'File size'} onChange={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                fileSize: e.target.value
                                            })
                                        }} />
                                        <DatePickerInput readonly  title={'Access date'} onDatePicked={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                accessDate: Date.parse(e)
                                            })
                                        }} selected={newHardware?.accessDate} />
                                    </div>
                                    <div className='grow flex flex-col gap-2'>
                                        <TextInput readonly value={newHardware.fileType} title={'File type'} onChange={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                fileType: e.target.value
                                            })

                                        }} />
                                        <TextInput readonly value={newHardware.filePath} title={'File path'} onChange={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                filePath: e.target.value
                                            })

                                        }} />
                                        <TextInput readonly value={newHardware.diskType} title={'Disk type'} onChange={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                diskType: e.target.value
                                            })

                                        }} />
                                    </div>
                                </div>

                                <TextInput title={'Hash'} readonly value={newHardware.hash} onChange={(e: any) => {
                                    setNewHardware({
                                        ...newHardware,
                                        hash: e.target.value
                                    })

                                }} />
                            </div>

                        </DialogContent>

                    </Dialog>
                    <UpdateStatusDialog title={"Update hardware status"} name={"status"} openStatus={openStatus} setOpenStatus={setOpenStatus} defaultStatus={detail.status} handleUpdateStatus={handleUpdateStatus} />
                </DropdownMenu>
            )
        },
    },
]
