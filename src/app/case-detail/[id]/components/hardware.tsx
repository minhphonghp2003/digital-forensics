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
import { addHardware, getHardware } from '@/service/evidence.service'
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
        createDate: any,
        modifiedDate: any,
        accessDate: any,
        diskType: any,
        filePath: any
    } | null>(null)
    let fetchDetail = async () => {
        let ids = await getCaseHardwareIds({ contract: account.contract, caseId })
        let result = []
        result = await Promise.all(ids.map((e: any) => getHardware({ contract: account.contract, hardwareId: e })));
        console.log(result);
    }
    useEffect(() => {
        fetchDetail()
    }, [])
    async function handleAddHardware() {
        let tx = await addHardware({ contract: account.contract, caseId: caseId, ...{ newHardware } })
        if (tx) {
            setOpen(false)
            fetchDetail()
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
                        <Button variant="outline">Add case</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                            <DialogTitle>Add case</DialogTitle>
                            <DialogDescription>
                                Add a new case to the system. Please fill in the details below.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex flex-col gap-2'>
                            <FileInputForm title='Choose file' onChange={(e: any) => { }} />

                            <div className='flex gap-6'>
                                <div className='grow flex flex-col gap-2'>
                                    <TextInput title={'File name'} onChange={(e: any) => { }} />
                                    <TextInput title={'File size'} onChange={(e: any) => { }} />
                                    <DatePickerInput title={'Access date'} onDatePicked={(e: any) => { }} selected={newHardware?.accessDate} />
                                </div>
                                <div className='grow flex flex-col gap-2'>
                                    <TextInput title={'File type'} onChange={(e: any) => { }} />
                                    <TextInput title={'File path'} onChange={(e: any) => { }} />
                                    <TextInput title={'Disk type'} onChange={(e: any) => { }} />
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