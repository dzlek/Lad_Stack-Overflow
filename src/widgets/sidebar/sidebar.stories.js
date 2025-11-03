import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
const meta = {
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
export const Default = {
    render: () => (_jsx(MemoryRouter, { children: _jsxs("div", { style: { display: 'flex' }, children: [_jsx(Sidebar, {}), _jsx("div", { children: "Main content " })] }) })),
};
