import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import archimedService from "../services/archimed";
import AppointmentModal from "./AppointmentModal";
const DoctorDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [appointmentModal, setAppointmentModal] = useState({
        isOpen: false,
    });
    useEffect(() => {
        const loadDoctor = async () => {
            if (!id) {
                setError("ID врача не указан");
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                setError(null);
                // Сначала проверяем кэш
                const cachedDoctors = archimedService.getDoctorsCache();
                const cachedDoctor = cachedDoctors.find((d) => d.id === Number.parseInt(id));
                if (cachedDoctor) {
                    setDoctor(cachedDoctor);
                    setIsLoading(false);
                    return;
                }
                // Если в кэше нет, загружаем с API
                const doctorData = await archimedService.getDoctor(Number.parseInt(id));
                setDoctor(doctorData);
            }
            catch (e) {
                console.error("Error loading doctor:", e);
                setError("Не удалось загрузить информацию о враче");
            }
            finally {
                setIsLoading(false);
            }
        };
        loadDoctor();
    }, [id]);
    const handleAppointmentClick = () => {
        if (doctor) {
            setAppointmentModal({
                isOpen: true,
                doctor,
            });
        }
    };
    const handleAppointmentSuccess = () => {
        console.log("Appointment created successfully");
    };
    const getDoctorFullName = (doctor) => {
        return `${doctor.name} ${doctor.name1} ${doctor.name2}`;
    };
    const getDoctorInitials = (doctor) => {
        return `${doctor.name} ${doctor.name1?.charAt(0)}. ${doctor.name2?.charAt(0)}.`;
    };
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u0432\u0440\u0430\u0447\u0435..." })] }) }));
    }
    if (error || !doctor) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold mb-4 text-gray-900", children: "\u0412\u0440\u0430\u0447 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" }), _jsx("p", { className: "text-gray-600 mb-6", children: error || "Информация о враче недоступна" }), _jsx(Link, { to: "/doctors", className: "px-6 py-2 bg-primary text-white rounded hover:bg-primaryDark transition-colors", children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0441\u043F\u0438\u0441\u043A\u0443 \u0432\u0440\u0430\u0447\u0435\u0439" })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("div", { className: "bg-white border-b", children: _jsxs("div", { className: "container mx-auto px-4 py-4", children: [_jsx("div", { className: "md:hidden mb-2", children: _jsxs(Link, { to: "/doctors", className: "inline-flex items-center text-primary hover:text-primaryDark", "aria-label": "\u041D\u0430\u0437\u0430\u0434 \u043A \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u0430\u043C", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-5 h-5 mr-1", children: _jsx("path", { fillRule: "evenodd", d: "M10.03 3.97a.75.75 0 010 1.06L5.06 10h15.19a.75.75 0 010 1.5H5.06l4.97 4.97a.75.75 0 11-1.06 1.06l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z", clipRule: "evenodd" }) }), _jsx("span", { children: "\u041D\u0430\u0437\u0430\u0434 \u043A \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u0430\u043C" })] }) }), _jsxs("nav", { className: "flex items-center space-x-2 text-sm text-gray-600", children: [_jsx(Link, { to: "/", className: "hover:text-primary", children: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F" }), _jsx("span", { children: "/" }), _jsx(Link, { to: "/doctors", className: "hover:text-primary", children: "\u0412\u0440\u0430\u0447\u0438" }), _jsx("span", { children: "/" }), _jsx("span", { className: "text-gray-900", children: getDoctorInitials(doctor) })] })] }) }), _jsx("section", { className: "py-12 bg-white", children: _jsx("div", { className: "container mx-auto px-4", children: _jsx("div", { className: "max-w-4xl mx-auto", children: _jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [_jsx("div", { className: "md:col-span-1", children: _jsx("div", { className: "w-full bg-gray-100 rounded-lg overflow-hidden md:h-80", children: doctor.photo ? (_jsxs(_Fragment, { children: [_jsx("img", { src: doctor.photo.startsWith("data:")
                                                        ? doctor.photo
                                                        : doctor.photo, alt: getDoctorFullName(doctor), className: "w-full h-auto object-contain md:h-full md:object-cover", onError: (e) => {
                                                        e.currentTarget.style.display = "none";
                                                        const nextElement = e.currentTarget
                                                            .nextElementSibling;
                                                        if (nextElement) {
                                                            nextElement.style.display = "flex";
                                                        }
                                                    } }), _jsx("div", { className: "w-full h-full flex items-center justify-center text-gray-400", style: { display: "none" }, children: _jsxs("div", { className: "text-center", children: [_jsx("svg", { className: "w-16 h-16 mx-auto mb-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }) }), _jsx("p", { className: "text-sm", children: "\u0424\u043E\u0442\u043E \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E" })] }) })] })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center text-gray-400", children: _jsxs("div", { className: "text-center", children: [_jsx("svg", { className: "w-16 h-16 mx-auto mb-2", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }) }), _jsx("p", { children: "\u0424\u043E\u0442\u043E \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442" })] }) })) }) }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: getDoctorFullName(doctor) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F" }), _jsx("p", { className: "text-gray-700", children: doctor.type })] }), doctor.category && (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F" }), _jsx("p", { className: "text-gray-700", children: doctor.category })] })), doctor.scientific_degree && (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u0423\u0447\u0435\u043D\u0430\u044F \u0441\u0442\u0435\u043F\u0435\u043D\u044C" }), _jsx("p", { className: "text-gray-700", children: doctor.scientific_degree })] })), doctor.max_time && (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u0412\u0440\u0435\u043C\u044F \u043F\u0440\u0438\u0435\u043C\u0430" }), _jsxs("p", { className: "text-gray-700", children: [doctor.max_time, " \u043C\u0438\u043D\u0443\u0442"] })] })), doctor.branch && (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u041E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435" }), _jsx("p", { className: "text-gray-700", children: doctor.branch })] })), doctor.address && (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u0410\u0434\u0440\u0435\u0441" }), _jsx("p", { className: "text-gray-700", children: doctor.address })] })), doctor.info && (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" }), _jsx("p", { className: "text-gray-700 whitespace-pre-line", children: doctor.info })] }))] })] })] }) }) }) }), doctor.types && doctor.types.length > 1 && (_jsx("section", { className: "py-12 bg-gray-50", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-8", children: "\u0412\u0441\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438" }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: doctor.types.map((type) => (_jsx("div", { className: "bg-white p-4 rounded-lg shadow-sm", children: _jsx("p", { className: "text-gray-700", children: type.name }) }, type.id))) })] }) }) })), _jsx(AppointmentModal, { isOpen: appointmentModal.isOpen, onClose: () => setAppointmentModal({ isOpen: false }), doctor: appointmentModal.doctor, onSuccess: handleAppointmentSuccess })] }));
};
export default DoctorDetailsPage;
