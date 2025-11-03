import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import archimedService from "../services/archimed";
const StaffDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const [appointmentsData, doctorsData, servicesData] = await Promise.all([
                    archimedService.getAppointments({ page: 1, limit: 100 }),
                    archimedService.getDoctors(),
                    archimedService.getServices(),
                ]);
                setAppointments(appointmentsData.data);
                setDoctors(doctorsData);
                setServices(servicesData);
            }
            catch (err) {
                console.error("Ошибка загрузки данных:", err);
                setError("Не удалось загрузить данные. Попробуйте позже.");
            }
            finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);
    const getDoctorName = (doctorId) => {
        if (!doctorId)
            return "Неизвестный врач";
        const doctor = doctors.find((d) => d.id === doctorId);
        return doctor
            ? `${doctor.name} ${doctor.name1} ${doctor.name2}`
            : "Неизвестный врач";
    };
    const getServiceName = (serviceId) => {
        if (!serviceId)
            return "Неизвестная услуга";
        const service = services.find((s) => s.id === serviceId);
        return service ? service.name : "Неизвестная услуга";
    };
    const formatDate = (dateString) => {
        if (!dateString)
            return "Не указано";
        return new Date(dateString).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    const formatTime = (timeString) => {
        if (!timeString)
            return "Не указано";
        return timeString.substring(0, 5); // HH:MM format
    };
    const filteredAppointments = appointments.filter((appointment) => {
        if (!selectedDate)
            return true;
        if (!appointment.preferred_date)
            return false;
        const appointmentDate = new Date(appointment.preferred_date)
            .toISOString()
            .split("T")[0];
        return appointmentDate === selectedDate;
    });
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445..." })] }) }) }));
    }
    if (error) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-red-600 mb-4", children: "\u041E\u0448\u0438\u0431\u043A\u0430" }), _jsx("p", { className: "text-gray-600 mb-6", children: error }), _jsx("button", { onClick: () => window.location.reload(), className: "px-6 py-2 bg-primary text-white rounded hover:bg-primaryDark transition-colors", children: "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430" })] }) }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-dark mb-4", children: "\u041F\u0430\u043D\u0435\u043B\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430" }), _jsx("p", { className: "text-lg text-gray-600", children: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0438\u0441\u044F\u043C\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" })] }), _jsx("div", { className: "bg-white rounded-lg shadow-lg p-6 mb-8", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("label", { htmlFor: "date-filter", className: "text-sm font-medium text-gray-700", children: "\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \u0434\u0430\u0442\u0435:" }), _jsx("input", { id: "date-filter", type: "date", value: selectedDate, onChange: (e) => setSelectedDate(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" })] }) }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg overflow-hidden", children: [_jsx("div", { className: "px-6 py-4 bg-primary text-white", children: _jsxs("h2", { className: "text-xl font-semibold", children: ["\u0417\u0430\u043F\u0438\u0441\u0438 \u043D\u0430 ", formatDate(selectedDate), " (", filteredAppointments.length, ")"] }) }), filteredAppointments.length === 0 ? (_jsxs("div", { className: "p-8 text-center text-gray-500", children: [_jsx("svg", { className: "w-16 h-16 mx-auto mb-4 text-gray-300", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }), _jsx("p", { className: "text-lg", children: "\u041D\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u0434\u0430\u0442\u0443 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u043D\u0435\u0442" })] })) : (_jsx("div", { className: "divide-y divide-gray-200", children: filteredAppointments.map((appointment) => (_jsx("div", { className: "p-6 hover:bg-gray-50 transition-colors", children: _jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-4 mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-dark", children: appointment.patient_name }), _jsxs("span", { className: "px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full", children: ["ID: ", appointment.id] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "\u0412\u0440\u0430\u0447:" }), " ", getDoctorName(appointment.doctor_id)] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "\u0423\u0441\u043B\u0443\u0433\u0430:" }), " ", getServiceName(appointment.service_id)] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "\u0414\u0430\u0442\u0430:" }), " ", formatDate(appointment.preferred_date)] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "\u0412\u0440\u0435\u043C\u044F:" }), " ", formatTime(appointment.preferred_time)] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D:" }), " ", appointment.patient_phone] }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Email:" }), " ", appointment.patient_email] })] }), appointment.comments && (_jsxs("div", { className: "mt-3", children: [_jsx("span", { className: "font-medium text-gray-700", children: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438:" }), _jsx("p", { className: "text-gray-600 mt-1", children: appointment.comments })] }))] }), _jsx("div", { className: "mt-4 md:mt-0 md:ml-6", children: _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: () => {
                                                            // Handle appointment update
                                                            console.log("Update appointment:", appointment.id);
                                                        }, className: "px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors", children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C" }), _jsx("button", { onClick: () => {
                                                            // Handle appointment cancellation
                                                            console.log("Cancel appointment:", appointment.id);
                                                        }, className: "px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors", children: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C" })] }) })] }) }, appointment.id))) }))] })] }) }));
};
export default StaffDashboard;
