"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { trpc } from "@/lib/trpc";
import { ChangePassword, changePasswordSchema } from "@/packages/schema/user";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ChangePasswordForm({ data }: { data?: any }) {
  const router = useRouter();
  
  const utils = trpc.useUtils();
    const { 
      register, //registrar valores
      handleSubmit, //valida antes de enviar
      formState: {errors} //arranjo de erros
          } = useForm<ChangePassword>({
          resolver: zodResolver(changePasswordSchema),
    });

  const changePassword = trpc.user.changePassword.useMutation({
    onSuccess: async () => {
      toast.success('Senha alterada com sucesso');
      logout();
    },

    onError: async (err) => {
      toast.error('Falha ao alterar senha');
      console.log(err);
    },
  });
  
  async function logout(){
      await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/");
  }
  
  function onSubmit(payload: ChangePassword) {
    changePassword.mutate(payload);
  }

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button>Alterar senha</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar senha</DialogTitle>
          </DialogHeader>
            <form className="w-full h-full flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full h-full flex flex-col gap-4">
                <div>
                    <Input placeholder="Senha" {...register("password")} /> 
                    <div className="text-red-500 text-xs">
                        {errors?.password?.message}
                    </div>
                </div>

                <div>
                    <Input placeholder="Repita a senha" {...register("password2")} /> 
                    <div className="text-red-500 text-xs">
                        {errors?.password2?.message}
                    </div>
                </div>
                </div>
            <Button type="submit">Alterar senha</Button>

            </form>

        </DialogContent>
    </Dialog>
  )
}
