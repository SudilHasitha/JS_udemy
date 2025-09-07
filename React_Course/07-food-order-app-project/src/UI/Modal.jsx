import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className, onClose }) {

    const dialog =  useRef();

    useEffect(() => {
        if(open){
            dialog.current.showModal();
        }else{
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
            // onClose - catches when close dialog via Esc key and use to set the userProgressCtx to ""
            <dialog ref={dialog} className={`modal ${className ? className : ''}` } onClose={onClose}>
                {children}
            </dialog>
            , document.getElementById("modal")
    );
}