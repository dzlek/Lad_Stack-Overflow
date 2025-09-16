import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    label: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    helperText: { control: 'text' },
    onChange: { action: 'changed' },
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

const mockOptions = [
  { label: 'None', value: '0' },
  { label: 'Ten', value: '10' },
  { label: 'Twenty', value: '20' },
  { label: 'Thirty', value: '30' },
];

export const Default: Story = {
  args: {
    label: 'Age',
    options: mockOptions,
    helperText: 'Choose age',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Age',
    options: mockOptions,
    disabled: true,
    helperText: 'Field disabled',
  },
};

export const Error: Story = {
  args: {
    label: 'Age',
    options: mockOptions,
    error: true,
    helperText: 'Invalid selection',
  },
};

export const ValueViaProps: Story = {
  args: {
    label: 'Age',
    options: mockOptions,
    helperText: 'Should be Ten',
    value: '10',
  },
};
