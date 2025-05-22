
'use client'
import InfoBox from '@/components/ui/info-box'
import { AccountContext } from '@/core/context/account.context'
import { Case } from '@/core/model/case/case.model'
import { Device } from '@/core/model/edivence/device.model'
import { Hardware } from '@/core/model/edivence/hardware.model'
import { Log } from '@/core/model/edivence/log.model'
import { Network } from '@/core/model/edivence/network.model'
import { Investigator } from '@/core/model/investigator/investigator.model'
import { getCaseById } from '@/service/case.service'
import { getDevice, getHardware, getLog, getNetwork } from '@/service/evidence.service'
import { getInvestigator } from '@/service/investigator.service'
import { LogType, SecurityLevel, Status } from '@/utils/enum'
import { formatDate } from '@/utils/helper'
import { useRouter, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

function SearchPage() {
    const searchParams = useSearchParams()
    const search = searchParams.get('searchKey')
    const router = useRouter();
    let { account } = useContext(AccountContext)
    let [investigator, setInvestigator] = useState<Investigator | null>(null)
    let [caseDetail, setCaseDetail] = useState<Case | null>(null)
    let [hardware, setHardware] = useState<Hardware | null>(null)
    let [network, setNetwork] = useState<Network | null>(null)
    let [log, setLog] = useState<Log | null>(null)
    let [device, setDevice] = useState<Device | null>(null)
    let fetchData = async () => {
        if (search) {
            try {
                let investigatorResult = await getInvestigator(account.contract, search)
                if (investigatorResult) {
                    setInvestigator(investigatorResult)
                } else {
                    setInvestigator(null)
                }
            } catch (error) {
                setInvestigator(null)
            }

            try {
                let caseDetail = await getCaseById({ contract: account.contract, caseId: search })
                if (caseDetail) {
                    setCaseDetail(caseDetail)
                }
                else {
                    setCaseDetail(null)
                }
            } catch (error) {
                setCaseDetail(null)
            }
            try {
                let result = await getHardware({ contract: account.contract, hardwareId: search })
                if (result) {
                    setHardware(result)
                } else {
                    setHardware(null)
                }
            }
            catch (error) {
                setHardware(null)
            }

            try {
                let result = await getLog({ contract: account.contract, logId: search })
                if (result) {
                    setLog(result)
                } else {
                    setLog(null)
                }
            }
            catch (error) {
                setLog(null)
            }

            try {
                let result = await getDevice({ contract: account.contract, deviceId: search })
                if (result) {
                    setDevice(result)
                } else {
                    setDevice(null)
                }
            }
            catch (error) {
                setDevice(null)
            }

            try {
                let result = await getNetwork({ contract: account.contract, networkId: search })
                if (result) {
                    setNetwork(result)
                } else {
                    setNetwork(null)
                }
            }
            catch (error) {
                setNetwork(null)
            }
        }


    }
    useEffect(() => {
        if (account && search) {
            fetchData()
        }
        console.log(search, caseDetail, investigator, hardware);

    }, [account, search])
    return (
        <div className='flex flex-col gap-8'>
            <p className='text-xl text-orange-400'> Search result for: {search}</p>
            {
                investigator && <div className='hover:shadow-xl hover:cursor-pointer' onClick={
                    () => {
                        router.push("/profile/" + search)
                    }
                }>


                    <InfoBox title="Investigator" data={[{
                        title: "Nickname",
                        value: investigator?.nickname || "N/A"
                    },
                    {
                        title: "Address",
                        value: (search ?? "") || "N/A",
                        copyText: search || "N/A"

                    },
                    {
                        title: "Created at",
                        value: investigator?.createdAt || "N/A"
                    },

                    ]} className=" w-full" ></InfoBox>
                </div>
            }
            {

                caseDetail?.id ? <div className='hover:shadow-xl hover:cursor-pointer' onClick={
                    () => {
                        router.push("/case-detail/" + caseDetail.id)
                    }
                }>
                    <InfoBox title="Case detail" data={[
                        {
                            title: "ID",
                            value: caseDetail.id
                        },
                        {
                            title: "Title",
                            value: caseDetail.title
                        },
                        {
                            title: "Description",
                            value: caseDetail?.description || '__'
                        },
                        {
                            title: "Status",
                            value: Status[caseDetail.status]
                        },
                        
                        {
                            title: "Created at",
                            value: formatDate(Number(caseDetail?.createdDate) * 1000) || '__'
                        },

                    ]} className=" w-full" ></InfoBox>
                </div> : <div></div>
            }
            {
                hardware?.id ?
                    <div className='hover:shadow-xl hover:cursor-pointer' onClick={
                        () => {
                            router.push("/case-detail/" + hardware.caseId)
                        }
                    }>

                        <InfoBox title="Hardware" data={[
                            {
                                title: "ID",
                                value: hardware.id
                            },
                            {
                                title: "File name",
                                value: hardware.fileName
                            },
                            {
                                title: "File path",
                                value: hardware.filePath
                            },
                            {
                                title: "File size",
                                value: hardware.fileSize
                            },
                            {
                                title: "File type",
                                value: hardware.fileType
                            },
                            {
                                title: "Hash",
                                value: hardware?.hash || '__'
                            },
                            {
                                title: "Disk type",
                                value: hardware?.diskType || '__'
                            },
                            {
                                title: "Status",
                                value: Status[hardware.status]
                            },
                            {
                                title: "Case",
                                value: hardware.caseId,
                            },
                            {
                                title: "Created at",
                                value: formatDate(Number(hardware?.createdDate) * 1000) || '__'
                            },

                            {
                                title: "Access at",
                                value: formatDate(Number(hardware?.accessDate) * 1000) || '__'
                            },
                            {
                                title: "Modified at",
                                value: formatDate(Number(hardware?.modifiedDate) * 1000) || '__'
                            },

                        ]} className=" w-full" ></InfoBox> </div> : ""

            }
            {
                device?.id ?
                    <div className='hover:shadow-xl hover:cursor-pointer' onClick={
                        () => {
                            router.push("/case-detail/" + device.caseId)
                        }
                    }>
                        <InfoBox title="Device" data={[
                            {
                                title: "ID",
                                value: device.id
                            },
                            {
                                title: "Name",
                                value: device.name
                            },
                            {
                                title: "Type",
                                value: device.deviceType
                            },
                            {
                                title: "IP",
                                value: device.ip
                            },
                            {
                                title: "MAC",
                                value: device.mac
                            },
                            {
                                title: "Os",
                                value: device?.os || '__'
                            },
                            {
                                title: "Os version",
                                value: device?.osVersion || '__'
                            },
                            {
                                title: "Status",
                                value: Status[device.status]
                            },
                            {
                                title: "Case",
                                value: device.caseId,
                            },
                            {
                                title: "Last boot time",
                                value: formatDate(Number(device?.lastBootTime) * 1000) || '__'
                            },



                        ]} className=" w-full" ></InfoBox>
                    </div>
                    : ""
            }
            {
                log?.id ?
                    <div className='hover:shadow-xl hover:cursor-pointer' onClick={
                        () => {
                            router.push("/case-detail/" + log.caseId)
                        }
                    }>
                        <InfoBox title="Log" data={[
                            {
                                title: "ID",
                                value: log.id
                            },
                            {
                                title: "Source",
                                value: log.source
                            },
                            {
                                title: "Log type",
                                value: LogType[log.logType]
                            },
                            {
                                title: "Security level",
                                value: SecurityLevel[log.securityLevel]
                            },
                            {
                                title: "Status",
                                value: Status[log.status]
                            },
                            {
                                title: "Case",
                                value: log.caseId,
                            },
                            {
                                title: "Timestamp",
                                value: formatDate(Number(log?.timestamp) * 1000) || '__'
                            },



                        ]} className=" w-full" ></InfoBox>
                    </div>
                    : ""
            }
            {
                network?.id ?
                    <div className='hover:shadow-xl hover:cursor-pointer' onClick={
                        () => {
                            router.push("/case-detail/" + network.caseId)
                        }
                    }>
                        <InfoBox title="Network" data={[
                            {
                                title: "ID",
                                value: network.id
                            },
                            {
                                title: "Source Ip",
                                value: network.sourceIp
                            },
                            {
                                title: "Source port",
                                value: network.sourcePort
                            },
                            {
                                title: "Destination Ip",
                                value: network.destIp
                            },
                            {
                                title: "Destination port",
                                value: network.destPort
                            },
                            {
                                title: "Protocol",
                                value: network.protocol
                            },
                            {
                                title: "Datasize",
                                value: network.dataSize
                            },
                            {
                                title: "Status",
                                value: Status[network.status]
                            },
                            {
                                title: "Case",
                                value: network.caseId,
                            },
                            {
                                title: "Timestamp",
                                value: formatDate(Number(network?.timestamp) * 1000) || '__'
                            },



                        ]} className=" w-full" ></InfoBox>
                    </div>
                    : ""
            }
        </div>
    )
}

export default SearchPage