export const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "investigator",
                "type": "address"
            }
        ],
        "name": "CaseAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            }
        ],
        "name": "CaseDeleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "deviceId",
                "type": "uint256"
            }
        ],
        "name": "DeviceDeleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "evidenceType",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "evidenceId",
                "type": "uint256"
            }
        ],
        "name": "EvidenceAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "evidenceType",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "evidenceId",
                "type": "uint256"
            }
        ],
        "name": "EvidenceUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "hardwareId",
                "type": "uint256"
            }
        ],
        "name": "HardwareDeleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "investigator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "nickname",
                "type": "string"
            }
        ],
        "name": "InvestigatorAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "logId",
                "type": "uint256"
            }
        ],
        "name": "LogDeleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "networkId",
                "type": "uint256"
            }
        ],
        "name": "NetworkDeleted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "deviceType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "os",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "osVersion",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "mac",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "ip",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "lastBootTime",
                "type": "uint256"
            }
        ],
        "name": "addDevice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "fileName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "fileType",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "fileSize",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "hash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "createdDate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "modifiedDate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "accessDate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "diskType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "filePath",
                "type": "string"
            }
        ],
        "name": "addHardware",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "investigator",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "nickname",
                "type": "string"
            }
        ],
        "name": "addInvestigator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "source",
                "type": "string"
            },
            {
                "internalType": "enum PhongStorage.SecurityLevel",
                "name": "securityLevel",
                "type": "uint8"
            },
            {
                "internalType": "enum PhongStorage.LogType",
                "name": "logType",
                "type": "uint8"
            }
        ],
        "name": "addLog",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "sourceIp",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "destIp",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "sourcePort",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "destPort",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "protocol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "dataSize",
                "type": "uint256"
            }
        ],
        "name": "addNetwork",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "caseDeviceMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "caseHardwareMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "caseLogMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "caseNetworkMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "casesMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "createdDate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "investigator",
                "type": "address"
            },
            {
                "internalType": "enum PhongStorage.status",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            }
        ],
        "name": "createCase",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "devicesMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "deviceType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "os",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "osVersion",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "mac",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "ip",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "lastBootTime",
                "type": "uint256"
            },
            {
                "internalType": "enum PhongStorage.status",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "prefix",
                "type": "string"
            }
        ],
        "name": "generateId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            }
        ],
        "name": "getCaseDeviceIds",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            }
        ],
        "name": "getCaseHardwareIds",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "investigator",
                "type": "address"
            }
        ],
        "name": "getCaseIdsByInvestigator",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            }
        ],
        "name": "getCaseLogIds",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            }
        ],
        "name": "getCaseNetworkIds",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "hardwaresMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "fileName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "fileType",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "fileSize",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "hash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "createdDate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "modifiedDate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "accessDate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "diskType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "filePath",
                "type": "string"
            },
            {
                "internalType": "enum PhongStorage.status",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "investigatorCaseMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "investigatorsMap",
        "outputs": [
            {
                "internalType": "string",
                "name": "nickname",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "createdAt",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "logsMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "source",
                "type": "string"
            },
            {
                "internalType": "enum PhongStorage.SecurityLevel",
                "name": "securityLevel",
                "type": "uint8"
            },
            {
                "internalType": "enum PhongStorage.LogType",
                "name": "logType",
                "type": "uint8"
            },
            {
                "internalType": "enum PhongStorage.status",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "networksMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "sourceIp",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "destIp",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "sourcePort",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "destPort",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "protocol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "dataSize",
                "type": "uint256"
            },
            {
                "internalType": "enum PhongStorage.status",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            }
        ],
        "name": "updateCase",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "enum PhongStorage.status",
                "name": "newStatus",
                "type": "uint8"
            }
        ],
        "name": "updateCaseStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deviceId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "deviceType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "os",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "osVersion",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "mac",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "ip",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "lastBootTime",
                "type": "uint256"
            }
        ],
        "name": "updateDevice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deviceId",
                "type": "uint256"
            },
            {
                "internalType": "enum PhongStorage.status",
                "name": "newStatus",
                "type": "uint8"
            }
        ],
        "name": "updateDeviceStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "hardwareId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "fileName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "fileType",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "fileSize",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "hash",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "createdDate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "modifiedDate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "accessDate",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "diskType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "filePath",
                "type": "string"
            }
        ],
        "name": "updateHardware",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "hardwareId",
                "type": "uint256"
            },
            {
                "internalType": "enum PhongStorage.status",
                "name": "newStatus",
                "type": "uint8"
            }
        ],
        "name": "updateHardwareStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "nickname",
                "type": "string"
            }
        ],
        "name": "updateInvestigator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "logId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "source",
                "type": "string"
            },
            {
                "internalType": "enum PhongStorage.SecurityLevel",
                "name": "securityLevel",
                "type": "uint8"
            },
            {
                "internalType": "enum PhongStorage.LogType",
                "name": "logType",
                "type": "uint8"
            }
        ],
        "name": "updateLog",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "logId",
                "type": "uint256"
            },
            {
                "internalType": "enum PhongStorage.status",
                "name": "newStatus",
                "type": "uint8"
            }
        ],
        "name": "updateLogStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "networkId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "sourceIp",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "destIp",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "sourcePort",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "destPort",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "protocol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "dataSize",
                "type": "uint256"
            }
        ],
        "name": "updateNetwork",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "caseId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "networkId",
                "type": "uint256"
            },
            {
                "internalType": "enum PhongStorage.status",
                "name": "newStatus",
                "type": "uint8"
            }
        ],
        "name": "updateNetworkStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]