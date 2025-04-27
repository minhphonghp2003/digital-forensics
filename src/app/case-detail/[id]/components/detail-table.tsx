"use client"
import DeviceDetail from '@/app/case-detail/[id]/components/device'
import HardwareDetail from '@/app/case-detail/[id]/components/hardware'
import LogDetail from '@/app/case-detail/[id]/components/log'
import NetworkDetail from '@/app/case-detail/[id]/components/network'
import CustomTab from '@/components/ui/custom-tab'

function DetailTable({ caseId, investigator }: { caseId: any, investigator: any }) {

    return (
        <div>
            <div>
                <CustomTab tabs={[
                    {
                        title: "Hardware",
                        content: <HardwareDetail caseId={caseId} investigator={investigator} />
                    },
                    {
                        title: "Device",
                        content: <DeviceDetail caseId={caseId} investigator={investigator} />
                    },
                    {
                        title: "Network",
                        content: <NetworkDetail caseId={caseId} investigator={investigator} />
                    },
                    {
                        title: "Log",
                        content: <LogDetail caseId={caseId} investigator={investigator} />
                    }
                ]} />
            </div>
        </div>
    )
}

export default DetailTable