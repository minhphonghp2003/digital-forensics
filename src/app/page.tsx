"use client";
import AllCase from "@/app/components/all-case";
import BasicInfo from "@/app/components/basic-info";
import { AccountContext } from "@/core/context/account.context";
import { Case } from "@/core/model/case/case.model";
import { Investigator } from "@/core/model/investigator/investigator.model";
import { getCasesByIds } from "@/service/case.service";
import { getCaseIdsByInvestigator, getInvestigator } from "@/service/investigator.service";
import { useContext, useEffect, useState } from "react";


export default function Home() {
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
    <>
      {
        account ? <div>
          <BasicInfo cases={cases} user={user} account={account} />
          <div>
            <AllCase cases={cases} />
          </div>
        </div> :
          <div className="flex flex-col items-center justify-center h-full ">
            Connect to your wallet to continue
          </div>
      }
    </>
  );
}
