import { Status } from "@/utils/enum";

export interface Case {
    id: bigint;
    title: string;
    createdDate: number;
    description: string;
    investigator: string; // address => string (Ethereum address)
    status: Status;
  }