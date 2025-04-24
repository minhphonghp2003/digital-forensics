import CustomTable from '@/components/ui/custom-table';
import { Case } from '@/core/model/case/case.model';
import { caseColumns } from '@/core/table-column/case-column';

function AllCase({ cases }: { cases?: Case[] | null }) {
    return (
        <CustomTable searchKey="id" btnName="Add" onBtnClicked={(data: any) => {

        }} columns={caseColumns} title="All cases" data={cases} />
    )
}

export default AllCase