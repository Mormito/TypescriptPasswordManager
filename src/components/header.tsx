import Link from "next/link";
import DataFormModal from "./dataFormModal";
import Logout from "./logout";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";


export default function Header(){

    return (
        <div className="w-full flex flex-row justify-center items-center gap-8 lg:gap-10 p-5 border-b-2">
            <Logout />
            <Link href={'/account'}><Button><Settings />Settings</Button></Link>
            <DataFormModal />

        </div>
    );
}
