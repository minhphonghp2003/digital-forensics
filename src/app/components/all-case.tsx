"use client"
import CustomTable from '@/components/ui/custom-table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AccountContext } from '@/core/context/account.context';
import { Case } from '@/core/model/case/case.model';
import { caseColumns } from '@/core/table-column/case-column';
import { createCase } from '@/service/case.service';
import { Status } from '@/utils/enum';
import { formatDateFromBigint, truncateFromMiddle } from '@/utils/helper';
import { Button } from 'components/ui/button';
import { useContext, useState } from 'react';

function AllCase({ cases }: { cases?: Case[] | null }) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    let { account, setAccount } = useContext(AccountContext)
    let data = cases?.map((item: Case) => {
        return {
            id: item.id,
            description: item.description,
            status: Status[item.status],
            title: item.title,
            investigator: truncateFromMiddle(item.investigator),
            createdDate: formatDateFromBigint(item.createdDate),
        }
    })
    let handleAddCase = async () => {
        // Handle add case logic here

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
                    <Dialog open={open} onOpenChange={setOpen} >
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
                                <Button onClick={handleAddCase} type="submit">Submit</Button>
                            </DialogFooter>
                        </DialogContent>

                    </Dialog>
                }
            />

        </>
    )
}

export default AllCase