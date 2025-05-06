import { SystemLogSeverity } from "@/utils/enum";

export interface SystemLog {
    id: number;
    timestamp: number;
    actor: string;
    action: string;
    severity: SystemLogSeverity;
    detail: string;
}