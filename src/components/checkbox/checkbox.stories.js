import Checkbox from './Checkbox';
const meta = {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Checkbox allows the user to toggle a single option on or off.  
Supports controlled and uncontrolled modes, with optional label and disabled state.
        `,
            },
        },
    },
    argTypes: {
        label: { control: 'text' },
        disabled: { control: 'boolean' },
        checked: { control: 'boolean' },
        onChange: { action: 'changed' },
    },
};
export default meta;
export const Default = {
    args: { label: 'Label' },
};
export const Checked = {
    args: { label: 'Checked', isChecked: true },
};
export const Controlled = {
    args: {
        label: 'Controlled',
        isChecked: true,
        onChange: (e) => console.log(e.target.checked),
    },
};
export const Disabled = {
    args: { label: 'Disabled', disabled: true },
};
