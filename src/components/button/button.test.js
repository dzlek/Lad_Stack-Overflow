import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
describe('Button', () => {
    it('renders children', () => {
        render(_jsx(Button, { children: "Test" }));
        screen.getByText('Test');
    });
    it('shows Loading...', () => {
        render(_jsx(Button, { isLoading: true, children: "Test" }));
        screen.getByText('Loading...');
    });
    it('onClick works', async () => {
        const handleClick = jest.fn();
        render(_jsx(Button, { onClick: handleClick, children: "Test" }));
        await userEvent.click(screen.getByText('Test'));
        expect(handleClick).toHaveBeenCalled();
    });
    it('disabled', () => {
        render(_jsx(Button, { disabled: true, children: "Test" }));
        expect(screen.getByText('Test')).toHaveAttribute('disabled');
    });
});
