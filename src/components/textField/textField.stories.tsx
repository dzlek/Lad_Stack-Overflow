import type { Meta, StoryObj } from '@storybook/react-vite';
import TextField from './TextField';

const meta: Meta<typeof TextField> = {
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

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: { label: 'Name', placeholder: 'Enter your name' },
};

export const Disabled: Story = {
  args: { label: 'Disabled', placeholder: 'Inactive', disabled: true },
};

export const Error: Story = {
  args: {
    label: 'Email',
    placeholder: 'Error',
    error: true,
    helperText: 'Invalid format',
  },
};
