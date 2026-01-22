import { ChangePasswordForm } from "@/components/user/changePassword";
import Logout from "@/components/logout";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ChangeDataForm } from "@/components/user/changeData";

export default function AccountPage(){
    return (
        <div className="w-full h-full flex justify-center items-center">
            
            <div className="w-full h-full mx-100 mt-40 border p-4">
                <h1 className="text-3xl font-semibold mb-2">Sua conta</h1>
                <div className="flex flex-row gap-3">
                    <ChangeDataForm info="email" />
                    <ChangeDataForm info="user" />
                    <ChangePasswordForm />
                    <Link href={'/dashboard'}><Button><ChevronLeft />Voltar</Button></Link>
                </div>
            </div>
            
        </div>

    );
}