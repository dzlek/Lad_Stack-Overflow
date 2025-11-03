import { jsx as _jsx } from "react/jsx-runtime";
import { useAuth } from '../../app/context/useAuth';
import SnippetCard from '../snippetCard/SnippetCard';
import s from './snippetList.module.scss';
const SnippetList = ({ snippets }) => {
    const { isAuth } = useAuth();
    return (_jsx("div", { className: s.snippetList, children: snippets.map((snippet) => (_jsx(SnippetCard, { snippet: snippet, isAuth: isAuth }, snippet.id))) }));
};
export default SnippetList;
