"use client"
import CaseInvestigators from '@/app/case-detail/[id]/components/case-investigator'
import DeviceDetail from '@/app/case-detail/[id]/components/device'
import HardwareDetail from '@/app/case-detail/[id]/components/hardware'
import LogDetail from '@/app/case-detail/[id]/components/log'
import NetworkDetail from '@/app/case-detail/[id]/components/network'
import CustomTab from '@/components/ui/custom-tab'
import { Hardware } from '@/core/model/edivence/hardware.model'
import { getCaseHardwareIds } from '@/service/case.service'
import { getHardware } from '@/service/evidence.service'
import { hashFile } from '@/utils/helper'
import { useState } from 'react'
import { toast } from 'sonner'

function DetailTable({ caseId, investigator, account }: { caseId: any, investigator: any, account: any }) {
    let [message, setMessage] = useState<any>(null)
    let [isError, setError] = useState(false)
    let fetchHardwares = async () => {
        if (account?.contract) {

            let ids = await getCaseHardwareIds({ contract: account.contract, caseId })
            let result = []
            result = await Promise.all(ids.map((e: any) => getHardware({ contract: account.contract, hardwareId: e })));

            return result
        }
        return []
    }

    let handleVerify = async (file: any) => {
        let hash = await hashFile(file)
        let hardwares: Hardware[] = await fetchHardwares()
        let isValid = hardwares.some(e => e.hash == hash)
        if (isValid) {
            setMessage("Valid evidence")
            setError(false)
            toast("Validated", {
                description: "This evidence is validated"
            })
        } else {

            setMessage("Invalid evidence")
            setError(true)
            toast("Invalid evidence", {
                description: "This evidence is corrupted"
            })

        }

    }
    return (
        <div>
            <div>
                <CustomTab onVerified={handleVerify} onFileChange={() => { setMessage(null) }} tabs={[
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
                    },
                    {
                        title: "Investigator",
                        content: <CaseInvestigators caseId={caseId} investigator={investigator} />
                    }
                ]} >
                    {
                        message && <p className={`${isError ? "text-red-500" : "text-green-500"}`}>
                            {message}
                        </p>
                    }
                </CustomTab>
            </div>
        </div>
    )
}

export default DetailTable