// Backend API configuration
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001/api';
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';
class AuthService {
    constructor() {
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseUrl = BACKEND_API_URL;
    }
    async request(endpoint, options) {
        const url = `${this.baseUrl}${endpoint}`;
        const token = this.getToken();
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options?.headers,
            },
            ...options,
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    // Token management
    getToken() {
        if (typeof window === 'undefined')
            return null;
        return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    setToken(token) {
        if (typeof window === 'undefined')
            return;
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
    removeToken() {
        if (typeof window === 'undefined')
            return;
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
    }
    // User data management
    getUser() {
        if (typeof window === 'undefined')
            return null;
        try {
            const userData = localStorage.getItem(USER_DATA_KEY);
            return userData ? JSON.parse(userData) : null;
        }
        catch {
            return null;
        }
    }
    setUser(user) {
        if (typeof window === 'undefined')
            return;
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    }
    // Authentication methods
    async login(loginData) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(loginData),
        });
        this.setToken(response.token);
        this.setUser(response.user);
        return response;
    }
    async register(registerData) {
        const response = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(registerData),
        });
        this.setToken(response.token);
        this.setUser(response.user);
        return response;
    }
    async logout() {
        try {
            await this.request('/auth/logout', {
                method: 'POST',
            });
        }
        catch (error) {
            console.warn('Logout request failed:', error);
        }
        finally {
            this.removeToken();
        }
    }
    async refreshToken() {
        const response = await this.request('/auth/refresh', {
            method: 'POST',
        });
        this.setToken(response.token);
        this.setUser(response.user);
        return response;
    }
    // Check if user is authenticated
    isAuthenticated() {
        const token = this.getToken();
        const user = this.getUser();
        return !!(token && user);
    }
    // Get current user
    getCurrentUser() {
        if (!this.isAuthenticated())
            return null;
        return this.getUser();
    }
    // Check if user has specific role
    hasRole(role) {
        const user = this.getCurrentUser();
        return user?.role === role;
    }
    // Update user profile
    async updateProfile(userData) {
        const response = await this.request('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
        this.setUser(response);
        return response;
    }
    // Change password
    async changePassword(currentPassword, newPassword) {
        await this.request('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({
                currentPassword,
                newPassword,
            }),
        });
    }
    // Reset password
    async resetPassword(email) {
        await this.request('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }
    // Verify email
    async verifyEmail(token) {
        await this.request('/auth/verify-email', {
            method: 'POST',
            body: JSON.stringify({ token }),
        });
    }
}
export const authService = new AuthService();
export default authService;
