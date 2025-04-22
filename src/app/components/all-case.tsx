import CustomTable from '@/components/ui/custom-table'
import { caseColumns } from '@/core/table-column/case-column'
import React from 'react'

function AllCase() {

    let data = Array.from({ length: 25 }, (_, i) => {
        return {
            id: "728ed52f",
            title: "title" + i,
            description: "description",
            status: "pending",
            createdAt: "2023-10-01",
        }
    })


    return (
        <div> <CustomTable searchKey="id" btnName="Add" onBtnClicked={(data: any) => {

        }} columns={caseColumns} title="All cases" data={data} /></div>
    )
}

export default AllCase