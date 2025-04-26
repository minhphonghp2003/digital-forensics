"use client"
import TextInput from '@/components/form/text-input'
import CustomTable from '@/components/ui/custom-table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { AccountContext } from '@/core/context/account.context'
import { Network } from '@/core/model/edivence/network.model'
import { networkColumns } from '@/core/table-column/network-column'
import { getCaseNetworkIds } from '@/service/case.service'
import { createNetwork, getNetwork } from '@/service/evidence.service'
import { Status } from '@/utils/enum'
import { Button } from 'components/ui/button'
import { useContext, useEffect, useState } from 'react'
function NetworkDetail({ caseId }: { caseId: any }) {
    // sourceIp, destIp, sourcePort, destPort, protocol, dataSize
    let { account } = useContext(AccountContext)
    let [open, setOpen] = useState(false)
    let [network, setnetwork] = useState<Network[] | null>(null)
    let [newNetwork, setNewNetwork] = useState<{
        sourceIp: string,
        destIp: string,
        sourcePort: any,
        destPort: string,
        protocol: any,
        dataSize: any,
    }>({
        sourceIp: "",
        destIp: "",
        sourcePort: "",
        destPort: "",
        protocol: "",
        dataSize: 0,
    })
    let fetchDetail = async () => {
        if (account?.contract) {

            let ids = await getCaseNetworkIds({ contract: account.contract, caseId })
            let result = []
            result = await Promise.all(ids.map((e: any) => getNetwork({ contract: account.contract, networkId: e })));
            setnetwork(result)
        }
    }
    useEffect(() => {
        fetchDetail()
    }, [account])
    async function handleAddNetwork() {
        if (account?.contract) {
            let tx = await createNetwork({ contract: account.contract, caseId: caseId, ...newNetwork })
            if (tx) {
                setOpen(false)
                fetchDetail()
            }
        }
    }

    return (
        <div className=''><CustomTable title="network" columns={networkColumns} data={network?.map((e: Network) => {
            return {
                id: e.id,
                sourceIp: e.sourceIp,
                destIp: e.destIp,
                sourcePort: e.sourcePort,
                destPort: e.destPort,
                protocol: e.protocol,
                status: Status[e.status],
                timestamp: e.timestamp,
                caseId: e.caseId,
                dataSize: e.dataSize
            }
        })} searchKey={'id'}
            extra={
                <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger asChild>
                        <Button variant="outline">Add network</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                            <DialogTitle>Add network</DialogTitle>
                            <DialogDescription>
                                Add a new network to the system. Please fill in the details below.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-6'>
                                <div className='grow flex flex-col gap-2'>
                                    <TextInput title={'Source IP'} onChange={(e: any) => {
                                        setNewNetwork({
                                            ...newNetwork,
                                            sourceIp: e.target.value
                                        })
                                    }} />
                                    <TextInput title={'Destination IP'} onChange={(e: any) => {
                                        setNewNetwork({
                                            ...newNetwork,
                                            destIp: e.target.value
                                        })

                                    }} />
                                    <TextInput title={'Protocol'} onChange={(e: any) => {
                                        setNewNetwork({
                                            ...newNetwork,
                                            protocol: e.target.value
                                        })

                                    }} />
                                </div>
                                <div className='grow flex flex-col gap-2'>
                                    <TextInput title={'Source port'} onChange={(e: any) => {
                                        setNewNetwork({
                                            ...newNetwork,
                                            sourcePort: e.target.value
                                        })
                                    }} />
                                    <TextInput title={'Destination port'} onChange={(e: any) => {
                                        setNewNetwork({
                                            ...newNetwork,
                                            destPort: e.target.value
                                        })

                                    }} />
                                    <TextInput title={'Data size'} onChange={(e: any) => {
                                        setNewNetwork({
                                            ...newNetwork,
                                            dataSize: e.target.value
                                        })

                                    }} />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>

                            <Button onClick={handleAddNetwork} type="submit">Submit</Button>
                        </DialogFooter>
                    </DialogContent>

                </Dialog>
            }
        /></div>
    )
}

export default NetworkDetail