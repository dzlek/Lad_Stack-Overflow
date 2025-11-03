import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import s from './modal.module.scss';
import { createPortal } from 'react-dom';
export function Modal({ open, onClose, children }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (open) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);
    if (!open)
        return null;
    return createPortal(_jsx("div", { className: s.backdrop, "data-testid": "backdrop", onClick: onClose, children: _jsx("div", { className: s.modal, onClick: (e) => e.stopPropagation(), children: children }) }), document.body);
}
export default Modal;
