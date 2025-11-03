import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentModal from './AppointmentModal';
export default function FloatingBooking({ className }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const [appointmentOpen, setAppointmentOpen] = React.useState(false);
    const [mode, setMode] = React.useState(null);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const openDoctorModal = () => {
        setMode('doctor');
        setIsOpen(false);
        setAppointmentOpen(true);
    };
    const openServiceModal = () => {
        setMode('service');
        setIsOpen(false);
        setAppointmentOpen(true);
    };
    return (_jsxs(_Fragment, { children: [isOpen && (_jsx("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4", onClick: handleClose, children: _jsxs("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "p-5 border-b", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u0437\u0430\u043F\u0438\u0441\u0438 \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438" })] }), _jsxs("div", { className: "p-5 space-y-3", children: [_jsxs("button", { onClick: openDoctorModal, className: "w-full flex items-center justify-between px-4 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors", children: [_jsxs("span", { className: "flex items-center gap-3", children: [_jsx("span", { className: "inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20", children: "\uD83D\uDC69\u200D\u2695\uFE0F" }), "\u041A \u0432\u0440\u0430\u0447\u0443"] }), _jsx("span", { children: "\u2192" })] }), _jsxs("button", { onClick: openServiceModal, className: "w-full flex items-center justify-between px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors", children: [_jsxs("span", { className: "flex items-center gap-3", children: [_jsx("span", { className: "inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10", children: "\uD83E\uDDFE" }), "\u041D\u0430 \u0443\u0441\u043B\u0443\u0433\u0443"] }), _jsx("span", { children: "\u2192" })] })] }), _jsx("div", { className: "p-4 border-t flex justify-end", children: _jsx("button", { onClick: handleClose, className: "px-4 py-2 text-gray-600 hover:text-gray-800", children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C" }) })] }) })), _jsx(AppointmentModal, { isOpen: appointmentOpen, onClose: () => setAppointmentOpen(false), onSuccess: () => setAppointmentOpen(false) })] }));
}
