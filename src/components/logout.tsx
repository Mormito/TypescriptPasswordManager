'use client';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

export default function Logout(){
    const router = useRouter();

    async function logout(){
        await fetch("/api/logout", {
          method: "POST",
        });
        toast.success('Logout realizado com êxito');
        router.push("/");
    }

    return (
        <Button onClick={() => logout()}><LogOutIcon />Logout</Button>
    );
}