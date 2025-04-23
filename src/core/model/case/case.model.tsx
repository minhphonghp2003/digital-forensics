import { Status } from "@/app/utils/enum";

export interface Case {
    id: number;
    title: string;
    createdDate: number;
    description: string;
    investigator: string; // address => string (Ethereum address)
    status: Status;
  }