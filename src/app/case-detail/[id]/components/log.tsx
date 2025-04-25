import CustomTable from '@/components/ui/custom-table'
import { evidenceColumns } from '@/core/table-column/evidence-column'
import React from 'react'

function LogDetail({ caseId }: { caseId: any }) {
    return (
        <div className=''><CustomTable title="Log" columns={evidenceColumns} data={[
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

export default LogDetail