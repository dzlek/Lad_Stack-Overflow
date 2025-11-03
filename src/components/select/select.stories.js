import Select from './Select';
const meta = {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Select provides a dropdown list for choosing a single option.  
Supports controlled and uncontrolled modes with disabled state.
      `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        error: { control: 'boolean' },
        disabled: { control: 'boolean' },
        helperText: { control: 'text' },
        onChange: { action: 'changed' },
    },
};
export default meta;
const mockOptions = [
    { label: 'None', value: '0' },
    { label: 'Ten', value: '10' },
    { label: 'Twenty', value: '20' },
    { label: 'Thirty', value: '30' },
];
export const Default = {
    args: {
        label: 'Age',
        options: mockOptions,
        helperText: 'Choose age',
    },
};
export const Disabled = {
    args: {
        label: 'Age',
        options: mockOptions,
        disabled: true,
        helperText: 'Field disabled',
    },
};
export const Error = {
    args: {
        label: 'Age',
        options: mockOptions,
        error: true,
        helperText: 'Invalid selection',
    },
};
export const ValueViaProps = {
    args: {
        label: 'Age',
        options: mockOptions,
        helperText: 'Should be Ten',
        value: '10',
    },
};
