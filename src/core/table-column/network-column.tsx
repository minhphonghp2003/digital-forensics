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
import { AccountContext } from "@/core/context/account.context"
import { Network } from "@/core/model/edivence/network.model"
import { updateNetwork, updateNetworkStatus } from "@/service/evidence.service"
import { Button } from "components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useContext, useState } from "react"


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
        accessorKey: "sourcePort",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Source port" }),

    },
    {
        accessorKey: "destIp",
        header: ({ column }) => DataTableColumnHeader({ column, title: "Dest. IP" }),

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
            let { account } = useContext(AccountContext)
            let [open, setOpen] = useState(false)
            let [openStatus, setOpenStatus] = useState(false)
            let [newNetwork, setNewNetwork] = useState<{
                sourceIp: string,
                destIp: string,
                sourcePort: any,
                destPort: number,
                protocol: any,
                dataSize: any,
            }>({
                sourceIp: detail.sourceIp,
                destIp: detail.destIp,
                sourcePort: detail.sourcePort,
                destPort: detail.destPort,
                protocol: detail.protocol,
                dataSize: detail.dataSize,
            })
            async function handleUpdateNetwork() {
                if (account) {
                    let tx = await updateNetwork({ contract: account.contract, networkId: detail.id, caseId: detail.caseId, ...newNetwork })
                    if (tx) {
                        setOpen(false)
                    }
                }
            }

            async function handleUpdateStatus(status: any) {
                if (account) {
                    let tx = await updateNetworkStatus({ contract: account.contract, networkId: detail.id, caseId: detail.caseId, newStatus: status })
                    if (tx) {
                        setOpenStatus(false)
                    }
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
                                <DialogTitle>Update network</DialogTitle>
                                <DialogDescription>
                                    Update network
                                </DialogDescription>
                            </DialogHeader>
                            <div className='flex flex-col gap-2'>
                                <div className='flex gap-6'>
                                    <div className='grow flex flex-col gap-2'>
                                        <TextInput value={newNetwork.sourceIp} title={'Source IP'} onChange={(e: any) => {
                                            setNewNetwork({
                                                ...newNetwork,
                                                sourceIp: e.target.value
                                            })
                                        }} />
                                        <TextInput value={newNetwork.destIp} title={'Destination IP'} onChange={(e: any) => {
                                            setNewNetwork({
                                                ...newNetwork,
                                                destIp: e.target.value
                                            })

                                        }} />
                                        <TextInput value={newNetwork.protocol} title={'Protocol'} onChange={(e: any) => {
                                            setNewNetwork({
                                                ...newNetwork,
                                                protocol: e.target.value
                                            })

                                        }} />
                                    </div>
                                    <div className='grow flex flex-col gap-2'>
                                        <TextInput value={newNetwork.sourcePort} title={'Source port'} onChange={(e: any) => {
                                            setNewNetwork({
                                                ...newNetwork,
                                                sourcePort: e.target.value
                                            })
                                        }} />
                                        <TextInput value={newNetwork.destPort} title={'Destination port'} onChange={(e: any) => {
                                            setNewNetwork({
                                                ...newNetwork,
                                                destPort: e.target.value
                                            })

                                        }} />
                                        <TextInput value={newNetwork.dataSize} title={'Data size'} onChange={(e: any) => {
                                            setNewNetwork({
                                                ...newNetwork,
                                                dataSize: e.target.value
                                            })

                                        }} />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>

                                <Button onClick={handleUpdateNetwork} type="submit">Submit</Button>
                            </DialogFooter>
                        </DialogContent>

                    </Dialog>
                    <UpdateStatusDialog title={"Update network status"} name={"status"} openStatus={openStatus} setOpenStatus={setOpenStatus} defaultStatus={detail.status} handleUpdateStatus={handleUpdateStatus} />
                </DropdownMenu>
            )
        },
    },
]
