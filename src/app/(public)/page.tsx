"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage(){
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="w-96 p-6 bg-white rounded shadow-md flex flex-col gap-4">
      <h1 className="text-base font-semibold text-center">Gerenciador de Senhas - Login</h1>
        <Input placeholder="Email" />
        <Input placeholder="Senha" type="password" />
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