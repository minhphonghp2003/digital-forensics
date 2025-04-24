import CustomTable from '@/components/ui/custom-table';
import { Case } from '@/core/model/case/case.model';
import { caseColumns } from '@/core/table-column/case-column';
import { Status } from '@/utils/enum';
import { formatDateFromBigint, truncateFromMiddle } from '@/utils/helper';

function AllCase({ cases }: { cases?: Case[] | null }) {
    let data = cases?.map((item: Case) => {
        return {
            id: item.id,
            description: item.description,
            status: Status[item.status],
            title: item.title,
            investigator: truncateFromMiddle(item.investigator),
            createdDate: formatDateFromBigint(item.createdDate),
        }
    })
    return (
        <CustomTable searchKey="id" btnName="Add" onBtnClicked={(data: any) => {

        }} columns={caseColumns} title="All cases" data={data} />
    )
}

export default AllCase