import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PencilLine, Plus } from "lucide-react";
import DataForm from "./dataForm";
import { Button } from "./ui/button";

export default function DataFormModal({ data }: { data?: any }) {

  return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex flex-row text-center justify-center">
                  {data ? 
                  <><PencilLine className="h-5 w-5"/></> : 
                  <><Plus className="h-5 w-5" />Nova senha</>
                  }
                  </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{data ? `Atualização de registro | ID: ${data.id}` : "Criação de registro"}</DialogTitle>
              <DialogDescription>
                {data ? 
                `Assim que você preencher os campos e clicar em "Atualizar senha" o registro será enviado ao banco de dados! 🔥` : 
                `Assim que você preencher os campos e clicar em "Criar nova senha" o registro será enviado ao banco de dados! 🔥`}
              </DialogDescription>
            </DialogHeader>
                
                <DataForm data={data}/>
          
          </DialogContent>
        </Dialog>
    );
}
// DataForm data={data}, dentro do data form eu puxo os dados caso seja update.