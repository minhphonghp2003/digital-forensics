
"use client"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountContext } from "@/core/context/account.context";
import { Investigator } from "@/core/model/investigator/investigator.model";
import { checkIsOwner, connectWallet } from "@/service/ether.service";
import { addInvestigator, getInvestigator, updateInvestigator } from "@/service/investigator.service";
import { Button } from "components/ui/button";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
function NavBar() {

    const { account, setAccount } = useContext(AccountContext);
    const [user, setUser] = useState<Investigator | null>(null)
    const [nickname, setNickname] = useState<string>("")
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [addAddress, setAddAddress] = useState<any>();
    const [addNickname, setAddNickname] = useState<any>();
    const [isOwner, setIsOwner] = useState(false)
    const fetchUser = async () => {
        if (account) {
            let result = await getInvestigator(account.contract, account.address);
            if (result) {
                setNickname(result.nickname);
                setUser(result);
                let checkOwner = await checkIsOwner(account.contract, account.address);
                setIsOwner(checkOwner);
            }
        }
    }
    useEffect(() => {
        if (account) {
            fetchUser()
        }
    }, [account])
    async function connect() {
        try {
            let { address, signer, contract }: any = await connectWallet();
            setAccount({
                address: address,
                signer: signer,
                contract: contract
            });

        } catch (error) {
            console.error("User rejected request", error);
        }

    }
    let handleUpdate = async () => {
        if (account) {
            let tx = await updateInvestigator(account.contract, nickname);
            setOpen(false);
            fetchUser()

        }
    }
    async function handleAddInvestigator() {
        let tx = await addInvestigator({
            contract: account.contract,
            investigator: addAddress,
            nickname: addNickname
        });
        setOpenAdd(false);

    }

    return (
        <nav>

            <div className="fixed top-0  w-full z-40 flex justify-between items-center p-4 bg-white shadow-md ">
                <h1 className="text-2xl font-bold">
                    <Link href="/" className="flex items-center gap-2 ">
                        Phong Digital Forensics
                    </Link>
                </h1>
                {

                    account ? <ul className="flex space-x-4 items-center">
                        <li>
                            <Input placeholder="Search..." />
                        </li>
                        <li>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">{user?.nickname ?? "Anonymous"}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onClick={() => { setOpen(true) }}>
                                            Profile
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    {
                                        isOwner && <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={() => { setOpenAdd(true) }}>Add investigator</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    }

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                        <li>

                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit profile</DialogTitle>

                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Nickname
                                            </Label>
                                            <Input value={nickname} onChange={e => setNickname(e.target.value)} id="name" className="col-span-3" />
                                        </div>

                                    </div>
                                    <DialogFooter>
                                        <Button onClick={() => {
                                            handleUpdate()

                                        }} type="submit">Save changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Dialog open={openAdd && isOwner} onOpenChange={setOpenAdd}>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Add investigator</DialogTitle>

                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Address
                                            </Label>
                                            <Input value={addAddress} onChange={e => setAddAddress(e.target.value)} id="name" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Nickname
                                            </Label>
                                            <Input value={addNickname} onChange={e => setAddNickname(e.target.value)} id="name" className="col-span-3" />
                                        </div>

                                    </div>
                                    <DialogFooter>
                                        <Button onClick={() => {
                                            handleAddInvestigator()

                                        }} type="submit">Save changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </li>
                    </ul> : <Button onClick={() => {
                        connect()
                    }}>Connect</Button>
                }
            </div> :
        </nav>
    )
}

export default NavBar