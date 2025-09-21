import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Trophy, Calendar, Shield, Store } from "lucide-react";

// ---- Assets (placeholder paths - you can replace with actual assets) ----
// Force rebuild to fix white screen issue
const VIDEO_MP4 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const LOGO_RAW  = "/assets/PowerUpWin-Logo.png";         // PNG logo
const AGREEMENT_DOC = "/assets/agreement-template.html";

export default function PowerUpWinLanding() {
  // Cursor + parallax (browser-only)
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ dx: 0, dy: 0 });
  const [logoSrc, setLogoSrc] = useState(LOGO_RAW);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
      const w = window.innerWidth || 1, h = window.innerHeight || 1;
      setParallax({ dx: (e.clientX - w / 2) * 0.005, dy: (e.clientY - h / 2) * 0.005 });
    };

    const onScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Show the logo while the video buffers
  const poster = useMemo(() => logoSrc, [logoSrc]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white font-sans">
      {/* HERO: Large video section (more than half screen) */}
      <header className="relative h-[70vh] w-full overflow-hidden">
        {/* Large video background */}
        <div className="absolute inset-0 z-0">
          <video
            src={VIDEO_MP4}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            title="PowerUp & Win video"
            id="main-video"
          />
          {/* Subtle gradient for smooth transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        </div>

        {/* Animated background layers */}
        <AnimatedBackground />

        {/* Cursor-follow glow */}
        <CursorGlow x={cursor.x} y={cursor.y} />

        {/* Logo in top-right corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-6 right-6 z-20"
          style={{ transform: `translate3d(${parallax.dx * 0.3}px, ${parallax.dy * 0.3}px, 0)` }}
        >
          <div className="relative group">
            <img
              src={logoSrc}
              alt="PowerUp & Win logo"
              className="w-[180px] md:w-[220px] lg:w-[260px] h-auto drop-shadow-[0_15px_50px_rgba(255,0,0,0.4)] shadow-2xl border border-red-500/20 rounded-xl backdrop-blur-sm"
              style={{ transform: `translate3d(${parallax.dx}px, ${parallax.dy}px, 0)` }}
              onLoad={() => console.log('Logo loaded successfully:', logoSrc)}
              onError={(e) => console.error('Logo failed to load:', logoSrc, e)}
            />
            {/* Enhanced glow effects */}
            <div className="absolute inset-0 w-[180px] md:w-[220px] lg:w-[260px] h-[100px] md:h-[120px] lg:h-[140px] bg-red-500/30 blur-xl -z-10 group-hover:bg-red-500/40 transition-all duration-300 rounded-lg"></div>
            <div className="absolute inset-0 w-[180px] md:w-[220px] lg:w-[260px] h-[100px] md:h-[120px] lg:h-[140px] bg-red-600/20 blur-2xl -z-20 rounded-lg"></div>
            <div className="absolute inset-0 w-[180px] md:w-[220px] lg:w-[260px] h-[100px] md:h-[120px] lg:h-[140px] bg-red-500/10 blur-lg -z-30 animate-pulse rounded-lg"></div>
          </div>
        </motion.div>

        {/* Volume Control Button */}
        <button
          onClick={() => {
            const video = document.getElementById('main-video') as HTMLVideoElement;
            if (video) {
              video.muted = !video.muted;
            }
          }}
          className="absolute bottom-6 left-6 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
          title="Toggle video sound"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </button>
      </header>

      {/* ULTRA-COMPACT BLACK SECTION - Minimal height */}
      <section className="relative bg-black py-8">
        {/* Minimal background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black opacity-95">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-500/20 rounded-full blur-lg animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-blue-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Ultra-compact horizontal layout */}
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left side - Main content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Ultra-compact main heading - Horizontal */}
              <motion.h1
                className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Power your store.
                </span>
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent ml-2">
                  Win your market.
                </span>
              </motion.h1>

              {/* Ultra-compact description */}
              <motion.p
                className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                The UMS Northern Division's flagship consumer promotion connecting leading suppliers with high‑performing member stores across the region.
              </motion.p>
            </div>

            {/* Right side - Buttons and info */}
            <div className="flex flex-col items-center lg:items-end gap-3">
              {/* Ultra-compact buttons - All three buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-center gap-2"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <a
                  href={AGREEMENT_DOC}
                  download="PowerUp-Win-2025-Agreement.html"
                  target="_blank"
                  className="group inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-white to-gray-100 px-4 py-2 font-semibold text-neutral-900 shadow-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-white hover:scale-105 hover:shadow-md border border-white/20 text-xs"
                >
                  <Download className="h-3 w-3" />
                  Download Agreement
                </a>
                <button
                  onClick={() => {
                    document.getElementById('agreement-form')?.classList.remove('hidden');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 font-semibold text-white shadow-sm ring-1 ring-red-400/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:scale-105 hover:shadow-md hover:ring-red-400/50 text-xs"
                >
                  Join PowerUp & Win <ArrowRight className="h-3 w-3" />
                </button>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-2 font-semibold text-white shadow-sm ring-1 ring-gray-400/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 hover:scale-105 hover:shadow-md hover:ring-gray-400/50 text-xs"
                >
                  <ArrowRight className="h-3 w-3 rotate-180" />
                  Back to Top
                </button>
              </motion.div>

              {/* Ultra-compact info pill - Exact width as three buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.8, duration: 0.6 }}
                className="w-full rounded-md bg-gradient-to-r from-white/15 to-white/5 p-2 backdrop-blur-xl ring-1 ring-white/20 border border-white/10 shadow-sm"
              >
                <p className="text-xs text-gray-200 font-medium">
                  🎯 <span className="font-bold text-white">20 Oct – 31 Jan 2026</span> · 🏆 <span className="font-bold text-red-400">29 Feb 2025</span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ULTRA-COMPACT HOW IT WORKS - Minimal height */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">How It Works</h2>
          <p className="text-gray-300 max-w-4xl mx-auto text-sm leading-relaxed">
            The PowerUp & Win promotion connects leading suppliers with high-performing member stores across the UMS Northern Division region.
          </p>
        </div>
      </section>

      {/* FULL-SCREEN AGREEMENT FORM MODAL */}
      <section id="agreement-form" className="fixed inset-0 z-50 hidden bg-black/80 backdrop-blur-sm">
        <div className="h-full w-full flex items-center justify-center p-4">
          <div className="w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-neutral-900 to-black rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-center flex-shrink-0">
              <h2 className="text-3xl font-bold text-white mb-1">PowerUp & Win Agreement</h2>
              <p className="text-red-100 text-base">
                Fill out the form below to participate in the PowerUp & Win promotion
              </p>
              <button
                onClick={() => {
                  document.getElementById('agreement-form')?.classList.add('hidden');
                }}
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Agreement Terms and Conditions - Compact */}
              <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Agreement Terms & Conditions</h3>
                <div className="grid md:grid-cols-2 gap-3 text-gray-300 text-xs leading-relaxed">
                  <div className="space-y-1">
                    <p><strong>1. Participation:</strong> By submitting this form, you agree to participate in the PowerUp & Win promotion as a member store of the UMS Northern Division.</p>
                    <p><strong>2. Store Requirements:</strong> You must maintain proper POS displays, run in-store promotions, and provide monthly photo feedback as required.</p>
                    <p><strong>3. Supplier Partnership:</strong> You agree to stock supplier ranges and maintain proper branding for 12 months if selected as a winner.</p>
                  </div>
                  <div className="space-y-1">
                    <p><strong>4. Compliance:</strong> All activities must comply with UMS guidelines and local regulations. Proper documentation must be maintained.</p>
                    <p><strong>5. Prize Terms:</strong> The car giveaway is non-transferable for cash. Insurance is covered by UMS until March 28, 2025.</p>
                    <p><strong>6. Data Usage:</strong> Your information will be used for promotion management and may be shared with participating suppliers.</p>
                  </div>
                </div>
              </div>

              <AgreementForm />
            </div>
          </div>
        </div>
      </section>

      {/* Compact Footer */}
      <footer className="mx-auto max-w-7xl px-6 pb-6">
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-white/20 bg-gradient-to-r from-white/10 to-white/5 p-4 sm:flex-row backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="PowerUp & Win" className="h-6 w-auto drop-shadow-lg" />
            <span className="text-sm text-gray-300 font-medium">© {new Date().getFullYear()} PowerUp & Win · UMS Northern Division</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-gray-400 font-medium">🏆 Prize not transferable for cash · 🛡️ Insurance covered by UMS until 28 Mar 2025</div>
            {/* Hidden Admin Link */}
            <a 
              href="/admin-secure.html" 
              className="text-xs text-gray-500 hover:text-gray-400 transition-colors duration-200 opacity-50 hover:opacity-70"
              title="Admin Access"
            >
              Admin
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 ring-2 ring-red-400/30"
        >
          <ArrowRight className="h-6 w-6 rotate-180" />
        </motion.button>
      )}
    </div>
  );
}

/* ===== Decorative / interactive bits ===== */
function CursorGlow({ x, y }: { x: number; y: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden>
      <div className="absolute h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl transition-transform duration-300" style={{ left: x, top: y, background: "radial-gradient(closest-side, rgba(239,68,68,0.35), rgba(239,68,68,0))" }} />
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      <motion.div className="absolute -left-24 -top-24 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, rgba(239,68,68,0.45), transparent 60%)" }} animate={{ x: [0, 40, -20, 0], y: [0, 20, -30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full" style={{ background: "radial-gradient(circle at 70% 70%, rgba(59,130,246,0.28), transparent 60%)" }} animate={{ x: [0, -30, 20, 0], y: [0, 25, -20, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute inset-0 opacity-[0.12]">
        <div className="h-full w-full bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.25)_96%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.25)_96%)] bg-[size:24px_24px] animate-[bg-pan_30s_linear_infinite]" />
      </div>
      <style>{`@keyframes bg-pan { from { background-position: 0 0, 0 0; } to { background-position: 240px 240px, 240px 240px; } }`}</style>
    </div>
  );
}

function AgreementForm() {
  const [formData, setFormData] = useState({
    storeName: '',
    representativeName: '',
    email: '',
    phone: '',
    address: '',
    storeType: '',
    agreeToTerms: false,
    agreeToBranding: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create submission data
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString()
      };
      
      // Determine API endpoint (development vs production)
      const API_BASE = process.env.NODE_ENV === 'production' 
        ? 'https://api.powerupandwin.co.za' 
        : 'http://localhost:3001';
      
      // Submit to professional API
      const response = await fetch(`${API_BASE}/api/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit form');
      }
      
      console.log('✅ Form submitted successfully:', result.id);
      
      // Store locally as backup (optional)
      const existingSubmissions = JSON.parse(localStorage.getItem('powerupWinSubmissions') || '[]');
      existingSubmissions.push({ ...submissionData, id: result.id });
      localStorage.setItem('powerupWinSubmissions', JSON.stringify(existingSubmissions));
      
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        storeName: '',
        representativeName: '',
        email: '',
        phone: '',
        address: '',
        storeType: '',
        agreeToTerms: false,
        agreeToBranding: false
      });

      // Close modal after 3 seconds
      setTimeout(() => {
        document.getElementById('agreement-form')?.classList.add('hidden');
      }, 3000);
    } catch (error) {
      console.error('❌ Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Store Information */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-white">Store Information</h4>
          
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-300 mb-1">
                Store Name *
              </label>
              <input
                type="text"
                id="storeName"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm text-sm"
                placeholder="Enter your store name"
              />
            </div>

            <div>
              <label htmlFor="representativeName" className="block text-sm font-medium text-gray-300 mb-1">
                Representative Name *
              </label>
              <input
                type="text"
                id="representativeName"
                name="representativeName"
                value={formData.representativeName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm text-sm"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm text-sm"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm text-sm"
                placeholder="+27 12 345 6789"
              />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-white">Additional Information</h4>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
              Store Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm resize-none text-sm"
              placeholder="Full store address"
            />
          </div>

          <div>
            <label htmlFor="storeType" className="block text-sm font-medium text-gray-300 mb-1">
              Store Type *
            </label>
            <select
              id="storeType"
              name="storeType"
              value={formData.storeType}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent backdrop-blur-sm text-sm"
            >
              <option value="">Select store type</option>
              <option value="retail">Retail Store</option>
              <option value="wholesale">Wholesale Store</option>
              <option value="both">Both Retail & Wholesale</option>
            </select>
          </div>

          {/* Agreement Checkboxes */}
          <div className="space-y-2 pt-2">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
                className="mt-1 h-4 w-4 text-red-600 bg-white/10 border-white/20 rounded focus:ring-red-500 focus:ring-2"
              />
              <label htmlFor="agreeToTerms" className="text-xs text-gray-300 leading-relaxed">
                I agree to the <strong>Terms & Conditions</strong> and understand the promotion requirements
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="agreeToBranding"
                name="agreeToBranding"
                checked={formData.agreeToBranding}
                onChange={handleInputChange}
                required
                className="mt-1 h-4 w-4 text-red-600 bg-white/10 border-white/20 rounded focus:ring-red-500 focus:ring-2"
              />
              <label htmlFor="agreeToBranding" className="text-xs text-gray-300 leading-relaxed">
                I agree to maintain <strong>supplier branding</strong> for 12 months if selected as a winner
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-2xl font-bold text-base shadow-[0_12px_40px_rgba(220,38,38,0.5)] ring-2 ring-red-400/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:scale-105 hover:shadow-[0_16px_50px_rgba(220,38,38,0.6)] hover:ring-red-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting Agreement...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Trophy className="h-5 w-5" />
              Submit Agreement & Join PowerUp & Win
            </span>
          )}
        </button>
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="text-center p-6 rounded-xl bg-green-500/20 border border-green-500/50">
          <div className="text-green-400 font-semibold text-lg mb-2">
            ✅ Agreement Submitted Successfully!
          </div>
          <div className="text-green-300">
            Thank you for participating in PowerUp & Win. We'll be in touch soon!
          </div>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="text-center p-4 rounded-xl bg-red-500/20 border border-red-500/50">
          <div className="text-red-400 font-semibold">
            ❌ Submission failed. Please try again.
          </div>
        </div>
      )}
    </form>
  );
}
