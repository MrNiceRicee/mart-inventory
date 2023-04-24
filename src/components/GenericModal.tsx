import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

type ModalProps = {
  visibility: boolean;
  close: () => void;
  title?: string;
  children: ReactNode;
};

const GenericModal = ({ children, title, visibility, close }: ModalProps) => {
  return (
    <Dialog open={visibility} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="submit">Създай</Button>
          <Button type="submit" onClick={close}>
            Затвори
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default GenericModal;
