import React, { useState, useEffect } from 'react';
import {
    X, Mail, Lock, User, Eye, EyeOff, LogIn,
    UserPlus, CheckCircle, AlertCircle, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
    const { isAuthOpen, closeAuth, authMode, setAuthMode, signUp, login } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Reset form when modal opens or mode changes
    useEffect(() => {
        if (isAuthOpen) {
            setTimeout(() => {
                setName(''); setEmail(''); setPassword('');
                setError(''); setSuccess(false); setShowPwd(false);
            }, 0);
        }
    }, [isAuthOpen, authMode]);


    if (!isAuthOpen) return null;

    const isSignup = authMode === 'signup';

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            const result = isSignup
                ? signUp({ name, email, password })
                : login({ email, password });

            setLoading(false);

            if (result.success) {
                setSuccess(true);
                setTimeout(() => closeAuth(), 1200);
            } else {
                setError(result.error);
            }
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="glass-card w-full max-w-md p-0 overflow-hidden animate-fade-in">

                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-white/5 text-center relative">
                    <button onClick={closeAuth} className="absolute right-4 top-4 hover:text-primary transition-colors p-1">
                        <X size={22} />
                    </button>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                        {isSignup ? <UserPlus size={28} className="text-white" /> : <LogIn size={28} className="text-white" />}
                    </div>
                    <h2 className="text-2xl font-bold">{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
                    <p className="text-text-secondary text-sm mt-1">
                        {isSignup ? 'Start trading with $25,000 demo balance' : 'Log in to your trading account'}
                    </p>
                </div>

                {/* Success Screen */}
                {success ? (
                    <div className="p-12 text-center space-y-4">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-xl font-bold">{isSignup ? 'Account Created!' : 'Logged In!'}</h3>
                        <p className="text-text-secondary text-sm flex items-center justify-center gap-1">
                            <Sparkles size={14} className="text-primary" /> Loading your dashboard…
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">

                        {/* Name (signup only) */}
                        {isSignup && (
                            <div>
                                <label className="text-xs text-text-secondary mb-1.5 block font-medium uppercase tracking-wider">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Saurabh Paliwal"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="text-xs text-text-secondary mb-1.5 block font-medium uppercase tracking-wider">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs text-text-secondary mb-1.5 block font-medium uppercase tracking-wider">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                                <input
                                    type={showPwd ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:border-primary transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(!showPwd)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                                >
                                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {isSignup && (
                                <p className="text-xs text-text-secondary mt-1">Minimum 6 characters</p>
                            )}
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                                <AlertCircle size={16} className="shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isSignup ? <UserPlus size={20} /> : <LogIn size={20} />}
                                    {isSignup ? 'Create Account' : 'Log In'}
                                </>
                            )}
                        </button>

                        {/* Toggle mode */}
                        <p className="text-center text-sm text-text-secondary">
                            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button
                                type="button"
                                onClick={() => { setAuthMode(isSignup ? 'login' : 'signup'); setError(''); }}
                                className="text-primary font-bold hover:underline"
                            >
                                {isSignup ? 'Log In' : 'Sign Up'}
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
