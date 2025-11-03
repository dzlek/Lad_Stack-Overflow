import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CodeXml } from 'lucide-react';
import { QUERY_KEYS } from '../../app/context/queryKeys';
import SnippetList from '../../components/snippetList/SnippetList';
import s from './postsPage.module.scss';
const fetchUserSnippets = async (userId) => {
    const res = await axios.get(`/api/snippets?userId=${userId}`);
    return res.data.data.data;
};
const PostsPage = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.id;
    const { data: snippets, isLoading } = useQuery({
        queryKey: [...QUERY_KEYS.SNIPPETS, userId],
        queryFn: () => fetchUserSnippets(userId),
        enabled: !!userId,
    });
    if (!userId)
        return _jsx("p", { className: s.error, children: "Please log in to view your posts." });
    if (isLoading)
        return _jsx("p", { children: "Loading..." });
    if (!snippets || snippets.length === 0)
        return _jsx("p", { children: "No snippets yet." });
    return (_jsxs("div", { className: s.postsPageWrapper, children: [_jsx("h2", { children: "My posts:" }), _jsx(CodeXml, { size: 28 }), _jsx(SnippetList, { snippets: snippets })] }));
};
export default PostsPage;
