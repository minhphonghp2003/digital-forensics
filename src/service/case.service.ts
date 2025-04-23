
export let getCase = async (contract: any, address: string) => {
    const caseData = await contract.casesMap(address);
    return caseData;
}