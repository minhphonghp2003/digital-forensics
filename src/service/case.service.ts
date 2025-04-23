export let createCase = async ({ contract, title, description }: any) => {
    const tx = await contract.createCase(title, description);
    await tx.wait();
    return tx;
};
export let getCase = async ({ contract, caseId }: any) => {
    return await contract.casesMap(caseId);
};
export let getCaseLogIds = async ({ contract, caseId }: any) => {
    return await contract.getCaseLogIds(caseId);
};

export let getCaseDeviceIds = async ({ contract, caseId }: any) => {
    return await contract.getCaseDeviceIds(caseId);
};

export let getCaseNetworkIds = async ({ contract, caseId }: any) => {
    return await contract.getCaseNetworkIds(caseId);
};

export let getCaseHardwareIds = async ({ contract, caseId }: any) => {
    return await contract.getCaseHardwareIds(caseId);
};


// Get hardware IDs linked to a case
export let getHardwareIdsByCase = async ({ contract, caseId }: any) => {
    return await contract.caseHardwareMap(caseId);
};

// Get device IDs linked to a case
export let getDeviceIdsByCase = async ({ contract, caseId }: any) => {
    return await contract.caseDeviceMap(caseId);
};

// Get network IDs linked to a case
export let getNetworkIdsByCase = async ({ contract, caseId }: any) => {
    return await contract.caseNetworkMap(caseId);
};

// Get log IDs linked to a case
export let getLogIdsByCase = async ({ contract, caseId }: any) => {
    return await contract.caseLogMap(caseId);
};
export let updateCase = async ({
    contract,
    caseId,
    title,
    description,
}: any) => {
    const tx = await contract.updateCase(caseId, title, description);
    await tx.wait();
    return tx;
};

// Update Case Status
export let updateCaseStatus = async ({
    contract,
    caseId,
    newStatus,
}: any) => {
    const tx = await contract.updateCaseStatus(caseId, newStatus);
    await tx.wait();
    return tx;
};