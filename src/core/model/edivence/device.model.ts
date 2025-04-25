import { Status } from "@/utils/enum";

export interface Device {
  id: string;
  caseId: string;
  name: string;
  deviceType: string;
  os: string;
  osVersion: string;
  mac: string;
  ip: string;
  lastBootTime: number;
  status: Status;
}