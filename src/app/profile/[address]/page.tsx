
"use client"
import AllCase from "@/app/components/all-case";
import InfoBox from "@/components/ui/info-box";
import { AccountContext } from "@/core/context/account.context";
import { Case } from "@/core/model/case/case.model";
import { Investigator } from "@/core/model/investigator/investigator.model";
import { getCasesByIds } from "@/service/case.service";
import { getCaseIdsByInvestigator, getInvestigator } from "@/service/investigator.service";
import { formatDate, truncateFromMiddle } from "@/utils/helper";
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from "react";



function ProfilePage() {
  const params = useParams<{ address: string }>()
  let address = params.address
  let { account, setAccount } = useContext(AccountContext)
  let [user, setUser] = useState<Investigator | null>(null)
  let [cases, setCases] = useState<Case[] | null>(null)
  let fetchUser = async () => {
    if (!account) return;
    let userResult = await getInvestigator(account.contract, address || "");
    setUser(userResult);
    if (userResult) {
      fetchCases()
    }
  }
  let fetchCases = async () => {

    let caseResult = await getCaseIdsByInvestigator({ contract: account.contract, investigator: address || "", });
    caseResult = await getCasesByIds({ contract: account.contract, caseIds: caseResult });
    setCases(caseResult);
  }
  useEffect(() => {
    fetchUser()
    account && account.contract.on("CaseAdded", (caseId: any, title: any, investigator: any) => {
      investigator == address && fetchCases()
    });

  }, [account])
  cases?.sort((a, b) => {
    return Number(b.createdDate) - Number(a.createdDate)
  })
  let latestCase = cases?.[0] || null;
  return (
    <>
      {
        account ? <div>
          <div className={`flex justify-between gap-4 my-6 `}>
            <InfoBox title="Investigator information" data={[{
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
              value: formatDate(Number(latestCase?.createdDate ?? 0) * 1000) || "N/A"
            },

            ]} className=" w-full" ></InfoBox>

          </div>
          <div>
            <AllCase cases={cases} />
          </div>
        </div> :
          <div className="flex flex-col items-center justify-center h-full ">
            Connect to your wallet to continue
          </div>
      }
    </>
  )
}

export default ProfilePage