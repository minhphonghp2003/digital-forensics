"use client";
import CustomTable from "@/components/ui/custom-table";
import InfoBox from "@/components/ui/info-box";
import { caseColumns } from "@/core/table-column/case-column";


export default function Home() {

  let data = Array.from({ length: 25 }, (_, i) => {
    return {
      id: "728ed52f",
      title: "title" + i,
      description: "description",
      status: "pending",
      createdAt: "2023-10-01",
    }
  })


  return (
    <>
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
          console.log("hi");
        }} columns={caseColumns} title="All cases" data={data} />

      </div>
    </>
  );
}
