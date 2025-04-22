"use client";
import { Button } from "@/components/ui/button";
import CustomTable from "@/components/ui/custom-table";
import InfoBox from "@/components/ui/info-box";
import { abi } from "@/core/abi";
import { AccountContext } from "@/core/context/account.context";
import { caseColumns } from "@/core/table-column/case-column";
import { ethers } from "ethers";
import { useContext } from "react";


export default function Home() {
  const { account, setAccount } = useContext(AccountContext);

  let data = Array.from({ length: 25 }, (_, i) => {
    return {
      id: "728ed52f",
      title: "title" + i,
      description: "description",
      status: "pending",
      createdAt: "2023-10-01",
    }
  })

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contractAddress = "0x217A7086aECbCFA9c8D02022D99e355b74A9368A";
        const contractABI = abi;

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setAccount({
          address: address,
          signer: signer,
          contract: contract
        });

      } catch (error) {
        console.error("User rejected request", error);
      }
    } else {
      console.error("No Metamask detected");
    }
  }




  return (
    <>
      {

        account ? <div>

          <div className={`flex justify-between gap-4 my-6 `}>
            <InfoBox title="My account" data={[{
              title: "Nickname",
              value: "Nickname"
            },
            {
              title: "Total cases",
              value: "12"
            },
            {
              title: "Closed cases",
              value: "2"
            },
            {
              title: "Created at",
              value: Date.now().toString()
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
          <div>
            <CustomTable searchKey="id" btnName="Add" onBtnClicked={(data: any) => {
              setAccount({
                ...account,
                address: "123123"
              })
            }} columns={caseColumns} title="All cases" data={data} />

          </div>

        </div> :
          <div className="flex flex-col items-center justify-center h-full ">

            <Button onClick={() => {
              connectWallet()
            }}>Connect</Button>
          </div>
      }
    </>
  );
}
