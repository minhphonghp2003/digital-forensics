import { Case } from "@/core/model/case/case.model";
import { Device } from "@/core/model/edivence/device.model";
import { Hardware } from "@/core/model/edivence/hardware.model";
import { Investigator } from "@/core/model/investigator/investigator.model";
import { Log, Network } from "ethers";

export interface InvestigationReport {
    caseInfo: Case;
    investigatorInfo: Investigator;
    logs: Log[];
    devices: Device[];
    networks: Network[];
    hardwares: Hardware[];
}