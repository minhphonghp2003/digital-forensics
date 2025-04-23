"use client";
import BasicCaseInfo from '@/app/case-detail/[id]/components/basic-info';
import DetailTable from '@/app/case-detail/[id]/components/detail-table';
import Title from '@/app/case-detail/[id]/components/title';
import { useParams } from 'next/navigation';

function page() {
    const params = useParams<{ id: string }>()
    let id = params.id
    return (
        <div>
            <Title id={id} />
            <BasicCaseInfo />
            <DetailTable />
        </div>
    )
}

export default page