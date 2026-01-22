"use client";

import Header from "@/components/header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { trpc } from "@/lib/trpc";
import EraseData from "@/components/eraseData";
import DataFormModal from "@/components/dataFormModal";
import { RefreshCcw } from "lucide-react";

export default function Dashboard() {
  const { data, isLoading, error } = trpc.password.passwordFindAll.useQuery();
  
  if (isLoading) return (
    <div className="w-full h-full flex justify-center px-100 py-60">
      <div className="flex flex-row gap-2 items-center">
      <RefreshCcw className="w-4 h-4 animate-spin" />
      <p>Carregando...</p></div>
    </div>
    );
    
  if (error) return ( <div className="w-full h-full flex justify-center px-100 py-60"><p className="text-red-600">Erro: {error.message}</p></div>);

  return (
    <div className="w-full h-full">

      <div className="w-full h-full px-100 py-60">
      <Table className="w-full h-full">
        <TableHeader>
          <TableRow>
            <TableHead>Site</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Senha</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.site}</TableCell>
              <TableCell>{item.user}</TableCell>
              <TableCell>{item.encryptedPassword}</TableCell>
              <TableCell>
                <div className="flex flex-row gap-2">
                  <DataFormModal data={item} />
                  <EraseData id={item.id}/>
                </div>
              </TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>

    </div>
  );
}
