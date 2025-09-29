import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
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

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'CONTAINED MEDIUM' },
};

export const Text: Story = {
  args: { children: 'TEXT', variant: 'text' },
};

export const Outlined: Story = {
  args: { children: 'OUTLINED', variant: 'outlined' },
};

export const Small: Story = {
  args: { children: 'SMALL', size: 'small' },
};

export const Large: Story = {
  args: { children: 'LARGE', size: 'large' },
};

export const Disabled: Story = {
  args: { children: 'DISABLED', disabled: true },
};

export const Loading: Story = {
  args: { children: 'Button', isLoading: true },
};
