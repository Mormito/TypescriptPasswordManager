import { Plus } from "lucide-react";
import DataFormModal from "./dataFormModal";

export default function Header(){
    return (
        <div className="w-full flex flex-row justify-center items-center gap-8 lg:gap-10 p-5 border-b-2">
            <DataFormModal />
        </div>
    );
}