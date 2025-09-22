import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from './Modal';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'closed' },
    children: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <div onClick={() => setOpen(true)}>
          Open Modal. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Tempora, facere consequatur. Sed nostrum, repellendus veritatis dolor
          sint pariatur quis est illum cumque facilis repellat voluptates
          provident laudantium eos nemo inventore! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Accusamus facere sequi nemo doloribus
          eum veritatis rem, facilis rerum in esse architecto quibusdam iure
          recusandae quam sint earum ea, officiis mollitia. Minima unde
          necessitatibus similique explicabo sapiente exercitationem possimus!
          Illo repellat neque rem, aut impedit facere, quia ut fugit est nihil
          laborum autem explicabo cum id, nisi labore blanditiis assumenda
          dolore! Sunt est dolore, harum atque quasi labore nihil repellat,
          quaerat culpa esse neque deserunt quos velit blanditiis. Ab distinctio
          cum harum aspernatur impedit! Dolores neque, molestias vero ad tempora
          quam. Nostrum nisi quidem neque nam, repellendus maxime aut error,
          magni sed hic, illum enim dolor at doloribus vel voluptates
          perferendis unde. Ad similique illo voluptas veritatis deserunt
          commodi quasi animi? Voluptate veritatis totam impedit facere ea vel
          eveniet atque. Adipisci, sint! Nemo accusantium laudantium ipsam,
          quasi, neque quaerat voluptates officia optio sunt possimus provident
          dolores quod veritatis quo sint soluta!
        </div>
        <Modal
          {...args}
          open={open}
          onClose={() => {
            setOpen(false);
            args.onClose?.();
          }}
        >
          {args.children || 'Modal content'}
        </Modal>
      </div>
    );
  },
};

export const Closed: Story = {
  args: {
    open: false,
    children: 'Hidden modal',
  },
};
