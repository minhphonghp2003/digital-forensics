import { LogType, SecurityLevel, Status } from "@/app/utils/enum";

export interface Log {
    id: number;
    caseId: number;
    timestamp: number;
    source: string;
    securityLevel: SecurityLevel;
    logType: LogType;
    status: Status;
}