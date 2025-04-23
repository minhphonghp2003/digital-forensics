import { Status } from "@/app/utils/enum";

export interface Hardware {
    id: number;
    fileName: string;
    caseId: number;
    fileType: string;
    fileSize: number;
    hash: string;
    createdDate: number;
    modifiedDate: number;
    accessDate: number;
    diskType: string;
    filePath: string;
    status: Status;
  }
  