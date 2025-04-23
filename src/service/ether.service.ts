import { abi } from "@/core/abi/abi";
import { ethers } from "ethers";

export let connectWallet = async () => {
    if (window.ethereum) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
            const contractABI = abi;

            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            return {
                address: address,
                signer: signer,
                contract: contract
            };

        } catch (error) {
            console.error("User rejected request", error);

        }

    } else {
        alert("Please install MetaMask!");
    }
}
export let checkConnection = async () => {

    if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
            return {
                address: accounts[0].address,
                signer: await provider.getSigner(),
                contract: new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string, abi, await provider.getSigner())
            };
        }
    }
    return null;
}
export let getOwner = async (contract: any) => {
    const owner = await contract.owner();
    return owner;
}
export let checkIsOwner = async (contract: any, address: string) => {
    const owner = await getOwner(contract);
    return owner.toLowerCase() === address.toLowerCase();
}