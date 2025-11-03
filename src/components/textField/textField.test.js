import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from './TextField';
describe('TextField', () => {
    it('renders label and input', () => {
        render(_jsx(TextField, { label: "Name", placeholder: "Enter name" }));
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    });
    it('handles input change', async () => {
        const handleChange = jest.fn();
        render(_jsx(TextField, { label: "Email", onChange: handleChange }));
        await userEvent.type(screen.getByLabelText('Email'), 'abc');
        expect(handleChange).toHaveBeenCalled();
    });
    it('shows helper text', () => {
        render(_jsx(TextField, { label: "Field", helperText: "Helper text" }));
        expect(screen.getByText('Helper text')).toBeInTheDocument();
    });
    it('applies error styles when error is true', () => {
        render(_jsx(TextField, { label: "Email", error: true, helperText: "Invalid format" }));
        const input = screen.getByLabelText('Email');
        expect(input).toHaveClass('errorInput');
        expect(screen.getByText('Invalid format')).toHaveClass('errorHelperText');
    });
    test('disabled prop works', () => {
        render(_jsx(TextField, { label: "Disabled", disabled: true }));
        expect(screen.getByLabelText('Disabled')).toBeDisabled();
    });
});
