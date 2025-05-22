
// Add Log
export let createLog = async ({ contract, caseId, source, securityLevel, logType }: any) => {
    const tx = await contract.addLog(caseId, source, securityLevel, logType);
    await tx.wait();
    return tx;
};

// Add Network
export let createNetwork = async ({
    contract, caseId, sourceIp, destIp, sourcePort, destPort, protocol, dataSize
}: any) => {
    const tx = await contract.addNetwork(caseId, sourceIp, destIp, sourcePort, destPort, protocol, dataSize);
    await tx.wait();
    return tx;
};

// Add Device
export let createDevice = async ({
    contract, caseId, name, deviceType, os, osVersion, mac, ip, lastBootTime
}: any) => {
    const tx = await contract.addDevice(caseId, name, deviceType, os, osVersion, mac, ip, lastBootTime);
    await tx.wait();
    return tx;
};

// Add Hardware
export let createHardware = async ({
    contract, caseId, fileName, fileType, fileSize, hash,
    createdDate, modifiedDate, accessDate, diskType, filePath,description
}: any) => {
    const tx = await contract.addHardware(caseId, fileName, fileType, fileSize, hash,
        createdDate, modifiedDate, accessDate,description, diskType, filePath);
    await tx.wait();
    return tx;
};

// -----------------
// Log info by ID
export let getLog = async ({ contract, logId }: any) => {
    return await contract.logsMap(logId);
};

// Network info by ID
export let getNetwork = async ({ contract, networkId }: any) => {
    return await contract.networksMap(networkId);
};

// Device info by ID
export let getDevice = async ({ contract, deviceId }: any) => {
    return await contract.devicesMap(deviceId);
};

// Hardware info by ID
export let getHardware = async ({ contract, hardwareId }: any) => {
    return await contract.hardwaresMap(hardwareId);
};


// Update Log Status
export let updateLogStatus = async ({
    contract,
    caseId,
    logId,
    newStatus,
}: any) => {
    const tx = await contract.updateLogStatus(caseId, logId, newStatus);
    await tx.wait();
    return tx;
};


// Update Network Status
export let updateNetworkStatus = async ({
    contract,
    caseId,
    networkId,
    newStatus,
}: any) => {
    const tx = await contract.updateNetworkStatus(caseId, networkId, newStatus);
    await tx.wait();
    return tx;
};
// Update Device Status
export let updateDeviceStatus = async ({
    contract,
    caseId,
    deviceId,
    newStatus,
}: any) => {
    const tx = await contract.updateDeviceStatus(caseId, deviceId, newStatus);
    await tx.wait();
    return tx;
};


// Update Hardware Status
export let updateHardwareStatus = async ({
    contract,
    caseId,
    hardwareId,
    newStatus,
}: any) => {
    const tx = await contract.updateHardwareStatus(caseId, hardwareId, newStatus);
    await tx.wait();
    return tx;
};