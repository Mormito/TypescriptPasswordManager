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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChangeData, changeDataSchema } from "@/packages/schema/user";

export function ChangeDataForm({ info }: { info: string }) {
  const router = useRouter();
  
  const utils = trpc.useUtils();
    const { 
      register, //registrar valores
      handleSubmit, //valida antes de enviar
      formState: {errors} //arranjo de erros
          } = useForm<ChangeData>({
          resolver: zodResolver(changeDataSchema),
    });

  async function logout(){
      await fetch("/api/logout", {
        method: "POST",
      });
      router.push("/");
  }
    
  const changeEmail = trpc.user.changeEmail.useMutation({
    onSuccess: async () => {
      toast.success('Email alterado com sucesso');
      logout();
    },

    onError: async (err) => {
      toast.error('Falha ao alterar o email');
      console.log(err);
    },
  });

  const changeUser = trpc.user.changeUsername.useMutation({
    onSuccess: async () => {
      toast.success('Nome de usuário alterado com sucesso');
      logout();
    },

    onError: async (err) => {
      toast.error('Falha ao alterar o email');
      console.log(err);
    },
  });
  
  function onSubmit(payload: ChangeData) {
    if (info == "user"){
        changeUser.mutate(payload);
    } else if (info == "email"){
        changeEmail.mutate(payload);
    }
  }
  
  // eu sei que essa não é a forma mais eficiente, mas é o que sei fazer sem fritar minha cabeça...
    let inputType = "";
    let trigger = "";
    let oldInputPlaceholder = "";
    let inputPlaceholder = "";
    let inputPlaceholder2 = "";

    if (info === "email") {
      inputType = "email";
      trigger = "Alterar email";
      oldInputPlaceholder = "Email atual";
      inputPlaceholder = "Novo email";
      inputPlaceholder2 = "Repita seu novo email";
    } else if (info === "user") {
      inputType = "text";
      trigger = "Alterar nome de usuário";
      oldInputPlaceholder = "Nome de usuário atual";
      inputPlaceholder = "Novo nome de usuário";
      inputPlaceholder2 = "Repita seu nome de usuário";
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button>{trigger}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{trigger}</DialogTitle>
          </DialogHeader>
            <form className="w-full h-full flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full h-full flex flex-col gap-4">

                <div>
                    <Input placeholder={oldInputPlaceholder} type={inputType} {...register("old_data_input")} /> 
                    <div className="text-red-500 text-xs">
                        {errors?.old_data_input?.message}
                    </div>
                </div>

                <div>
                    <Input placeholder={inputPlaceholder} {...register("input")} /> 
                    <div className="text-red-500 text-xs">
                        {errors?.input?.message}
                    </div>
                </div>

                <div>
                    <Input placeholder={inputPlaceholder2} {...register("input2")} /> 
                    <div className="text-red-500 text-xs">
                        {errors?.input2?.message}
                    </div>
                </div>
                </div>
            <Button type="submit">{trigger}</Button>

            </form>

        </DialogContent>
    </Dialog>
  )
}
