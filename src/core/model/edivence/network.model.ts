import { Status } from "@/app/utils/enum";

export interface Network {
    id: number;
    timestamp: number;
    caseId: number;
    sourceIp: string;
    destIp: string;
    sourcePort: number;
    destPort: number;
    protocol: string;
    dataSize: number;
    status: Status;
}