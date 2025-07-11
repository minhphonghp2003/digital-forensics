"use client"
import CustomTable from '@/components/ui/custom-table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AccountContext } from '@/core/context/account.context';
import { Case } from '@/core/model/case/case.model';
import { caseColumns } from '@/core/table-column/case-column';
import { createCase } from '@/service/case.service';
import { checkIsOwner } from '@/service/ether.service';
import { Status } from '@/utils/enum';
import { formatDate, truncateFromMiddle } from '@/utils/helper';
import { Button } from 'components/ui/button';
import { useContext, useEffect, useState } from 'react';

function AllCase({ cases, userAddress }: { userAddress: any, cases?: Case[] | null }) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [isOwner, setIsOwner] = useState(false)
    const [description, setDescription] = useState("")
    let { account, setAccount } = useContext(AccountContext)
    useEffect(()=>{
        if(account){
            checkOwner(account)
        }
    },[account])
    let checkOwner =async (account:any)=>{
        setIsOwner(await checkIsOwner(account.contract,userAddress))
    }
    let data = cases?.map((item: Case) => {
        return {
            id: item.id,
            description: truncateFromMiddle(item.description, 50),
            status: Status[item.status],
            title: item.title,
            // investigator: truncateFromMiddle(item.investigator),
            createdDate: formatDate(Number(item.createdDate) * 1000),
        }
    })
    let handleAddCase = async (e: any) => {
        // Handle add case logic here
        e.preventDefault();
        if (!account) return;
        let tx = await createCase({
            contract: account.contract,
            description: description,
            title: title,
        })
        if (tx) {
            setOpen(false)
        }

    }
    return (

        <>

            <CustomTable searchKey="id" btnName="Add" columns={caseColumns} title="All cases" data={data}
                extra={
                    isOwner && <Dialog open={open} onOpenChange={setOpen} >
                        <DialogTrigger asChild>
                            <Button variant="outline">Add case</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add case</DialogTitle>
                                <DialogDescription>
                                    Add a new case to the system. Please fill in the details below.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleAddCase}>

                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Title
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <Input id="name" required value={title} onChange={(e) => { setTitle(e.target.value) }} className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Description
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <Input id="username" required value={description} onChange={(e) => { setDescription(e.target.value) }} className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Submit</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>

                    </Dialog>
                }
            />

        </>
    )
}

export default AllCase