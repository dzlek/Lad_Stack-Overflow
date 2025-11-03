import Button from './Button';
const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Button triggers an action or event with a single click.  
Supports different states like default and disabled.
      `,
            },
        },
    },
    argTypes: {
        children: { control: 'text' },
        variant: {
            control: { type: 'radio' },
            options: ['text', 'contained', 'outlined'],
        },
        size: { control: { type: 'radio' }, options: ['small', 'medium', 'large'] },
        disabled: { control: 'boolean' },
        isLoading: { control: 'boolean' },
        onClick: { action: 'clicked' },
    },
};
export default meta;
export const Default = {
    args: { children: 'CONTAINED MEDIUM' },
};
export const Text = {
    args: { children: 'TEXT', variant: 'text' },
};
export const Outlined = {
    args: { children: 'OUTLINED', variant: 'outlined' },
};
export const Small = {
    args: { children: 'SMALL', size: 'small' },
};
export const Large = {
    args: { children: 'LARGE', size: 'large' },
};
export const Disabled = {
    args: { children: 'DISABLED', disabled: true },
};
export const Loading = {
    args: { children: 'Button', isLoading: true },
};
