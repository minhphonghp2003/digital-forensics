"use client"
import TextInput from '@/components/form/text-input'
import CustomTable from '@/components/ui/custom-table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AccountContext } from '@/core/context/account.context'
import { Log } from '@/core/model/edivence/log.model'
import { logColumns } from '@/core/table-column/log-column'
import { getCaseLogIds } from '@/service/case.service'
import { createLog, getLog } from '@/service/evidence.service'
import { LogType, SecurityLevel, Status } from '@/utils/enum'
import { Button } from 'components/ui/button'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
function LogDetail({ caseId, investigator }: { caseId: any, investigator: any }) {
    // source, securityLevel, logType
    let { account } = useContext(AccountContext)
    let [open, setOpen] = useState(false)
    let [log, setLog] = useState<Log[] | null>(null)
    let [newLog, setNewLog] = useState<{
        source: string,
        securityLevel: string,
        logType: any,

    }>({
        source: "",
        securityLevel: "",
        logType: "",
    })
    let fetchDetail = async () => {
        if (account?.contract) {

            let ids = await getCaseLogIds({ contract: account.contract, caseId })
            let result = []
            result = await Promise.all(ids.map((e: any) => getLog({ contract: account.contract, logId: e })));
            setLog(result)
        }
    }
    useEffect(() => {
        fetchDetail()
        account && account.contract.on("EvidenceUpdated", (caseId: any, evidenceType: any, evidenceId: any) => {
            evidenceType == "Log" && caseId == caseId && fetchDetail()
        });
    }, [account])
    async function handleAddLog(e: any) {

        e.preventDefault();
        try {

            let tx = await createLog({ contract: account.contract, caseId: caseId, ...newLog })
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
        <div className=''><CustomTable title="Log" columns={logColumns} data={log?.map((e: Log) => {
            return {
                id: e.id,
                source: e.source,
                caseId: e.caseId,
                securityLevel: SecurityLevel[e.securityLevel],
                logType: LogType[e.logType],
                timestamp: e.timestamp,
                status: Status[e.status]
            }
        })} searchKey={'id'}
            extra={
                investigator?.includes(account?.address) && <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger asChild>
                        <Button variant="outline">Add log</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                            <DialogTitle>Add log</DialogTitle>
                            <DialogDescription>
                                Add a new log to the system. Please fill in the details below.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddLog}>
                            <TextInput required title={'Source'} onChange={(e: any) => {
                                setNewLog({
                                    ...newLog,
                                    source: e.target.value
                                })
                            }} />
                            <div className='flex  gap-2 my-2'>

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

                                <Button type="submit">Submit</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>

                </Dialog>
            }
        /></div >
    )
}

export default LogDetail