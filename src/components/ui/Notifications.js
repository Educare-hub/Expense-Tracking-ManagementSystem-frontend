import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector, useDispatch } from "react-redux";
import { popNotification } from "../../features/ui/uiSlice";
const Notifications = () => {
    const list = useSelector((s) => s.ui.notifications);
    const dispatch = useDispatch();
    return (_jsx("div", { className: "fixed top-4 right-4 space-y-2 z-50", children: list.map((n) => (_jsx("div", { className: "p-3 rounded shadow", children: _jsxs("div", { className: "flex items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsx("strong", { children: n.type.toUpperCase() }), _jsx("div", { children: n.message })] }), _jsx("button", { onClick: () => dispatch(popNotification(n.id)), className: "ml-2", children: "\u2715" })] }) }, n.id))) }));
};
export default Notifications;
