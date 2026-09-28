import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-300">
      <div className="aurora-bg" aria-hidden="true" />
      
      <a href="#main-content" className="absolute top-0 left-0 p-4 -translate-y-full focus-visible:translate-y-0 z-[100] bg-brand-primary text-white font-bold transition-transform">
        Skip to main content
      </a>

      <Header />
      
      <main id="main-content" className="flex-grow flex flex-col w-full">
        <Hero />
        <HowItWorks />
        <Features />
        <TrustSection />
      </main>

      <Footer />
    </div>
  );
}
