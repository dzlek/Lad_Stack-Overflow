import Switch from './Switch';
const meta = {
    title: 'Components/Switch',
    tags: ['autodocs'],
    component: Switch,
    parameters: {
        docs: {
            description: {
                component: `
Switch toggles between two states, such as on/off.  
Similar to Checkbox but styled for binary options.
      `,
            },
        },
    },
    argTypes: {
        isChecked: { control: 'boolean' },
        disabled: { control: 'boolean' },
        onChange: { action: 'changed' },
    },
};
export default meta;
export const Default = {
    args: {},
};
export const Checked = {
    args: { isChecked: true },
};
export const Disabled = {
    args: { disabled: true },
};
