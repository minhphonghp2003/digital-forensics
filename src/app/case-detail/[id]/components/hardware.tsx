"use client"
import DatePickerInput from '@/components/form/date-picker-input'
import FileInputForm from '@/components/form/file-input'
import TextInput from '@/components/form/text-input'
import CustomTable from '@/components/ui/custom-table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AccountContext } from '@/core/context/account.context'
import { Hardware } from '@/core/model/edivence/hardware.model'
import { hardwareColumns } from '@/core/table-column/hardware-column'
import { getCaseHardwareIds } from '@/service/case.service'
import { createHardware, getHardware } from '@/service/evidence.service'
import { Status } from '@/utils/enum'
import { formatDate, hashFile } from '@/utils/helper'
import { Button } from 'components/ui/button'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
function HardwareDetail({ caseId, investigator }: { caseId: any, investigator: any }) {

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

            setHardware(result)
        }
    }
    let handleFileUpload = async (file: any) => {
        setNewHardware({
            ...newHardware,
            fileName: file.name,
            modifiedDate: file.lastModified,
            fileSize: file.size,
            fileType: file.type,
            hash:await hashFile(file)
        })
    }
    useEffect(() => {
        fetchDetail()
        account && account.contract.on("EvidenceUpdated", (caseId: any, evidenceType: any, evidenceId: any) => {
            evidenceType == "Hardware" && caseId == caseId && fetchDetail()
        });
    }, [account])
    async function handleAddHardware(e: any) {
        e.preventDefault();
        try {

            let tx = await createHardware({ contract: account.contract, caseId: caseId, ...newHardware })
            if (tx) {
                setOpen(false)
                fetchDetail()
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

    return (
        <div className=''><CustomTable title="Hardware" columns={hardwareColumns} data={
            hardware?.map((e: Hardware) => {
                return {
                    id: e.id,
                    fileName: e.fileName,
                    fileType: e.fileType,
                    fileSize: e.fileSize,
                    hash: e.hash,
                    accessDate: (Number(e.accessDate)),
                    formatedAccessDate: formatDate((Number(e.accessDate))),
                    status: Status[e.status],
                    caseId: e.caseId,
                    createdDate: (Number(e.createdDate)),
                    modifiedDate: (Number(e.modifiedDate)),
                    diskType: e.diskType,
                    filePath: e.filePath,
                }
            })

        } searchKey={'id'}
            extra={
                account?.address == investigator && <Dialog open={open} onOpenChange={setOpen} >
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
                        <form onSubmit={handleAddHardware}>
                            <div className='flex flex-col gap-2 mb-2'>
                                <FileInputForm title='Choose file' onChange={(e: any) => {
                                    const selectedFile = e.target.files?.[0]; // Get first file
                                    handleFileUpload(selectedFile)
                                }} />

                                <div className='flex gap-6'>
                                    <div className='grow flex flex-col gap-2'>
                                        <TextInput required value={newHardware.fileName} title={'File name'} onChange={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                fileName: e.target.value
                                            })
                                        }} />
                                        <TextInput required value={newHardware.fileSize} title={'File size'} onChange={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                fileSize: e.target.value
                                            })
                                        }} />
                                        <DatePickerInput  title={'Access date'} onDatePicked={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                accessDate: Date.parse(e)
                                            })
                                        }} selected={newHardware?.accessDate} />
                                    </div>
                                    <div className='grow flex flex-col gap-2'>
                                        <TextInput value={newHardware.fileType} required title={'File type'} onChange={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                fileType: e.target.value
                                            })

                                        }} />
                                        <TextInput value={newHardware.filePath} title={'File path'} onChange={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                filePath: e.target.value
                                            })

                                        }} />
                                        <TextInput value={newHardware.diskType} title={'Disk type'} onChange={(e: any) => {
                                            setNewHardware({
                                                ...newHardware,
                                                diskType: e.target.value
                                            })

                                        }} />
                                    </div>
                                </div>


                                <TextInput required value={newHardware.hash} title={'Hash'} onChange={(e: any) => {
                                    setNewHardware({
                                        ...newHardware,
                                        hash: e.target.value
                                    })

                                }} />
                            </div>
                            <DialogFooter>

                                <Button type="submit">Submit</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>

                </Dialog>
            }
        /></div>
    )
}

export default HardwareDetail