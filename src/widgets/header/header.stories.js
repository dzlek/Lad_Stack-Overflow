import { jsx as _jsx } from "react/jsx-runtime";
import Header from './Header';
const meta = {
    title: 'Widgets/Header',
    component: Header,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
Header is a top navigation bar that can contain the app title, navigation links, or user controls.
        `,
            },
        },
    },
};
export default meta;
export const Default = {
    render: () => _jsx(Header, {}),
};
