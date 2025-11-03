import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from './Switch';
describe('Switch', () => {
    it('renders switch', () => {
        render(_jsx(Switch, {}));
        expect(screen.getByRole('switch')).toBeInTheDocument();
    });
    it('change event', async () => {
        const handleChange = jest.fn();
        const user = userEvent.setup();
        render(_jsx(Switch, { onChange: handleChange }));
        const toggle = screen.getByRole('switch');
        await user.click(toggle);
        expect(handleChange).toHaveBeenCalled();
        expect(toggle).toBeChecked();
    });
    it('respects checked prop in controlled mode', () => {
        const handleChange = jest.fn();
        render(_jsx(Switch, { checked: true, onChange: handleChange }));
        const toggle = screen.getByRole('switch');
        expect(toggle).toBeChecked();
    });
    it('respects unchecked in controlled mode', () => {
        render(_jsx(Switch, { isChecked: false }));
        const toggle = screen.getByRole('switch');
        expect(toggle).not.toBeChecked();
    });
    it('disabled', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        render(_jsx(Switch, { disabled: true, onChange: handleChange }));
        const toggle = screen.getByRole('switch');
        expect(toggle).toBeDisabled();
        await user.click(toggle);
        expect(handleChange).not.toHaveBeenCalled();
    });
});
