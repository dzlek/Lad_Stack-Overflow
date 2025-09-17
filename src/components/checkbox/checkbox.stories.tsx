import type { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: 'Label' },
};

export const Checked: Story = {
  args: { label: 'Checked', defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
};
