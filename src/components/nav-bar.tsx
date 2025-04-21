

import { Input } from "@/components/ui/input"
function NavBar() {
    return (
        <nav>
            <div className="fixed top-0  w-full z-40 flex justify-between items-center p-4 bg-white shadow-md ">
                <h1 className="text-2xl font-bold">Phong Digital forensics</h1>
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Input placeholder="Search..." />
                    </li>
                    <li>
                        Phong
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar