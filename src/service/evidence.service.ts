export class EvidenceService {
    private contract: any;
    constructor(contract: any) {
        this.contract = contract;
    }

    getEvidence = async (address: string) => {
        const contract = window.ethereum?.contract;
        if (!contract) {
            return null
        }
        const evidence = await contract.evidencesMap(address);
        return evidence;
    }
}