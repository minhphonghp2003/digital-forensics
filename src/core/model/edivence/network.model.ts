import { Status } from "@/utils/enum";

export interface Network {
    id: string;
    timestamp: number;
    caseId: string;
    sourceIp: string;
    destIp: string;
    sourcePort: number;
    destPort: number;
    protocol: string;
    dataSize: number;
    status: Status;
}