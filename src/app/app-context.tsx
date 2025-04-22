"use client"
import { abi } from "@/core/abi";
import { AccountContext } from "@/core/context/account.context";
import { Account } from "@/core/model/application/account.model";
import { ethers } from "ethers";
import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
        ethereum?: any;
    }
}

function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [account, setAccount] = useState<Account | null>();
    useEffect(() => {

        checkConnection();
    }, []);
    async function checkConnection() {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);

            const accounts = await provider.listAccounts();
            if (accounts.length > 0) {
                setAccount({
                    address: accounts[0].address,
                    signer: await provider.getSigner(),
                    contract: new ethers.Contract("0x217A7086aECbCFA9c8D02022D99e355b74A9368A", abi, await provider.getSigner())

                });


            }
        }
    }

        return (
        <div className=''>
            <AccountContext value={{
                account, setAccount
            }}>

                {children}
            </AccountContext>
            {/* <button onClick={connectWallet}>
                {account ? `Connected: ${account}` : "Connect Wallet"}
            </button>
            {account && <button onClick={interactWithContract}>Interact with Contract</button>}
            {contractData && <p>Contract Data: {contractData?.toString()}</p>} */}
        </div>
    )
}

export default AppContextProvider