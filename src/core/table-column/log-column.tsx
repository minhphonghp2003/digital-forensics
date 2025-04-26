"use client"

import { ColumnDef } from "@tanstack/react-table"

import TextInput from "@/components/form/text-input"
import UpdateStatusDialog from "@/components/form/update-status"
import { DataTableColumnHeader } from "@/components/table-elements/column-header"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AccountContext } from "@/core/context/account.context"
import { Log } from "@/core/model/edivence/log.model"
import { updateLog, updateLogStatus } from "@/service/evidence.service"
import { Button } from "components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useContext, useState } from "react"
import { toast } from "sonner"


export const logColumns: ColumnDef<Log>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "source",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Source" }),

    },
    {
        accessorKey: "securityLevel",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Security level" }),

    },
    {
        accessorKey: "logType",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Type" }),

    },
    {
        accessorKey: "timestamp",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Timestamp" }),

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
            let [newLog, setNewLog] = useState<{
                source: string,
                securityLevel: any,
                logType: any,

            }>({
                source: detail.source,
                securityLevel: 0,
                logType: 0,
            })
            async function handleUpdateLog() {

                try {

                    let tx = await updateLog({ contract: account.contract, logId: detail.id, caseId: detail.caseId, ...newLog })
                    if (tx) {
                        setOpen(false)
                    } else {
                        setOpen(false)
                        toast("Error", {
                            description: "Error occur while calling contract"
                        })
                    }
                } catch (error) {
                    setOpen(false)
                    toast("Error", {
                        description: "Error occur while calling contract"
                    })
                }

            }

            async function handleUpdateStatus(status: any) {
                try {

                    let tx = await updateLogStatus({ contract: account.contract, logId: detail.id, caseId: detail.caseId, newStatus: status })
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
                                <DialogTitle>Update log</DialogTitle>
                                <DialogDescription>
                                    Update log
                                </DialogDescription>
                            </DialogHeader>
                            <TextInput value={newLog.source} title={'Source'} onChange={(e: any) => {
                                setNewLog({
                                    ...newLog,
                                    source: e.target.value
                                })
                            }} />
                            <div className='flex  gap-2'>

                                <div className='grow flex flex-col gap-2'>
                                    <Label htmlFor="name" className='mb-2'>
                                        Security level
                                    </Label>
                                    <Select onValueChange={(e) => {
                                        setNewLog({
                                            ...newLog,
                                            securityLevel: e
                                        })
                                    }} >
                                        <div className='flex justify-between'>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="0">LOW</SelectItem>
                                                    <SelectItem value="1">MEDIUM</SelectItem>
                                                    <SelectItem value="2">HIGH</SelectItem>
                                                    <SelectItem value="3">CRITICAL</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </div>
                                    </Select>
                                </div>
                                <div className='grow flex flex-col gap-2'>
                                    <Label htmlFor="name" className='mb-2'>
                                        Log type
                                    </Label>
                                    <Select onValueChange={(e) => {
                                        setNewLog({
                                            ...newLog,
                                            logType: e
                                        })
                                    }} >
                                        <div className='flex justify-between'>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="0">SYSTEM</SelectItem>
                                                    <SelectItem value="1">SECURITY</SelectItem>
                                                    <SelectItem value="2">APPLICATION</SelectItem>
                                                    <SelectItem value="3">NETWORK</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </div>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>

                                <Button onClick={handleUpdateLog} type="submit">Submit</Button>
                            </DialogFooter>
                        </DialogContent>

                    </Dialog>
                    <UpdateStatusDialog title={"Update log status"} name={"status"} openStatus={openStatus} setOpenStatus={setOpenStatus} defaultStatus={detail.status} handleUpdateStatus={handleUpdateStatus} />
                </DropdownMenu >

            )
        },
    },
]
