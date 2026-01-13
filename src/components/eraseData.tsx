import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eraser } from "lucide-react";
import { Button } from "./ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function EraseData(data: any){
  const utils = trpc.useContext();

    const deletePassword = trpc.password.passwordDelete.useMutation({
    onSuccess: () => {
        utils.password.passwordFindAll.invalidate();
        toast.success("Registro deletado com sucesso!");
    },
  });

    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button><Eraser/></Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cê tem certeza?</DialogTitle>
              <DialogDescription>
                Não da pra voltar atrás. Ao clicar em "Apagar dados" os dados desta conta serão permanentemente deletados do banco.
              </DialogDescription>
            </DialogHeader>
            <Button variant={"destructive"} onClick={() => deletePassword.mutate(data.id)}>Apagar dados</Button>
          </DialogContent>
        </Dialog>
    );
}