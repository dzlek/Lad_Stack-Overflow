import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Widgets/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Sidebar is a vertical navigation panel with links to different app sections.
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div>Main content </div>
      </div>
    </MemoryRouter>
  ),
};
