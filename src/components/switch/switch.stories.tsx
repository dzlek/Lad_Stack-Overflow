import type { Meta, StoryObj } from '@storybook/react-vite';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
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

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: { isChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
