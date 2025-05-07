"use client"

import { Badge } from "@/components/ui/badge"
import { AccountContext } from "@/core/context/account.context"
import { SystemLog } from "@/core/model/application/system-log.model"
import { getAllSystemLogs } from "@/service/system.service"
import { SystemLogSeverity } from "@/utils/enum"
import { formatDate, formatTime, truncateFromMiddle } from "@/utils/helper"
import { useContext, useEffect, useState } from "react"
import { FaRegCopy } from "react-icons/fa"

function LogPage() {
    let { account, } = useContext(AccountContext)
    let [logs, setLogs] = useState<SystemLog[]>([])
    let fetchData = async () => {
        if (!account) return;
        let logsResult: any = await getAllSystemLogs({ contract: account.contract });
        let result = [...logsResult]
        setLogs(result.reverse());

    }
    useEffect(() => {
        fetchData()
    }, [account])
    return (
        <div>{
            logs?.map((e, index) => <div key={e.id} className={` ${index % 2 != 0 && 'bg-gray-200'} p-2 my-1 flex justify-between items-center`}>
                <div className="flex flex-col items-start">

                    <p className="font-bold">
                        {formatDate(Number(e.timestamp) * 1000)}
                    </p>
                    <p>
                        {formatTime(Number(e.timestamp) * 1000)}
                    </p>
                </div>
                <div className="grow mx-10">
                    <p className="font-bold">
                        {e.action}
                    </p>
                    <p>
                        {e.detail}
                    </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <Badge variant={e.severity == SystemLogSeverity.INFO ? 'active' : e.severity == SystemLogSeverity.WARNING ? "closed" : "deleted"}>{SystemLogSeverity[e.severity]}</Badge>
                    <div className="flex gap-1 items-center">
                        {truncateFromMiddle(e.actor, 20)}<FaRegCopy className="cursor-pointer" onClick={() => {
                            navigator.clipboard.writeText(e.actor);
                        }} color="orange" />
                    </div>
                </div>
            </div>)
        }
        </div>
    )
}

export default LogPage