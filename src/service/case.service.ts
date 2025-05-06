// done
export let createCase = async ({ contract, title, description }: any) => {
    const tx = await contract.createCase(title, description);
    await tx.wait();
    return tx;
};
// done
export let getCaseById = async ({ contract, caseId }: any) => {
    return await contract.getCase(caseId);
};
// done
export let getCaseLogIds = async ({ contract, caseId }: any) => {
    return await contract.getCaseLogIds(caseId);
};
// done 
export let getCaseDeviceIds = async ({ contract, caseId }: any) => {
    return await contract.getCaseDeviceIds(caseId);
};

// done
export let getCaseNetworkIds = async ({ contract, caseId }: any) => {
    return await contract.getCaseNetworkIds(caseId);
};

// done
export let getCaseHardwareIds = async ({ contract, caseId }: any) => {
    return await contract.getCaseHardwareIds(caseId);
};


// done
export let updateCaseStatus = async ({
    contract,
    caseId,
    newStatus,
}: any) => {
    const tx = await contract.updateCaseStatus(caseId, newStatus);
    await tx.wait();
    return tx;
};
// done
export let getCasesByIds = async ({
    contract,
    caseIds,
}: any) => {
    const cases = await Promise.all(
        caseIds.map(async (caseId: string) => {
            return await getCaseById({ contract, caseId });
        })
    );
    return cases;
}