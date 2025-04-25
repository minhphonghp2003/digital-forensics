import CustomTable from '@/components/ui/custom-table'
import { evidenceColumns } from '@/core/table-column/evidence-column'
import React from 'react'

function NetworkDetail({ caseId }: { caseId: any }) {
    return (
        <div className=''><CustomTable title="Network" columns={evidenceColumns} data={[
            {
                id: "728ed52f",
                title: "title",
                description: "description",
                status: "pending",
                createdAt: "2023-10-01",
            },
            {
                id: "728ed52f",
                title: "title",
                description: "description",
                status: "pending",
                createdAt: "2023-10-01",
            },
            {
                id: "728ed52f",
                title: "title",
                description: "description",
                status: "pending",
                createdAt: "2023-10-01",
            },
        ]} searchKey={'id'} /></div>
    )
}

export default NetworkDetail