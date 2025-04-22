"use client"
import { Separator } from '@/components/ui/separator'
import { Tab } from '@/core/model/application/tabs.model'
import { useState } from 'react'

function CustomTab({ tabs }: { tabs: Tab[] }) {
    const [activeTab, setActiveTab] = useState(1)
    return (
        <>
            <div className='flex gap-3 my-2'>
                {
                    tabs?.map((tab, index) => {
                        return (
                            <p key={index} onClick={() => setActiveTab(index + 1)} className={` font-semibold cursor-pointer ${activeTab === index + 1 ? 'text-orange-500' : 'text-gray-500'}`}>
                                {tab.title}
                            </p>
                        )
                    })
                }

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