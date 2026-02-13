import React from 'react';
import { Shield, Zap, Globe, Cpu, Headphones, Lock, ChevronDown } from 'lucide-react';

const Features = () => {
    const steps = [
        {
            icon: <Shield className="text-primary" size={32} />,
            title: "Bank-Grade Security",
            desc: "98% of assets stored in cold wallets with multi-sig protection and insurance."
        },
        {
            icon: <Zap className="text-primary" size={32} />,
            title: "Lightning Execution",
            desc: "Ultra-low latency matching engine capable of 1M orders per second."
        },
        {
            icon: <Globe className="text-primary" size={32} />,
            title: "Global Reach",
            desc: "Access markets in over 150 countries with local currency support."
        },
        {
            icon: <Cpu className="text-primary" size={32} />,
            title: "Advanced Algos",
            desc: "Deploy sophisticated trading bots with our pro-trading terminal."
        }
    ];

    return (
        <section id="features" className="py-20 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Professional Traders <br /> Choose CryptoNova</h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        We've built the most robust ecosystem for digital asset trading,
                        combining cutting-edge technology with unmatched reliability.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="glass-card p-8 hover:translate-y-[-8px] border-white/5 group"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="mb-6 p-3 bg-white/5 w-fit rounded-2xl group-hover:shadow-neon-primary transition-all duration-500">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                            <p className="text-text-secondary leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Testimonials = () => (
    <section id="testimonials" className="py-20 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by 10M+ Traders</h2>
                <p className="text-text-secondary">Join the global community of professional investors.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-card p-8" data-aos="fade-up" data-aos-delay={i * 100}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
                            <div>
                                <h4 className="font-bold">Alex Rivera</h4>
                                <span className="text-sm text-text-secondary">Professional Scalper</span>
                            </div>
                        </div>
                        <p className="text-text-secondary italic">
                            "The execution speed on CryptoNova is unmatched. I've tried dozens of platforms,
                            but nothing comes close to this level of reliability during high volatility."
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const FAQ = () => {
    const [openIndex, setOpenIndex] = React.useState(0);
    const faqs = [
        { q: "How secure is my data?", a: "We use AES-256 encryption and follow strict GDPR compliance to ensure your data stays private." },
        { q: "What are the trading fees?", a: "Our maker/taker fees start at just 0.1%, with further discounts available based on trading volume." },
        { q: "Is there a mobile app?", a: "Yes, CryptoNova is available on both iOS and Android with full feature parity." }
    ];

    return (
        <section id="faq" className="py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16" data-aos="fade-up">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="glass-card overflow-hidden" data-aos="fade-up">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="w-full p-6 text-left flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <span className="font-bold text-lg">{faq.q}</span>
                                <ChevronDown className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                            </button>
                            {openIndex === i && (
                                <div className="p-6 text-text-secondary border-t border-white/5 animate-fade-in">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CTA = () => (
    <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <div className="glass-card p-12 md:p-20 border-primary/20 bg-background/80">
                <h2 className="text-4xl md:text-6xl font-bold mb-8" data-aos="zoom-in">Ready to Shape the Future?</h2>
                <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                    Create your account in minutes and start building your digital asset portfolio with zero transaction fees for the first 30 days.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6" data-aos="fade-up" data-aos-delay="200">
                    <button className="btn-primary text-xl px-12 py-4">Create Free Account</button>
                    <button className="px-12 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all font-bold">Contact Sales</button>
                </div>
            </div>
        </div>
    </section>
);

export { Features, Testimonials, FAQ, CTA };
