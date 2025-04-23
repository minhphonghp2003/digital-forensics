import { Status } from "@/utils/enum";

export interface Case {
    id: string;
    title: string;
    createdDate: number;
    description: string;
    investigator: string; // address => string (Ethereum address)
    status: Status;
  }