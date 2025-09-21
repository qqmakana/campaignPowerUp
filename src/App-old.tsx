import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Trophy, Calendar, Shield, Store } from "lucide-react";

// ---- Assets (placeholder paths - you can replace with actual assets) ----
const VIDEO_MP4 = "/assets/V8.mp4";
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
      {/* HERO: Split layout with video left and content right */}
      <header className="relative h-screen w-full overflow-hidden bg-gradient-to-r from-black/20 to-transparent">
        {/* Animated background layers */}
        <AnimatedBackground />

        {/* Cursor-follow glow */}
        <CursorGlow x={cursor.x} y={cursor.y} />

        {/* Logo in top-right corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20"
          style={{ transform: `translate3d(${parallax.dx * 0.3}px, ${parallax.dy * 0.3}px, 0)` }}
        >
          <div className="relative group">
            <img
              src={logoSrc}
              alt="PowerUp & Win logo"
              className="w-[200px] md:w-[250px] lg:w-[300px] h-auto drop-shadow-[0_15px_50px_rgba(255,0,0,0.4)] shadow-2xl border border-red-500/20 rounded-xl backdrop-blur-sm"
              style={{ transform: `translate3d(${parallax.dx}px, ${parallax.dy}px, 0)` }}
              onLoad={() => console.log('Logo loaded successfully:', logoSrc)}
              onError={(e) => console.error('Logo failed to load:', logoSrc, e)}
            />
            {/* Enhanced glow effects */}
            <div className="absolute inset-0 w-[200px] md:w-[250px] lg:w-[300px] h-[120px] md:h-[150px] lg:h-[180px] bg-red-500/30 blur-xl -z-10 group-hover:bg-red-500/40 transition-all duration-300 rounded-lg"></div>
            <div className="absolute inset-0 w-[200px] md:w-[250px] lg:w-[300px] h-[120px] md:h-[150px] lg:h-[180px] bg-red-600/20 blur-2xl -z-20 rounded-lg"></div>
            {/* Subtle animation pulse */}
            <div className="absolute inset-0 w-[200px] md:w-[250px] lg:w-[300px] h-[120px] md:h-[150px] lg:h-[180px] bg-red-500/10 blur-lg -z-30 animate-pulse rounded-lg"></div>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="relative z-10 flex flex-col md:flex-row h-full">
          {/* Left side - Video */}
          <div className="flex-1 relative overflow-hidden bg-black min-h-[50vh] md:min-h-full">
            <video
              src={VIDEO_MP4}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              title="PowerUp & Win video"
              id="main-video"
            />
            {/* Video overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />
            
            {/* Volume Control Button */}
            <button
              onClick={() => {
                const video = document.getElementById('main-video') as HTMLVideoElement;
                if (video) {
                  video.muted = !video.muted;
                }
              }}
              className="absolute bottom-4 left-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
              title="Toggle video sound"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            </button>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start px-6 md:px-8 lg:px-12 bg-gradient-to-l from-neutral-950/95 via-neutral-900/90 to-transparent backdrop-blur-sm">
            <div className="max-w-lg">

              <motion.h1
                className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl text-center md:text-left bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
              >
                Power your store.<br />
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">Win your market.</span>
              </motion.h1>
              <motion.p
                className="mt-6 text-balance text-gray-300/90 md:text-xl text-center md:text-left leading-relaxed"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
              >
                The UMS Northern Division's flagship consumer promotion connecting leading suppliers with high‑performing member stores across the region.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col items-center md:items-start gap-3"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
              >
                <a
                  href={AGREEMENT_DOC}
                  download="PowerUp-Win-2025-Agreement.html"
                  target="_blank"
                  className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-white to-gray-100 px-8 py-4 font-bold text-neutral-900 shadow-[0_12px_40px_rgba(255,255,255,0.2)] transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-white hover:scale-105 hover:shadow-[0_16px_50px_rgba(255,255,255,0.3)] border border-white/20"
                >
                  <Download className="h-6 w-6" />
                  Download Member Agreement
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 font-bold text-white shadow-[0_12px_40px_rgba(220,38,38,0.5)] ring-2 ring-red-400/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:scale-105 hover:shadow-[0_16px_50px_rgba(220,38,38,0.6)] hover:ring-red-400/50"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  How it works <ArrowRight className="h-6 w-6" />
                </a>
              </motion.div>

              {/* Info pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
                className="mt-10 rounded-2xl bg-gradient-to-r from-white/15 to-white/5 p-6 backdrop-blur-xl ring-1 ring-white/20 border border-white/10"
              >
                <p className="text-base text-gray-200 font-medium">
                  🎯 Promotion window: <span className="font-bold text-white">20 Oct – 31 Jan 2026</span> · 🏆 Car give‑away by <span className="font-bold text-red-400">29 Feb 2025</span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS - Removed feature cards */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">How It Works</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-10 text-lg leading-relaxed">
            The PowerUp & Win promotion connects leading suppliers with high-performing member stores across the UMS Northern Division region.
          </p>
          
          {/* Back to Top Button */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 font-bold text-white shadow-[0_12px_40px_rgba(220,38,38,0.5)] ring-2 ring-red-400/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:scale-105 hover:shadow-[0_16px_50px_rgba(220,38,38,0.6)] hover:ring-red-400/50"
          >
            <ArrowRight className="h-6 w-6 rotate-180" />
            Back to Top
          </button>
        </div>
      </section>

      {/* INLINE AGREEMENT FORM */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-10 ring-1 ring-white/20 backdrop-blur-xl border border-white/10 shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">PowerUp & Win Agreement</h2>
          <p className="text-gray-300 text-center mb-10 text-lg leading-relaxed">
            Fill out the form below to participate in the PowerUp & Win promotion. No download required!
          </p>
          
          {/* Agreement Terms and Conditions */}
          <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6">Agreement Terms & Conditions</h3>
            
            <div className="space-y-6 text-sm text-neutral-300">
              <div>
                <h4 className="font-semibold text-white mb-2">PROMOTION DETAILS</h4>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>Promotion Period:</strong> 20 October 2025 - 31 January 2026</li>
                  <li>• <strong>Car Giveaway:</strong> 29 February 2025</li>
                  <li>• <strong>Insurance Coverage:</strong> Until 28 March 2025</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">MEMBER REQUIREMENTS</h4>
                <ol className="space-y-1 ml-4 list-decimal">
                  <li>Stock supplier ranges as specified in the promotion guidelines</li>
                  <li>Run in-store promotional activities during the promotion period</li>
                  <li>Maintain POS materials and branding as provided by UMS</li>
                  <li>Provide monthly photo feedback of promotional activities</li>
                  <li>Ensure proper documentation at handover</li>
                </ol>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">RETAIL PARTICIPATION</h4>
                <ul className="space-y-1 ml-4">
                  <li>• Shoppers enter via approved entry forms</li>
                  <li>• Forms must be properly completed and submitted</li>
                  <li>• All entries must comply with promotion terms</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">WHOLESALE PARTICIPATION</h4>
                <ul className="space-y-1 ml-4">
                  <li>• Top 5 customers by sales growth qualify for final draw</li>
                  <li>• Sales data must be verified and documented</li>
                  <li>• Performance metrics will be monitored monthly</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">WINNER OBLIGATIONS</h4>
                <ul className="space-y-1 ml-4">
                  <li>• Agree to supplier branding for 12 months</li>
                  <li>• Prize is not transferable for cash</li>
                  <li>• Must comply with all promotion terms and conditions</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">UMS RESPONSIBILITIES</h4>
                <ul className="space-y-1 ml-4">
                  <li>• Provide core POS materials and promotional assets</li>
                  <li>• Conduct fair and transparent final draw</li>
                  <li>• Ensure compliance with all regulations</li>
                  <li>• Provide ongoing support throughout promotion period</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-xs text-neutral-400">
                  <strong>UMS Northern Division</strong><br/>
                  This agreement is valid for the PowerUp & Win 2025 promotion period only.<br/>
                  By submitting this form, you agree to all terms and conditions outlined above.
                </p>
              </div>
            </div>
          </div>
          
          <AgreementForm />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-6">
        <div className="rounded-3xl bg-[radial-gradient(1200px_600px_at_120%_-20%,rgba(220,38,38,0.35),transparent_60%)] p-10 ring-1 ring-white/10 relative overflow-hidden">
          <motion.div className="pointer-events-none absolute -inset-y-10 -left-40 h-[200%] w-40 rotate-12 bg-white/10"
            animate={{ x: [0, 1200] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-bold md:text-3xl">Ready to power up?</h3>
              <p className="mt-2 max-w-2xl text-neutral-300">
                Download the Member Agreement, confirm your participation, and we'll equip you with assets for a standout campaign.
              </p>
            </div>
            <a href={AGREEMENT_DOC}
               download="PowerUp-Win-2025-Agreement.html"
               target="_blank"
               className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-neutral-900 shadow-[0_8px_30px_rgba(255,255,255,0.15)] transition hover:bg-neutral-100 hover:scale-105">
              <Download className="h-5 w-5" /> Member Agreement (HTML)
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 pb-12">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/20 bg-gradient-to-r from-white/10 to-white/5 p-8 sm:flex-row backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4">
            <img src={logoSrc} alt="PowerUp & Win" className="h-10 w-auto drop-shadow-lg" />
            <span className="text-base text-gray-300 font-medium">© {new Date().getFullYear()} PowerUp & Win · UMS Northern Division</span>
          </div>
          <div className="text-sm text-gray-400 font-medium">🏆 Prize not transferable for cash · 🛡️ Insurance covered by UMS until 28 Mar 2025</div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-red-600/90 px-4 py-3 font-semibold text-white shadow-[0_10px_40px_rgba(220,38,38,0.45)] ring-1 ring-red-400/50 transition hover:bg-red-500 hover:scale-105"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span className="hidden sm:inline">Back to Top</span>
        </motion.button>
      )}
    </div>
  );
}

/* ===== Decorative / interactive bits ===== */
function CursorGlow({ x, y }: { x: number; y: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden>
      <div
        className="absolute h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl transition-transform duration-300"
        style={{ left: x, top: y, background: "radial-gradient(closest-side, rgba(239,68,68,0.35), rgba(239,68,68,0))" }}
      />
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      <motion.div
        className="absolute -left-24 -top-24 h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(239,68,68,0.45), transparent 60%)" }}
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-1/3 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle at 70% 70%, rgba(59,130,246,0.28), transparent 60%)" }}
        animate={{ x: [0, -30, 20, 0], y: [0, 25, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 opacity-[0.12]">
        <div className="h-full w-full bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.25)_96%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.25)_96%)] bg-[size:24px_24px] animate-[bg-pan_30s_linear_infinite]" />
      </div>
      <style>{`@keyframes bg-pan { from { background-position: 0 0, 0 0; } to { background-position: 240px 240px, 240px 240px; } }`}</style>
    </div>
  );
}

// Email notification function
async function sendEmailNotification(data: any) {
  try {
    // Create email content
    const emailContent = `
New PowerUp & Win Agreement Submission

Submission ID: ${data.id}
Submitted At: ${data.submittedAt}

STORE INFORMATION:
- Store Name: ${data.storeName}
- Representative: ${data.representativeName}
- Store Type: ${data.storeType}

CONTACT INFORMATION:
- Email: ${data.email}
- Phone: ${data.phone}
- Address: ${data.address}

AGREEMENTS:
- Agreed to Terms: ${data.agreeToTerms ? 'Yes' : 'No'}
- Agreed to Branding: ${data.agreeToBranding ? 'Yes' : 'No'}

---
This is an automated notification from PowerUp & Win.
    `;

    // For production, you would integrate with:
    // - EmailJS (emailjs.com)
    // - SendGrid
    // - AWS SES
    // - Your own email server
    
    console.log('📧 EMAIL NOTIFICATION:');
    console.log(emailContent);
    
    // In production, replace this with actual email sending:
    // await emailService.send({
    //   to: 'your-email@company.com',
    //   subject: 'New PowerUp & Win Agreement Submission',
    //   text: emailContent
    // });
    
  } catch (error) {
    console.error('Email notification failed:', error);
  }
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
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Store Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Store Name *
            </label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter your store name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Authorized Representative *
            </label>
            <input
              type="text"
              name="representativeName"
              value={formData.representativeName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Store Type *
            </label>
            <select
              name="storeType"
              value={formData.storeType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Select store type</option>
              <option value="retail">Retail Store</option>
              <option value="wholesale">Wholesale</option>
              <option value="both">Both Retail & Wholesale</option>
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="+27 XX XXX XXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Store Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Enter your store address"
            />
          </div>
        </div>
      </div>

      {/* Agreement Terms */}
      <div className="space-y-4 pt-6 border-t border-white/20">
        <h3 className="text-xl font-semibold text-white">Agreement Terms</h3>
        
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              required
              className="mt-1 w-5 h-5 text-red-600 bg-white/10 border-white/20 rounded focus:ring-red-500 focus:ring-2"
            />
            <span className="text-neutral-300 text-sm">
              I agree to participate in the PowerUp & Win promotion and will comply with all terms and conditions, including stocking supplier ranges, running in-store promotions, and providing monthly feedback.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToBranding"
              checked={formData.agreeToBranding}
              onChange={handleInputChange}
              required
              className="mt-1 w-5 h-5 text-red-600 bg-white/10 border-white/20 rounded focus:ring-red-500 focus:ring-2"
            />
            <span className="text-neutral-300 text-sm">
              If selected as a winner, I agree to display supplier branding for 12 months and understand that the prize is not transferable for cash.
            </span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting || !formData.agreeToTerms || !formData.agreeToBranding}
          className="w-full rounded-2xl bg-red-600/90 px-8 py-4 font-semibold text-white shadow-[0_10px_40px_rgba(220,38,38,0.45)] ring-1 ring-red-400/50 transition hover:bg-red-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? 'Submitting Agreement...' : 'Submit Agreement'}
        </button>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="text-center p-4 rounded-xl bg-green-500/20 border border-green-500/50">
          <div className="text-green-400 font-semibold">
            ✅ Agreement submitted successfully!
          </div>
          <div className="text-green-300 text-sm mt-1">
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
