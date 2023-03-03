import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

type ModalProps = {
  visibility: boolean;
  close: () => void;
  title?: string;
  children: ReactNode;
};
const GenericModal = ({ visibility, close, title, children }: ModalProps) => {
  return (
    <Dialog
      open={visibility}
      onClose={close}
      as="div"
      className={`fixed inset-0 z-10 flex items-center justify-center overflow-y-auto`}
    >
      <div className="flex w-96 flex-col bg-gray-800 py-8 px-4 text-center text-white">
        <Dialog.Overlay />

        <Dialog.Title className="text-3xl text-red-500">{title}</Dialog.Title>
        {children}

        <button
          className="m-4 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={close}
        >
          Deactivate
        </button>
      </div>{" "}
    </Dialog>
  );
};

export default GenericModal;
