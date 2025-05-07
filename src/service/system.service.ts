export let getAllSystemLogs = async ({ contract }: any) => {
    
    const tx = await contract.getAllSystemLogs();
    return tx;
};
export let getSystemLog = async ({ contract, logId }: any) => {
    return await contract.systemLogs(logId);
};
export let createSystemLog = async ({
    contract, action, detail, severity
}: any) => {
    const tx = await contract.addSystemLog(action, detail, severity);
    await tx.wait();
    return tx;
};