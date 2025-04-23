"use client"
import { AccountContext } from "@/core/context/account.context";
import { Account } from "@/core/model/application/account.model";
import { checkConnection } from "@/service/ether.service";
import React, { useEffect, useState } from 'react';

declare global {
    interface Window {
        ethereum?: any;
    }
}

function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [account, setAccount] = useState<Account | null>();
    useEffect(() => {

        checkWalletConnection();
    }, []);
    async function checkWalletConnection() {
        let { address, signer, contract }: any = await checkConnection()
        setAccount({
            address: address,
            signer: signer,
            contract: contract
        });
    }

    return (
        <div className=''>
            <AccountContext value={{
                account, setAccount
            }}>

                {children}
            </AccountContext>
        </div>
    )
}

export default AppContextProvider