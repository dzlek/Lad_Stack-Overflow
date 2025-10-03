import type { Meta, StoryObj } from '@storybook/react';
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
      <div
        style={{ display: 'flex', height: '300px', border: '1px solid #ddd' }}
      >
        <Sidebar />
        <div style={{ flex: 1, padding: '1rem' }}>
          Main content area (click links in the sidebar)
        </div>
      </div>
    </MemoryRouter>
  ),
};
