import React, { useEffect } from 'react';
import { Navbar, Hero, Footer } from './components/Layout';
import MarketPrices from './components/MarketPrices';
import { Features, Testimonials, FAQ, CTA } from './components/Sections';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />
      <main>
        <Hero />
        <MarketPrices />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
