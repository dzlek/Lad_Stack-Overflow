import TextField from './TextField';
const meta = {
    title: 'Components/TextField',
    component: TextField,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
TextField allows users to enter and edit text.  
Supports placeholder, value, and disabled state.
      `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        placeholder: { control: 'text' },
        type: { control: 'text' },
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
        helperText: { control: 'text' },
        onChange: { action: 'changed' },
    },
};
export default meta;
export const Default = {
    args: { label: 'Name', placeholder: 'Enter your name' },
};
export const Disabled = {
    args: { label: 'Disabled', placeholder: 'Inactive', disabled: true },
};
export const Error = {
    args: {
        label: 'Email',
        placeholder: 'Error',
        error: true,
        helperText: 'Invalid format',
    },
};
