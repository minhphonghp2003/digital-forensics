import { Status } from "@/utils/enum";

export interface Hardware {
  id: string;
  fileName: string;
  caseId: string;
  description: string;
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
