export let getAllSystemLogs = async ({ contract }: any) => {
    const tx = await contract.getAllSystemLogs();
    await tx.wait();
    return tx;
};
export let getSystemLog = async ({ contract, logId }: any) => {
    return await contract.systemLogs(logId);
};
