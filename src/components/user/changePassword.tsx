"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { trpc } from "@/lib/trpc";
import { ChangePassword, changePasswordSchema } from "@/packages/schema/changePassword";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function ChangePasswordForm({ data }: { data?: any }) {
const utils = trpc.useUtils();
  const { 
    register, //registrar valores
    handleSubmit, //valida antes de enviar
    formState: {errors} //arranjo de erros
        } = useForm<ChangePassword>({
        resolver: zodResolver(changePasswordSchema),
  });

  // drizzle change password by id -> trpc change password by id
  
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button>Mudar senha</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar senha</DialogTitle>
          </DialogHeader>
            <form className="w-full h-full flex flex-col justify-center items-center gap-4">
                <div className="w-full h-full flex flex-col gap-4">
                <div>
                    <Input placeholder="Senha"  /> {/* ...register("encryptedPassword") */}
                    <div className="text-red-500 text-xs">
                        {errors?.password?.message}
                    </div>
                </div>

                <div>
                    <Input placeholder="Repita a senha"  /> {/* ...register("encryptedPassword") */}
                    <div className="text-red-500 text-xs">
                        {errors?.password2?.message}
                    </div>
                </div>
                </div>
            <Button type="submit">Mudar senha</Button>

            </form>

        </DialogContent>
    </Dialog>
  )
}
