"use client"
import { abi } from "@/core/abi";
import { ethers } from "ethers";
import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
        ethereum?: any;
    }
}

function AppContext({ children }: { children: React.ReactNode }) {
    const [account, setAccount] = useState<any>('');
    const [signer, setSigner] = useState<any>();
    const [contractData, setContractData] = useState<any>(null);

    useEffect(() => {

        checkConnection();
    }, []);
    async function checkConnection() {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);

            const accounts = await provider.listAccounts();
            console.log(accounts);

            if (accounts.length > 0) {
                setAccount(accounts[0].address);
            }
        }
    }

    // async function connectWallet() {
    //     if (window.ethereum) {
    //         try {
    //             const provider = new ethers.BrowserProvider(window.ethereum);
    //             await provider.send("eth_requestAccounts", []);
    //             const signer = await provider.getSigner();
    //             const address = await signer.getAddress();
    //             console.log(signer, address);

    //             // Get the balance of an account (by address or ENS name, if supported by network)
    //             let balance = await provider.getBalance(address);
    //             setAccount(address);
    //         } catch (error) {
    //             console.error("User rejected request", error);
    //         }
    //     } else {
    //         console.error("No Metamask detected");
    //     }
    // }

    async function interactWithContract() {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contractAddress = "0x217A7086aECbCFA9c8D02022D99e355b74A9368A";
        const contractABI = abi;

        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        try {
            const data = await contract.owner();
            setContractData(data);
        } catch (error) {
            console.error("Error interacting with contract:", error);
        }
    }

    return (
        <div className=''>
            {children}
            {/* <button onClick={connectWallet}>
                {account ? `Connected: ${account}` : "Connect Wallet"}
            </button> */}
            {account && <button onClick={interactWithContract}>Interact with Contract</button>}
            {contractData && <p>Contract Data: {contractData?.toString()}</p>}
        </div>
    )
}

export default AppContext