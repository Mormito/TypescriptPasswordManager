'use client';

import { useForm } from "react-hook-form";
import { trpc } from "@/lib/trpc";
import { PasswordInsert, passwordInsertSchema } from "@/packages/schema/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useEffect } from "react";


export default function DataForm({ data }: { data?: any }) {

const utils = trpc.useUtils();
  const { 
    register, //registrar valores
    handleSubmit, //valida antes de enviar
    reset, //altera os valores caso existam
    formState: {errors} //arranjo de erros
        } = useForm<PasswordInsert>({
        resolver: zodResolver(passwordInsertSchema),
  });

  useEffect(() => {
    if (data) {
      reset({
        site: data.site,
        user: data.user,
        encryptedPassword: data.encryptedPassword,
        iv: data.iv,
      });
    }
  }, [data, reset]);

  const insertPassword = trpc.password.passwordInsert.useMutation({
    onSuccess: async () => {
        await utils.password.passwordFindAll.invalidate();
        toast.success('Registro criado com sucesso!');
    },
      onError: async () => {
        toast.error('Falha ao criar o registro');
    },
  });

  const updatePassword = trpc.password.passwordUpdate.useMutation({
    onSuccess: async () => {
        await utils.password.passwordFindAll.invalidate();
        toast.success('Registro atualizado com sucesso!');
    },
    onError: async () => {
        toast.error('Falha ao atualizar o registro');
    },
  });

  function onSubmit(payload: PasswordInsert) {
    if (data?.id) {
      updatePassword.mutate({
        id: data.id,
        data: payload,
      });
    } else {
      insertPassword.mutate(payload);
    }
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full h-full flex flex-col gap-4">
        <div>
            <Input placeholder="Site" {...register("site")} />
            <div className="text-red-500 text-xs">
                {errors?.site?.message}
            </div>
        </div>

        <div>
            <Input placeholder="Usuário" {...register("user")} />
            <div className="text-red-500 text-xs">
                {errors?.user?.message}
            </div>
        </div>

        <div>
            <Input placeholder="Senha" {...register("encryptedPassword")} />
            <div className="text-red-500 text-xs">
                {errors?.encryptedPassword?.message}
            </div>
        </div>

        <div>
            <Input placeholder="IV" {...register("iv")} />
            <div className="text-red-500 text-xs">
                {errors?.iv?.message}
            </div>
        </div>

      </div>

      <Button>{data ? "Atualizar registro" : <><Plus/>Criar nova senha</>}</Button>

    </form>
  );
}
