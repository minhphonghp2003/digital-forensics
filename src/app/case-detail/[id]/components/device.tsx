"use client"
import DatePickerInput from '@/components/form/date-picker-input'
import TextInput from '@/components/form/text-input'
import CustomTable from '@/components/ui/custom-table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AccountContext } from '@/core/context/account.context'
import { Device } from '@/core/model/edivence/device.model'
import { deviceColumns } from '@/core/table-column/device-column'
import { getCaseDeviceIds } from '@/service/case.service'
import { createDevice, getDevice } from '@/service/evidence.service'
import { Status } from '@/utils/enum'
import { formatDate } from '@/utils/helper'
import { Button } from 'components/ui/button'
import { useContext, useEffect, useState } from 'react'
function DeviceDetail({ caseId }: { caseId: any }) {
    let { account } = useContext(AccountContext)
    let [open, setOpen] = useState(false)
    let [device, setDevice] = useState<Device[] | null>(null)
    let [newDevice, setNewDevice] = useState<{
        name: string,
        deviceType: string,
        os: any,
        osVersion: string,
        mac: any,
        ip: any,
        lastBootTime: any,
    }>({
        name: "",
        deviceType: "",
        os: "",
        osVersion: "",
        mac: "",
        ip: "",
        lastBootTime: "",
    })
    let fetchDetail = async () => {
        if (account?.contract) {

            let ids = await getCaseDeviceIds({ contract: account.contract, caseId })
            let result = []
            result = await Promise.all(ids.map((e: any) => getDevice({ contract: account.contract, deviceId: e })));

            setDevice(result)
        }
    }
    useEffect(() => {
        fetchDetail()
        account && account.contract.on("EvidenceUpdated", (caseId: any, evidenceType: any, evidenceId: any) => {
            evidenceType == "Device" && caseId == caseId && fetchDetail()
        });
    }, [account])
    async function handleAddDevice() {
        if (account?.contract) {
            let tx = await createDevice({ contract: account.contract, caseId: caseId, ...newDevice })
            if (tx) {
                setOpen(false)
                fetchDetail()
            }
        }
    }

    return (
        <div className=''><CustomTable title="Device" columns={deviceColumns} data={device?.map((e: Device) => {
            return {
                id: e.id,
                name: e.name,
                deviceType: e.deviceType,
                os: e.os,
                lastBootTime: Number(e.lastBootTime),
                formatedLastBootTime: formatDate(Number(e.lastBootTime)),
                status: Status[e.status],
                caseId: e.caseId,
                osVersion: e.osVersion,
                mac: e.mac,
                ip: e.ip,
            }
        })} searchKey={'id'}
            extra={
                <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger asChild>
                        <Button variant="outline">Add device</Button>
                    </DialogTrigger>
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
                                    <TextInput title={'Name'} onChange={(e: any) => {
                                        setNewDevice({
                                            ...newDevice,
                                            name: e.target.value
                                        })
                                    }} />
                                    <TextInput title={'IP'} onChange={(e: any) => {
                                        setNewDevice({
                                            ...newDevice,
                                            ip: e.target.value
                                        })

                                    }} />
                                    <TextInput title={'OS'} onChange={(e: any) => {
                                        setNewDevice({
                                            ...newDevice,
                                            os: e.target.value
                                        })

                                    }} />
                                </div>
                                <div className='grow flex flex-col gap-2'>
                                    <TextInput title={'Type'} onChange={(e: any) => {
                                        setNewDevice({
                                            ...newDevice,
                                            deviceType: e.target.value
                                        })
                                    }} />
                                    <TextInput title={'MAC'} onChange={(e: any) => {
                                        setNewDevice({
                                            ...newDevice,
                                            mac: e.target.value
                                        })

                                    }} />
                                    <TextInput title={'OS version'} onChange={(e: any) => {
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

                            <Button onClick={handleAddDevice} type="submit">Submit</Button>
                        </DialogFooter>
                    </DialogContent>

                </Dialog>
            }
        /></div>
    )
}

export default DeviceDetail