import { LogOutIcon, Plus } from "lucide-react";
import DataFormModal from "./dataFormModal";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function Header(){
    const router = useRouter();

    async function logout(){
        await fetch("/api/logout", {
          method: "POST",
        });
        toast.success('Logout realizado com êxito');
        router.push("/");
    }

    return (
        <div className="w-full flex flex-row justify-center items-center gap-8 lg:gap-10 p-5 border-b-2">
            <Button onClick={() => logout()}><LogOutIcon /><>Logout</></Button>
            <DataFormModal />
        </div>
    );
}
