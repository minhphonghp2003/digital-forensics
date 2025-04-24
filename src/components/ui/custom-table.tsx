"use client"
import { DataTable } from '@/components/ui/data-table'
import { useState } from 'react'
import { BsBox } from 'react-icons/bs'

function CustomTable({ columns, data, title, extra, searchKey,
}: any) {
    let [open, setOpen] = useState(false)
    return (
        <div className=" shadow  rounded-xl mx-auto p-10">
            <p className='font-bold flex items-center gap-2 '> <BsBox color="orange" />{title}</p>
            <DataTable searchKey={searchKey} columns={columns} data={data}
                extraWidget={
                    <div>
                       {extra}
                    </div>
                }
            />
        </div>
    )
}

export default CustomTable