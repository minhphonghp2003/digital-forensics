import { Status } from "@/app/utils/enum";

export interface Device {
    id: number;
    caseId: number;
    name: string;
    deviceType: string;
    os: string;
    osVersion: string;
    mac: string;
    ip: string;
    lastBootTime: number;
    status: Status;
  }