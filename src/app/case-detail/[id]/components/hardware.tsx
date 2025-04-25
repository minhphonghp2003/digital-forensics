"use client"
import DatePickerInput from '@/components/form/date-picker-input'
import FileInputForm from '@/components/form/file-input'
import TextInput from '@/components/form/text-input'
import CustomTable from '@/components/ui/custom-table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AccountContext } from '@/core/context/account.context'
import { Hardware } from '@/core/model/edivence/hardware.model'
import { evidenceColumns } from '@/core/table-column/evidence-column'
import { getCaseHardwareIds } from '@/service/case.service'
import { createHardware, getHardware } from '@/service/evidence.service'
import { Button } from 'components/ui/button'
import { useContext, useEffect, useState } from 'react'
// fileName, fileType, fileSize, hash,
//     createdDate, modifiedDate, accessDate, diskType, filePath
function HardwareDetail({ caseId }: { caseId: any }) {
    let { account } = useContext(AccountContext)
    let [open, setOpen] = useState(false)
    let [hardware, setHardware] = useState<Hardware[] | null>(null)
    let [newHardware, setNewHardware] = useState<{
        fileName: string,
        fileType: string,
        fileSize: any,
        hash: string,
        createdDate: any,
        modifiedDate: any,
        accessDate: any,
        diskType: any,
        filePath: any
    }>({
        accessDate: Date.now(),
        createdDate: Date.now(),
        modifiedDate: Date.now(),
        diskType: "",
        filePath: "",
        fileName: "",
        fileSize: 0,
        fileType: "",
        hash: ""
    })
    let fetchDetail = async () => {
        if (account?.contract) {

            let ids = await getCaseHardwareIds({ contract: account.contract, caseId })
            let result = []
            result = await Promise.all(ids.map((e: any) => getHardware({ contract: account.contract, hardwareId: e })));
            console.log(result);
            setHardware(result)
        }
    }
    useEffect(() => {
        fetchDetail()
    }, [])
    async function handleAddHardware() {
        if (account?.contract) {
            let tx = await createHardware({ contract: account.contract, caseId: caseId, ...newHardware })
            if (tx) {
                setOpen(false)
                fetchDetail()
            }
        }
    }

    return (
        <div className=''><CustomTable title="Hardware" columns={evidenceColumns} data={
            hardware?.map((e: Hardware) => {
                return {
                    id: e.id,
                    title: e.fileName,
                    description: "description",
                    status: "pending",
                    createdDate: "2023-10-01",
                }
            })

        } searchKey={'id'}
            extra={
                <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger asChild>
                        <Button variant="outline">Add hardware</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                            <DialogTitle>Add hardware</DialogTitle>
                            <DialogDescription>
                                Add a new hardwware to the system. Please fill in the details below.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex flex-col gap-2'>
                            <FileInputForm title='Choose file' onChange={(e: any) => {

                            }} />

                            <div className='flex gap-6'>
                                <div className='grow flex flex-col gap-2'>
                                    <TextInput title={'File name'} onChange={(e: any) => {
                                        setNewHardware({
                                            ...newHardware,
                                            fileName: e.target.value
                                        })
                                    }} />
                                    <TextInput title={'File size'} onChange={(e: any) => {
                                        setNewHardware({
                                            ...newHardware,
                                            fileSize: e.target.value
                                        })
                                    }} />
                                    <DatePickerInput title={'Access date'} onDatePicked={(e: any) => {
                                        setNewHardware({
                                            ...newHardware,
                                            accessDate: Date.parse(e)
                                        })
                                    }} selected={newHardware?.accessDate} />
                                </div>
                                <div className='grow flex flex-col gap-2'>
                                    <TextInput title={'File type'} onChange={(e: any) => {
                                        setNewHardware({
                                            ...newHardware,
                                            fileType: e.target.value
                                        })

                                    }} />
                                    <TextInput title={'File path'} onChange={(e: any) => {
                                        setNewHardware({
                                            ...newHardware,
                                            filePath: e.target.value
                                        })

                                    }} />
                                    <TextInput title={'Disk type'} onChange={(e: any) => {
                                        setNewHardware({
                                            ...newHardware,
                                            diskType: e.target.value
                                        })

                                    }} />
                                </div>
                            </div>


                            <TextInput title={'Hash'} onChange={(e: any) => { }} />
                        </div>
                        <DialogFooter>

                            <Button onClick={handleAddHardware} type="submit">Submit</Button>
                        </DialogFooter>
                    </DialogContent>

                </Dialog>
            }
        /></div>
    )
}

export default HardwareDetail