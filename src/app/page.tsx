"use client";
import AllCase from "@/app/components/all-case";
import BasicInfo from "@/app/components/basic-info";
import { AccountContext } from "@/core/context/account.context";
import { useContext } from "react";


export default function Home() {
  const { account, setAccount } = useContext(AccountContext);

  return (
    <>
      {
        account ? <div>
          <BasicInfo />
          <div>
            <AllCase />
          </div>
        </div> :
          <div className="flex flex-col items-center justify-center h-full ">
            Connect to your wallet to continue
          </div>
      }
    </>
  );
}
