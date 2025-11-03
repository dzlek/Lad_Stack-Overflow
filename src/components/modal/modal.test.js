import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
describe('Modal', () => {
    it('not render if closed', () => {
        render(_jsx(Modal, { open: false, onClose: () => { }, children: "Hidden" }));
        expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });
    it(' onClose backdrop clicked', async () => {
        const handleClose = jest.fn();
        const user = userEvent.setup();
        render(_jsx(Modal, { open: true, onClose: handleClose, children: "Content" }));
        const backdrop = screen.getByTestId('backdrop');
        await user.click(backdrop);
        expect(handleClose).toHaveBeenCalled();
    });
    it('renders children', () => {
        render(_jsx(Modal, { open: true, onClose: () => { }, children: _jsx("button", { children: "Click" }) }));
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
