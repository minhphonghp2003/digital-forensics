
"use client"

import { Input } from "@/components/ui/input";
import { abi } from "@/core/abi";
import { AccountContext } from "@/core/context/account.context";
import { Button } from "components/ui/button";
import { ethers } from "ethers";
import Link from "next/link";
import { useContext } from "react";
function NavBar() {

    const { account, setAccount } = useContext(AccountContext);
    async function connectWallet() {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                const contractAddress = "0x217A7086aECbCFA9c8D02022D99e355b74A9368A";
                const contractABI = abi;

                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                setAccount({
                    address: address,
                    signer: signer,
                    contract: contract
                });

            } catch (error) {
                console.error("User rejected request", error);
            }
        } else {
            console.error("No Metamask detected");
        }
    }
    return (
        <nav>

            <div className="fixed top-0  w-full z-40 flex justify-between items-center p-4 bg-white shadow-md ">
                <h1 className="text-2xl font-bold">
                    <Link href="/" className="flex items-center gap-2 ">
                        Phong Digital forensics
                    </Link>
                </h1>
                {

                    account ? <ul className="flex space-x-4 items-center">
                        <li>
                            <Input placeholder="Search..." />
                        </li>
                        <li>
                            Phong
                        </li>
                    </ul> : <Button onClick={() => {
                        connectWallet()
                    }}>Connect</Button>
                }
            </div> :
        </nav>
    )
}

export default NavBar