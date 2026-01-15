"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { trpc } from "@/lib/trpc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoginFormData, loginSchema } from "@/packages/schema/login";


export default function LoginPage(){

  const utils = trpc.useUtils();
  const { 
    register, //registrar valores
    handleSubmit, //valida antes de enviar
    formState: {errors} //arranjo de erros
        } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
  });
  
  const login = trpc.login.login.useMutation({
    onSuccess: async() => {
      toast.success("Login funcionou!")
    },
    onError: async(err: any) => {
      toast.error("Login deu pau!");
      console.log(err);
    }
  });

  async function onSubmit(payload: LoginFormData){
    login.mutate(payload); 
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="w-96 p-6 bg-white rounded shadow-md flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-base font-semibold text-center">Gerenciador de Senhas - Login</h1>

      <div>
        <Input placeholder="Email" {...register("email")}/>
        <div className="text-red-500 text-xs">
          {errors?.email?.message}
        </div>
      </div>
      
      <div>
        <Input placeholder="Senha" type="password" {...register("password")}/>
        <div className="text-red-500 text-xs">
          {errors?.password?.message}
        </div>
      </div>

        <div className="flex flex-col gap-1">
          <Button>Entrar</Button>
          <Link href="/register" className="text-xs text-center underline">
            Não tem conta? Registre-se
          </Link>
        </div>
      </form>
    </div>
  );
}