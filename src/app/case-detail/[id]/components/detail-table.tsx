import CustomTab from '@/components/ui/custom-tab'
import CustomTable from '@/components/ui/custom-table'
import { evidenceColumns } from '@/core/table-column/evidence-column'

function DetailTable() {
    return (
        <div>
            <div>
                <CustomTab tabs={[
                    {
                        title: "Hardware",
                        content: <div className=''><CustomTable title="Hardware" columns={evidenceColumns} data={[
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
                    },
                    {
                        title: "Device",
                        content: <div className=''><CustomTable title="Device" columns={evidenceColumns} data={[
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
                    },
                    {
                        title: "Network",
                        content: <div className=''><CustomTable title="Network" columns={evidenceColumns} data={[
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
                    },
                    {
                        title: "Log",
                        content: <div className=''><CustomTable title="Log" columns={evidenceColumns} data={[
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
                    }
                ]} />
            </div>
        </div>
    )
}

export default DetailTable