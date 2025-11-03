import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { CodeXml } from 'lucide-react';
import axios from 'axios';
import SnippetList from '../../components/snippetList/SnippetList';
import s from './homePage.module.scss';
import { QUERY_KEYS } from '../../app/context/queryKeys';
const fetchSnippets = async () => {
    const res = await axios.get('/api/snippets');
    return res.data.data.data;
};
const HomePage = () => {
    const { data: snippets, isLoading } = useQuery({
        queryKey: QUERY_KEYS.SNIPPETS,
        queryFn: fetchSnippets,
    });
    if (isLoading)
        return _jsx("p", { children: "Loading..." });
    if (!snippets || snippets.length === 0)
        return _jsx("p", { children: "No snippets yet." });
    return (_jsxs("div", { className: s.homePageWrapper, children: [_jsx("h2", { children: "Welcome to Codelang!" }), _jsx(CodeXml, { size: 28 }), _jsx(SnippetList, { snippets: snippets }), ";"] }));
};
export default HomePage;
