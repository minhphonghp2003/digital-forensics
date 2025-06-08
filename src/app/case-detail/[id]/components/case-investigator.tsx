import TextInput from '@/components/form/text-input'
import CustomTable from '@/components/ui/custom-table'
import { AccountContext } from '@/core/context/account.context'
import { Investigator } from '@/core/model/investigator/investigator.model'
import { invColumns } from '@/core/table-column/investigator-column'
import { getCaseInvestigatorIds } from '@/service/case.service'
import { addInvestigatorToCase, getInvestigator } from '@/service/investigator.service'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { checkIsOwner } from '@/service/ether.service'
import { Button } from 'components/ui/button'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

function CaseInvestigators({ caseId, investigator, }: { caseId: any, investigator: any, }) {
    let { account } = useContext(AccountContext)
    let [open, setOpen] = useState(false)
    let [isOwner, setOwner] = useState(false)
    let [inv, setInv] = useState<Investigator[] | null>(null)
    let [newInv, setNewInv] = useState<{
        address: any,
    }>({
        address: "",
    })
    let fetchDetail = async () => {
        if (account?.contract) {
            let ids = await getCaseInvestigatorIds({ contract: account.contract, caseId })
            let isContractOwner = await checkIsOwner(account.contract,account.address)
            let result = []
            result = await Promise.all(ids.map(async (e: any) => {
                let res = await getInvestigator(account.contract, e)
                return {

                    nickname: res.nickname,
                    address: e
                }
            }));

            setInv(result)
            setOwner(isContractOwner)
        }

    }
    useEffect(() => {
        fetchDetail()
        account && account.contract.on("InvestigatorAdded", (caseId: any, evidenceType: any, evidenceId: any) => {
            fetchDetail()
        });
    }, [account])
    async function handleAddInvestigator(e: any) {
        e.preventDefault();
        try {

            let tx = await addInvestigatorToCase({ contract: account.contract, caseId, investigator: newInv.address })
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
        <div className=''><CustomTable title="Investigators" columns={invColumns} data={inv?.map((e: Investigator) => {
            return {
                nickname: e.nickname,
                address: e.address,
            }
        })} searchKey={'address'}
            extra={
                isOwner && <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger asChild>
                        <Button variant="outline">Add investigator</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                        <DialogHeader>
                            <DialogTitle>Add investigator</DialogTitle>
                            <DialogDescription>
                                Add new investigator to the system. Please fill in the details below.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddInvestigator}>

                            <TextInput required title={'Account'} onChange={(e: any) => {
                                setNewInv({
                                    ...newInv,
                                    address: e.target.value
                                })
                            }} />
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

export default CaseInvestigators