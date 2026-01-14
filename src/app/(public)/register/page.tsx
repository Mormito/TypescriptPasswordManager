"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { UserInsert, userInsertSchema } from "@/packages/schema/user";
import { trpc } from "@/lib/trpc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

export default function RegisterPage(){

  const utils = trpc.useUtils();
  const { 
    register, //registrar valores
    handleSubmit, //valida antes de enviar
    formState: {errors} //arranjo de erros
        } = useForm<UserInsert>({
        resolver: zodResolver(userInsertSchema),
  });
  
  const insertUser = trpc.user.userInsert.useMutation({
    onSuccess: async() => {
      toast.success("Conta criada com sucesso")
    },
    onError: async(err: any) => {
      toast.error("Erro: a conta não foi criada");
      console.log(err);
    }
  })

  async function onSubmit(payload: UserInsert){
    insertUser.mutate(payload); 
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="w-96 p-6 bg-white rounded shadow-md flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-base font-semibold text-center">Gerenciador de Senhas - Registro</h1>

      <div>
        <Input placeholder="Email" {...register("email")}/>
        <div className="text-red-500 text-xs">
          {errors?.email?.message}
        </div>
      </div>

      <div>
        <Input placeholder="Usuário" {...register("user")}/>
        <div className="text-red-500 text-xs">
          {errors?.user?.message}
        </div>
      </div>

      <div>
        <Input placeholder="Senha" type="password" {...register("passwordHash")}/>
        <div className="text-red-500 text-xs">
          {errors?.passwordHash?.message}
        </div>
      </div>

        <div className="flex flex-col gap-1">
          <Button>Criar conta</Button>
          <Link href={'/'} className="text-xs text-center underline">
          Já tem conta? Clique aqui
          </Link>
        </div>
      </form>
    </div>
  );
}