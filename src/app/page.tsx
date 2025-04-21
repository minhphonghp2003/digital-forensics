"use client";
import CustomTable from "@/components/ui/custom-table";
import InfoBox from "@/components/ui/info-box";
import { caseColumns } from "@/core/table-column/case-column";
import { evidenceColumns } from "@/core/table-column/evidence-column";


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
      <div className={`flex justify-between gap-4  `}>
        <InfoBox title="My account" data={[{
          title: "title1",
          value: "value"
        },
        {
          title: "title2",
          value: "value"
        },
        {
          title: "title3",
          value: "value"
        }]} className=" w-full" ></InfoBox>
        <InfoBox title="Latest case" data={[{
          title: "title1",
          value: "value"
        },
        {
          title: "title2",
          value: "value"
        },
        {
          title: "title3",
          value: "value"
        }]} className=" w-full" ></InfoBox>

      </div>
      <div>
        <CustomTable searchKey="id" btnName="Add" onBtnClicked={(data: any) => {
          console.log("hi");
        }} columns={caseColumns} title="All cases" data={data} />
        <CustomTable searchKey="id" btnName="Add" columns={evidenceColumns} title="All hardware" data={data} />
      </div>
    </>
  );
}
