import { LogType, SecurityLevel, Status } from "@/utils/enum";

export interface Log {
    id: string;
    caseId: string;
    timestamp: number;
    source: string;
    securityLevel: SecurityLevel;
    logType: LogType;
    status: Status;
}