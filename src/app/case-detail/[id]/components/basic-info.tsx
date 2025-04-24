"use client"
import InfoBox from '@/components/ui/info-box';
import { Case } from '@/core/model/case/case.model';
import { formatDateFromBigint, truncateFromMiddle } from '@/utils/helper';

function BasicCaseInfo({ caseDetail, hardware, device, network, log }: { caseDetail?: Case, hardware: any, device: any, network: any, log: any }) {


    return (
        <div>  <div className={`flex justify-between gap-4 my-6 `}>
            <InfoBox title="Overview" data={[{
                title: "Description",
                value: caseDetail?.description || '__'
            },
            {
                title: "Created at",
                value: formatDateFromBigint(caseDetail?.createdDate) || '__'
            },
            {
                title: "Investigator",
                value: truncateFromMiddle(caseDetail?.investigator) || '__',
                copyText: caseDetail?.investigator
            },

            ]} className=" w-full" ></InfoBox>
            <InfoBox title="Evidence" data={[{
                title: "Hardwares",
                value: hardware?.length ?? 0
            },
            {
                title: "Devices",
                value: device?.length ?? 0
            },
            {
                title: "Networks",
                value: network?.length ?? 0
            },
            {
                title: "Logs",
                value: log?.length ?? 0
            },

            ]} className=" w-full" ></InfoBox>

        </div></div>
    )
}

export default BasicCaseInfo