import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};

// Helper: all accounts stored in localStorage under 'cryptonova_accounts'
const ACCOUNTS_KEY = 'cryptonova_accounts';
const SESSION_KEY = 'cryptonova_session';

const getAccounts = () => JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}');
const saveAccounts = (accounts) => localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const session = localStorage.getItem(SESSION_KEY);
        if (session) {
            try {
                return JSON.parse(session);
            } catch { return null; }
        }
        return null;
    });
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'


    // ── Sign Up ──────────────────────────────────────────────
    const signUp = useCallback(({ name, email, password }) => {
        if (!name || !email || !password)
            return { success: false, error: 'All fields are required.' };
        if (password.length < 6)
            return { success: false, error: 'Password must be at least 6 characters.' };

        const accounts = getAccounts();
        if (accounts[email])
            return { success: false, error: 'An account with this email already exists.' };

        const newUser = {
            name,
            email,
            password, // NOTE: demo only – never store plaintext in production
            createdAt: new Date().toISOString(),
            wallet: {
                usdBalance: 25000,
                holdings: {},
                orders: [],
            },
        };

        accounts[email] = newUser;
        saveAccounts(accounts);

        const sessionData = { name, email, createdAt: newUser.createdAt };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        setUser(sessionData);
        return { success: true };
    }, []);

    // ── Login ────────────────────────────────────────────────
    const login = useCallback(({ email, password }) => {
        if (!email || !password)
            return { success: false, error: 'Email and password are required.' };

        const accounts = getAccounts();
        const account = accounts[email];
        if (!account)
            return { success: false, error: 'No account found with this email.' };
        if (account.password !== password)
            return { success: false, error: 'Incorrect password.' };

        const sessionData = { name: account.name, email, createdAt: account.createdAt };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
        setUser(sessionData);
        return { success: true };
    }, []);

    // ── Logout ───────────────────────────────────────────────
    const logout = useCallback(() => {
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
    }, []);

    // ── Save wallet data for current user ────────────────────
    const saveWalletData = useCallback((walletData) => {
        if (!user) return;
        const accounts = getAccounts();
        if (accounts[user.email]) {
            accounts[user.email].wallet = walletData;
            saveAccounts(accounts);
        }
    }, [user]);

    // ── Load wallet data for current user ────────────────────
    const loadWalletData = useCallback(() => {
        if (!user) return null;
        const accounts = getAccounts();
        return accounts[user.email]?.wallet || null;
    }, [user]);

    // ── Open auth modal ──────────────────────────────────────
    const openAuth = useCallback((mode = 'login') => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    }, []);

    const closeAuth = useCallback(() => setIsAuthOpen(false), []);

    return (
        <AuthContext.Provider value={{
            user, isLoggedIn: !!user,
            signUp, login, logout,
            saveWalletData, loadWalletData,
            isAuthOpen, authMode, openAuth, closeAuth, setAuthMode,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
