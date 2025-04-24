import InfoBox from '@/components/ui/info-box';
import { AccountContext } from '@/core/context/account.context';
import { Case } from '@/core/model/case/case.model';
import { Investigator } from '@/core/model/investigator/investigator.model';
import { getCasesByIds } from '@/service/case.service';
import { getCaseIdsByInvestigator, getInvestigator } from '@/service/investigator.service';
import { useContext, useEffect, useState } from 'react';

function BasicInfo() {
    let { account, setAccount } = useContext(AccountContext)
    let [user, setUser] = useState<Investigator | null>(null)
    let [cases, setCases] = useState<Case[] | null>(null)
    let fetchUser = async () => {
        if (!account) return;
        let userResult = await getInvestigator(account.contract, account?.address || "");
        let caseResult = await getCaseIdsByInvestigator({ contract: account.contract, investigator: account?.address || "", });
        caseResult = await getCasesByIds({ contract: account.contract, caseIds: caseResult });
        setCases(caseResult);
        setUser(userResult);
    }
    useEffect(() => {
        fetchUser()

    }, [account])

    return (
        <div className={`flex justify-between gap-4 my-6 `}>
            <InfoBox title="My account" data={[{
                title: "Nickname",
                value: user?.nickname || "N/A"
            },
            {
                title: "Address",
                value: account?.address || "N/A"
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
                value: "728ed52f"
            },
            {
                title: "Title",
                value: "Phong first case"
            },
            {
                title: "Description",
                value: "This is a description of the case that is being created. It is a long description that will be used to test the case creation process."
            },
            {
                title: "Created at",
                value: Date.now().toString()
            },

            ]} className=" w-full" ></InfoBox>

        </div>
    )
}

export default BasicInfo