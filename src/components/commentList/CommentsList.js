import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import s from './commentList.module.scss';
const CommentsList = ({ comments }) => {
    if (!comments?.length)
        return _jsx("div", { children: "No comments..." });
    return (_jsx("ul", { className: s.commentListWrapper, children: comments.map((c) => (_jsxs("li", { children: [_jsxs("strong", { children: [c.user.username, ":"] }), _jsx("div", { children: c.content })] }, c.id))) }));
};
export default CommentsList;
