"use client"

import { ColumnDef } from "@tanstack/react-table"

import DatePickerInput from "@/components/form/date-picker-input"
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
import { AccountContext } from "@/core/context/account.context"
import { Device } from "@/core/model/edivence/device.model"
import { updateDevice, updateDeviceStatus } from "@/service/evidence.service"
import { Button } from "components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useContext, useState } from "react"
import { toast } from "sonner"


export const deviceColumns: ColumnDef<Device>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Name" }),

    },
    {
        accessorKey: "deviceType",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Type" }),

    },
    {
        accessorKey: "os",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Os" }),

    },
    {
        accessorKey: "formatedLastBootTime",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Last boot time" }),

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
            let [newDevice, setNewDevice] = useState<{
                name: string,
                deviceType: string,
                os: any,
                osVersion: string,
                mac: any,
                ip: any,
                lastBootTime: any,
            }>({
                name: detail.name,
                deviceType: detail.deviceType,
                os: detail.os,
                osVersion: detail.osVersion,
                mac: detail.mac,
                ip: detail.ip,
                lastBootTime: detail.lastBootTime
            })

            async function handleUpdateDevice() {
                try {

                    let tx = await updateDevice({ contract: account.contract, deviceId: detail.id, caseId: detail.caseId, ...newDevice })
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

                    let tx = await updateDeviceStatus({ contract: account.contract, deviceId: detail.id, caseId: detail.caseId, newStatus: status })
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
                                <DialogTitle>Add device</DialogTitle>
                                <DialogDescription>
                                    Add a new device to the system. Please fill in the details below.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-6'>
                                    <div className='grow flex flex-col gap-2'>
                                        <TextInput value={newDevice.name} title={'Name'} onChange={(e: any) => {
                                            setNewDevice({
                                                ...newDevice,
                                                name: e.target.value
                                            })
                                        }} />
                                        <TextInput value={newDevice.ip} title={'IP'} onChange={(e: any) => {
                                            setNewDevice({
                                                ...newDevice,
                                                ip: e.target.value
                                            })

                                        }} />
                                        <TextInput value={newDevice.os} title={'OS'} onChange={(e: any) => {
                                            setNewDevice({
                                                ...newDevice,
                                                os: e.target.value
                                            })

                                        }} />
                                    </div>
                                    <div className='grow flex flex-col gap-2'>
                                        <TextInput value={newDevice.deviceType} title={'Type'} onChange={(e: any) => {
                                            setNewDevice({
                                                ...newDevice,
                                                deviceType: e.target.value
                                            })
                                        }} />
                                        <TextInput value={newDevice.mac} title={'MAC'} onChange={(e: any) => {
                                            setNewDevice({
                                                ...newDevice,
                                                mac: e.target.value
                                            })

                                        }} />
                                        <TextInput value={newDevice.osVersion} title={'OS version'} onChange={(e: any) => {
                                            setNewDevice({
                                                ...newDevice,
                                                osVersion: e.target.value
                                            })

                                        }} />
                                    </div>
                                </div>
                                <DatePickerInput title={'Last boot time'} onDatePicked={(e: any) => {
                                    setNewDevice({
                                        ...newDevice,
                                        lastBootTime: Date.parse(e)
                                    })
                                }} selected={newDevice?.lastBootTime} />

                            </div>
                            <DialogFooter>

                                <Button onClick={handleUpdateDevice} type="submit">Submit</Button>
                            </DialogFooter>
                        </DialogContent>

                    </Dialog>
                    <UpdateStatusDialog title={"Update device status"} name={"status"} openStatus={openStatus} setOpenStatus={setOpenStatus} defaultStatus={detail.status} handleUpdateStatus={handleUpdateStatus} />
                </DropdownMenu>
            )
        },
    },
]
