import React from 'react';
import { Menu, X, Rocket, Zap, Shield, BarChart3, ChevronDown, Globe, Twitter, Github, Linkedin } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                            <BarChart3 className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                            CryptoNova
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="#home" className="nav-link">Home</a>
                            <a href="#prices" className="nav-link">Market</a>
                            <a href="#features" className="nav-link">Features</a>
                            <a href="#testimonials" className="nav-link">Reviews</a>
                            <a href="#faq" className="nav-link">FAQ</a>
                            <button className="btn-primary">Trade Now</button>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-text-secondary">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-surface border-b border-white/5 animate-fade-in">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#home" className="block px-3 py-2 nav-link" onClick={() => setIsOpen(false)}>Home</a>
                        <a href="#prices" className="block px-3 py-2 nav-link" onClick={() => setIsOpen(false)}>Market</a>
                        <a href="#features" className="block px-3 py-2 nav-link" onClick={() => setIsOpen(false)}>Features</a>
                        <a href="#testimonials" className="block px-3 py-2 nav-link" onClick={() => setIsOpen(false)}>Reviews</a>
                        <a href="#faq" className="block px-3 py-2 nav-link" onClick={() => setIsOpen(false)}>FAQ</a>
                        <div className="px-3 py-2">
                            <button className="w-full btn-primary">Trade Now</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Hero = () => (
    <section id="home" className="pt-40 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center" data-aos="fade-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-8">
                    <Zap size={16} />
                    <span>New: BTC Futures now live with 50x leverage</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    The Future of <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary animate-pulse">
                        Crypto Trading
                    </span>
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-text-secondary mb-10">
                    Professional tools for serious traders. Experience lightning-fast execution,
                    institutional-grade security, and 24/7 live support.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="w-full sm:w-auto btn-primary text-lg">
                        Start Trading
                    </button>
                    <button className="w-full sm:w-auto px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all">
                        View Live Market
                    </button>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="relative mt-20" data-aos="zoom-in" data-aos-delay="200">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10" />
                <div className="glass-card p-4 md:p-8 aspect-video flex items-center justify-center">
                    {/* Visual representation of a dashboard */}
                    <div className="w-full h-full rounded-xl bg-background/80 border border-white/5 overflow-hidden flex flex-col">
                        <div className="h-12 border-b border-white/5 flex items-center px-6 justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                        </div>
                        <div className="flex-1 p-6 grid grid-cols-3 gap-6">
                            <div className="col-span-2 space-y-4">
                                <div className="h-40 bg-white/5 rounded-lg animate-pulse" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-24 bg-white/5 rounded-lg animate-pulse" />
                                    <div className="h-24 bg-white/5 rounded-lg animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-full bg-white/5 rounded-lg animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-surface/50 pt-20 pb-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                            <BarChart3 className="text-white w-4 h-4" />
                        </div>
                        <span className="text-xl font-bold">CryptoNova</span>
                    </div>
                    <p className="text-text-secondary max-w-sm mb-6">
                        Empowering the next generation of crypto traders with advanced analytics,
                        seamless execution, and bank-grade security protocols.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-primary/20 transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-primary/20 transition-colors"><Github size={20} /></a>
                        <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-primary/20 transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold mb-6 uppercase text-xs tracking-widest text-text-secondary">Product</h4>
                    <ul className="space-y-4 text-text-secondary">
                        <li><a href="#" className="hover:text-primary transition-colors">Exchange</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Staking</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Futures</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">API Keys</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-6 uppercase text-xs tracking-widest text-text-secondary">Company</h4>
                    <ul className="space-y-4 text-text-secondary">
                        <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-text-secondary">
                    © 2026 CryptoNova Inc. All rights reserved. Created by Saurabh Paliwal.
                </p>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Globe size={16} />
                    <span>English (US)</span>
                </div>
            </div>
        </div>
    </footer>
);

export { Navbar, Hero, Footer };
