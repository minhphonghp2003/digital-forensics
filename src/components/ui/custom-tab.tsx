"use client"
import FileInputForm from '@/components/form/file-input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Tab } from '@/core/model/application/tabs.model'
import { useState } from 'react'

function CustomTab({ tabs }: { tabs: Tab[] }) {
    const [activeTab, setActiveTab] = useState(1)
    const [open, setOpen] = useState(false)
    function handleVerify(): void {
        throw new Error('Function not implemented.')
    }

    return (
        <>
            <div className='flex justify-between'>

                <div className='flex gap-3 my-2'>
                    {
                        tabs?.map((tab, index) => {
                            return (
                                <p key={index} onClick={() => setActiveTab(index + 1)} className={` font-semibold cursor-pointer ${activeTab === index + 1 ? 'text-orange-400' : 'text-gray-500'}`}>
                                    {tab.title}
                                </p>
                            )
                        })
                    }
                </div>
                <div className=''>
                    <Dialog open={open} onOpenChange={setOpen} >
                        <DialogTrigger asChild>
                            <Button variant="outline">Verify</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px]">
                            <DialogHeader>
                                <DialogTitle>Verify evidence</DialogTitle>
                                <DialogDescription>
                                    Verify your evidence against collected evidences
                                </DialogDescription>
                            </DialogHeader>
                            <div className='flex flex-col gap-2'>
                                <FileInputForm title='Choose file' onChange={(e: any) => {

                                }} />

                            </div>
                            <DialogFooter>
                                <Button onClick={handleVerify} type="submit">Submit</Button>
                            </DialogFooter>
                        </DialogContent>

                    </Dialog>
                </div>
            </div>
            <Separator className='my-3' />
            <div>
                {
                    tabs?.map((tab, index) => {
                        return (
                            <div key={index} >
                                {index + 1 === activeTab && tab.content}
                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}

export default CustomTab