import InfoBox from '@/components/ui/info-box';
import { Case } from '@/core/model/case/case.model';
import { Investigator } from '@/core/model/investigator/investigator.model';
import { formatDate, truncateFromMiddle } from '@/utils/helper';

function BasicInfo({ user, account, cases }: { cases: Case[] | null, user: Investigator | null, account: any }) {
    cases?.sort((a, b) => {
        return Number(b.createdDate) - Number(a.createdDate)
    })
    let latestCase = cases?.[0] || null;
    return (
        <div className={`flex justify-between gap-4 my-6 `}>
            <InfoBox title="My account" data={[{
                title: "Nickname",
                value: user?.nickname || "N/A"
            },
            {
                title: "Address",
                value: truncateFromMiddle(account?.address) || "N/A",
                copyText: account?.address || "N/A"

            },
            {
                title: "Total cases",
                value: cases?.length || "0"
            },
            {
                title: "Closed cases",
                value: cases?.filter((item) => item.status == 0).length || "0"
            },
            {
                title: "Created at",
                value: user?.createdAt || "N/A"
            },

            ]} className=" w-full" ></InfoBox>
            <InfoBox title="Latest case" data={[{
                title: "ID",
                value: truncateFromMiddle(latestCase?.id.toString(),) || "N/A",
                copyText: latestCase?.id.toString() || "N/A"
            },
            {
                title: "Title",
                value: latestCase?.title || "N/A"
            },
            {
                title: "Description",
                value: latestCase?.description || "N/A"
            },
            {
                title: "Created at",
                value: latestCase?.createdDate ? formatDate(Number(latestCase?.createdDate ?? 0) * 1000) : "N/A"
            },

            ]} className=" w-full" ></InfoBox>

        </div>
    )
}

export default BasicInfo