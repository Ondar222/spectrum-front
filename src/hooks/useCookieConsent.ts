import { useState, useEffect } from 'react';

export type CookieConsentStatus = 'accepted' | 'declined' | null;

export const useCookieConsent = () => {
    const [consentStatus, setConsentStatus] = useState<CookieConsentStatus>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Загружаем статус согласия из localStorage
        const savedConsent = localStorage.getItem('cookieConsent') as CookieConsentStatus;
        setConsentStatus(savedConsent);
        setIsLoading(false);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setConsentStatus('accepted');
    };

    const declineCookies = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setConsentStatus('declined');
    };

    const resetConsent = () => {
        localStorage.removeItem('cookieConsent');
        setConsentStatus(null);
    };

    const hasConsent = consentStatus === 'accepted';
    const hasDeclined = consentStatus === 'declined';
    const needsConsent = consentStatus === null;

    return {
        consentStatus,
        isLoading,
        hasConsent,
        hasDeclined,
        needsConsent,
        acceptCookies,
        declineCookies,
        resetConsent,
    };
};
