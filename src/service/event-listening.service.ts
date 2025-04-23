
// Event listener for contract events
export const listenToEvents = (contract: any) => {
    // Listen to CaseDeleted event
    contract.on("CaseDeleted", (caseId: any) => {
        console.log(`Case Deleted: ${caseId.toString()}`);
        // Handle CaseDeleted event, e.g., update state or notify user
    });

    // Listen to LogDeleted event
    contract.on("LogDeleted", (logId: any) => {
        console.log(`Log Deleted: ${logId.toString()}`);
        // Handle LogDeleted event, e.g., update state or notify user
    });

    // Listen to NetworkDeleted event
    contract.on("NetworkDeleted", (networkId: any) => {
        console.log(`Network Deleted: ${networkId.toString()}`);
        // Handle NetworkDeleted event, e.g., update state or notify user
    });

    // Listen to DeviceDeleted event
    contract.on("DeviceDeleted", (deviceId: any) => {
        console.log(`Device Deleted: ${deviceId.toString()}`);
        // Handle DeviceDeleted event, e.g., update state or notify user
    });

    // Listen to HardwareDeleted event
    contract.on("HardwareDeleted", (hardwareId: any) => {
        console.log(`Hardware Deleted: ${hardwareId.toString()}`);
        // Handle HardwareDeleted event, e.g., update state or notify user
    });
};
