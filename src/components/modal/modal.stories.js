import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from './Modal';
import { useState } from 'react';
const meta = {
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Modal displays content in an overlay on top of the page.  
Supports open/close state, ESC key handling, and backdrop click to dismiss.
      `,
            },
        },
    },
    argTypes: {
        open: { control: 'boolean' },
        onClose: { action: 'closed' },
        children: { control: 'text' },
    },
};
export default meta;
export const Default = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (_jsxs("div", { children: [_jsx("div", { onClick: () => setOpen(true), children: "Open Modal. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, facere consequatur. Sed nostrum, repellendus veritatis dolor sint pariatur quis est illum cumque facilis repellat voluptates provident laudantium eos nemo inventore! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus facere sequi nemo doloribus eum veritatis rem, facilis rerum in esse architecto quibusdam iure recusandae quam sint earum ea, officiis mollitia. Minima unde necessitatibus similique explicabo sapiente exercitationem possimus! Illo repellat neque rem, aut impedit facere, quia ut fugit est nihil laborum autem explicabo cum id, nisi labore blanditiis assumenda dolore! Sunt est dolore, harum atque quasi labore nihil repellat, quaerat culpa esse neque deserunt quos velit blanditiis. Ab distinctio cum harum aspernatur impedit! Dolores neque, molestias vero ad tempora quam. Nostrum nisi quidem neque nam, repellendus maxime aut error, magni sed hic, illum enim dolor at doloribus vel voluptates perferendis unde. Ad similique illo voluptas veritatis deserunt commodi quasi animi? Voluptate veritatis totam impedit facere ea vel eveniet atque. Adipisci, sint! Nemo accusantium laudantium ipsam, quasi, neque quaerat voluptates officia optio sunt possimus provident dolores quod veritatis quo sint soluta!" }), _jsx(Modal, { ...args, open: open, onClose: () => {
                        setOpen(false);
                        args.onClose?.();
                    }, children: args.children || 'Modal content' })] }));
    },
};
