// Modal.jsx
import { createPortal } from "react-dom";
import { useImperativeHandle, useRef, forwardRef } from "react";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current.showModal(),
    close: () => dialogRef.current.close(),
  }));

  function handleClose(e) {
    e.preventDefault();
    dialogRef.current.close();
  }

  return createPortal(
    <dialog ref={dialogRef} className="p-0">
      {/* only this wrapper is full-screen/flex when dialog is open */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <form className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-[28rem]">
          {children}
          <div className="mt-6 w-full flex justify-center">
            <Button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-700"
            >
              {buttonCaption}
            </Button>
          </div>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
