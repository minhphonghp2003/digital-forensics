
// done
export let getInvestigator = async (contract: any, address: string) => {
    if (!address) {
        return null
    }
    const investigator = await contract.investigatorsMap(address);
    return investigator;
}
// done
export let updateInvestigator = async (contract: any, nickname: string) => {
    const tx = await contract.updateInvestigator(nickname);
    await tx.wait();
    return tx;
}

// done
export let addInvestigator = async ({ contract, investigator, nickname }: any) => {
    const tx = await contract.addInvestigator(investigator, nickname);
    await tx.wait();
    return tx;
}


// done
export let getCaseIdsByInvestigator = async ({ contract, investigator }: any) => {
    return await contract.getCaseIdsByInvestigator(investigator);
};

