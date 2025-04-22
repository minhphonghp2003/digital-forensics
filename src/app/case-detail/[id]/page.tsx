"use client";
import CustomTab from '@/components/ui/custom-tab';
import CustomTable from '@/components/ui/custom-table';
import InfoBox from '@/components/ui/info-box';
import { evidenceColumns } from '@/core/table-column/evidence-column';
import { useParams } from 'next/navigation';
import { CiEdit } from "react-icons/ci";

function page() {
    const params = useParams<{ id: string }>()
    let id = params.id
    return (
        <div>
            <div className='flex justify-between text-lg items-center  my-4'>

                <p className='flex items-center gap-3 font-bold my-4 text-xl'>
                    Case #{id} <CiEdit color='orange' />

                </p>
                <p>
                    Title: <span className=''>
                        This is a title of the case that is being created. It is a long title that will be used to test the case creation process.
                    </span>
                </p>
            </div>
            <div className={`flex justify-between gap-4 my-6 `}>
                <InfoBox title="Overview" data={[{
                    title: "Description",
                    value: "This is a description of the case that is being created. It is a long description that will be used to test the case creation process."
                },
                {
                    title: "Created at",
                    value: "12"
                },
                {
                    title: "Investigator",
                    value: "2"
                },
                {
                    title: "Status",
                    value: "12/12/2005"
                },

                ]} className=" w-full" ></InfoBox>
                <InfoBox title="Evidence" data={[{
                    title: "Hardwares",
                    value: 1
                },
                {
                    title: "Devices",
                    value: 3
                },
                {
                    title: "Networks",
                    value: 5
                },
                {
                    title: "Logs",
                    value: 10
                },

                ]} className=" w-full" ></InfoBox>

            </div>
            <div>
                <CustomTab tabs={[
                    {
                        title: "Hardware",
                        content: <div className='text-gray-500'><CustomTable btnName="Add" title="Hardware" columns={evidenceColumns} data={[
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
                        content: <div className='text-gray-500'><CustomTable btnName="Add" title="Device" columns={evidenceColumns} data={[
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
                        content: <div className='text-gray-500'><CustomTable btnName="Add" title="Network" columns={evidenceColumns} data={[
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
                        content: <div className='text-gray-500'><CustomTable btnName="Add" title="Log" columns={evidenceColumns} data={[
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

export default page