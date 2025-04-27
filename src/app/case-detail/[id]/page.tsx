"use client"
import BasicCaseInfo from '@/app/case-detail/[id]/components/basic-info';
import DetailTable from '@/app/case-detail/[id]/components/detail-table';
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccountContext } from '@/core/context/account.context';
import { getCase, getCaseDeviceIds, getCaseHardwareIds, getCaseLogIds, getCaseNetworkIds, updateCase, updateCaseStatus } from '@/service/case.service';
import { Status } from '@/utils/enum';
import { truncateFromMiddle } from '@/utils/helper';
import { Button } from 'components/ui/button';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { toast } from 'sonner';

function page() {
    const params = useParams<{ id: string }>()
    let id = params.id
    let { account } = useContext(AccountContext)
    let [open, setOpen] = useState(false)
    let [openStatus, setOpenStatus] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    let [caseDetail, setCase] = useState<any>(null)
    let [newStatus, setStatus] = useState<any>(null)
    let [hardware, setHardware] = useState<any>(null)
    let [device, setDevice] = useState<any>(null)
    let [network, setNetwork] = useState<any>(null)
    let [log, setLog] = useState<any>(null)
    let fetchCase = async () => {

        if (account) {
            let result: any = await getCase({ contract: account.contract, caseId: id });
            if (result) {
                setCase(result)
                setTitle(result.title)
                setDescription(result.description)
                fetchHardware()
                fetchDevice()
                fetchNetwork()
                fetchLog()
            }
        }
    }
    let fetchHardware = async () => {
        if (account && id) {
            let result = await getCaseHardwareIds({ contract: account.contract, caseId: id });
            if (result) {
                setHardware(result)
            }
        }
    }
    let fetchDevice = async () => {
        if (account && id) {
            let result = await getCaseDeviceIds({ contract: account.contract, caseId: id });
            if (result) {
                setDevice(result)
            }
        }
    }
    let fetchNetwork = async () => {
        if (account && id) {
            let result = await getCaseNetworkIds({ contract: account.contract, caseId: id });
            if (result) {
                setNetwork(result)
            }
        }
    }
    let fetchLog = async () => {
        if (account && id) {
            let result = await getCaseLogIds({ contract: account.contract, caseId: id });
            if (result) {
                setLog(result)
            }
        }
    }

    useEffect(() => {
        fetchCase()
        account && account.contract.on("EvidenceAdded", (caseId: any, evidenceType: any, evidenceId: any) => {
            caseId == id && fetchCase()
        });

    }, [account, id])
    async function handleUpdateCase() {
        if (account) {

            try {

                let tx = await updateCase({ contract: account.contract, caseId: id, title, description })
                if (tx) {
                    setOpen(false)
                    fetchCase()
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
    }

    let status = Status[caseDetail?.status ?? 0]
    async function handleUpdateStatus() {
        if (account && newStatus) {
            let tx = await updateCaseStatus({ contract: account.contract, caseId: id, newStatus })
            if (tx) {
                setOpenStatus(false)
                fetchCase()
            }
        }
    }

    return (
        <div>
            {

                account?.address == caseDetail?.investigator && <Dialog open={open} onOpenChange={setOpen} >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Update case</DialogTitle>
                            <DialogDescription>
                                Update case information
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Title
                                </Label>
                                <Input id="name" value={title} onChange={(e) => { setTitle(e.target.value) }} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Description
                                </Label>
                                <Input id="username" value={description} onChange={(e) => { setDescription(e.target.value) }} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleUpdateCase} type="submit">Submit</Button>
                        </DialogFooter>
                    </DialogContent>

                </Dialog>}
            <Dialog open={openStatus} onOpenChange={setOpenStatus} >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update case</DialogTitle>

                    </DialogHeader>
                    <Select onValueChange={(e) => {
                        setStatus(e)
                    }} >
                        <div className='flex justify-between'>

                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Update case status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem value="0">Closed</SelectItem>
                                    <SelectItem value="1">Deleted</SelectItem>
                                    <SelectItem value="2">Active</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            <Button onClick={handleUpdateStatus} type="submit">Submit</Button>
                        </div>
                    </Select>
                </DialogContent>

            </Dialog>
            <div className='flex justify-between text-lg items-center  my-4'>

                <div>
                    <p className='flex items-center gap-3 font-bold  cursor-pointer text-xl' onClick={() => {

                        navigator.clipboard.writeText(caseDetail?.id ?? "N/A");
                    }}>
                        Case #{truncateFromMiddle(id)}{

                            account?.address == caseDetail?.investigator && <CiEdit onClick={() => { setOpen(true) }} color='orange' className='cursor-pointer' />
                        }
                    </p>
                    <div>
                        <Badge className='cursor-pointer' onClick={() => { account?.address == caseDetail?.investigator && setOpenStatus(true) }} variant={status == "ACTIVE" ? "active" : status == "CLOSED" ? "closed" : "deleted"}>{status}</Badge>
                    </div>
                </div>
                <p>
                    <span className=''>
                        {caseDetail?.title || '__'}
                    </span>
                </p>
            </div>
            <BasicCaseInfo caseDetail={caseDetail} hardware={hardware} device={device} network={network} log={log} />
            <DetailTable investigator={caseDetail?.investigator} caseId={id} />
        </div>
    )
}

export default page