import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

type ModalProps = {
  visibility: boolean;
  close: () => void;
  children: ReactNode;
  title?: string;
};

const GenericModal = ({ children, title, visibility, close }: ModalProps) => {
  return (
    <Dialog open={visibility} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default GenericModal;
