"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';


function UpdateStatusDialog({ openStatus, setOpenStatus, defaultStatus, handleUpdateStatus, title, name }: any) {
    let [status, setStatus] = useState<any>(defaultStatus ?? 0)
    return (
        <Dialog open={openStatus} onOpenChange={setOpenStatus} >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>

                </DialogHeader>
                <Select onValueChange={(e) => {
                    setStatus(e)
                }} >
                    <div className='flex justify-between'>

                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={title} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{name}</SelectLabel>
                                <SelectItem value="0">Closed</SelectItem>
                                <SelectItem value="1">Deleted</SelectItem>
                                <SelectItem value="2">Active</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        <Button onClick={() => { handleUpdateStatus(status) }} type="submit">Submit</Button>
                    </div>
                </Select>
            </DialogContent>

        </Dialog>
    )
}

export default UpdateStatusDialog