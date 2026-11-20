import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  Scale,
  HeartPulse,
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  BookOpen,
  PhoneCall,
  Radio,
  Shield,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FeatureCard } from '../components/FeatureCard';
import { Modal } from '../components/Modal';

export const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeModalFeature, setActiveModalFeature] = useState(null);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Friend';

  const featureCards = [
    {
      id: 'sos',
      title: 'Emergency SOS & Circles',
      description: 'One-tap emergency alert sent directly to verified guardians and local authorities.',
      icon: ShieldAlert,
      badge: 'Immediate',
      badgeVariant: 'warning',
      accentColor: 'text-sos',
      bgColor: 'bg-red-500/10 dark:bg-red-950/60',
      actionText: 'Open SOS Hub',
      onClick: () => navigate('/support')
    },
    {
      id: 'community',
      title: 'Sisterhood Community',
      description: 'Safe, anonymous space to share stories, seek advice, and find local peer support.',
      icon: Users,
      badge: 'Active Feed',
      badgeVariant: 'primary',
      accentColor: 'text-[#8E2131] dark:text-primary-light',
      bgColor: 'bg-primary-500/10 dark:bg-primary-950/60',
      actionText: 'View Community',
      onClick: () => navigate('/community')
    },
    {
      id: 'wellness',
      title: 'Wellness & Healing',
      description: 'Confidential mental health check-ins, licensed trauma counselors, and self-care audios.',
      icon: HeartPulse,
      badge: 'Wellbeing',
      badgeVariant: 'success',
      accentColor: 'text-emerald-700 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-950/60',
      actionText: 'Access Wellness',
      onClick: () =>
        setActiveModalFeature({
          title: 'Wellness & Mental Health',
          icon: HeartPulse,
          content:
            'Access verified 24/7 mental wellness helplines, guided breathwork exercises for anxiety, and confidential chat sessions with certified feminist counseling networks.'
        })
    }
  ];

  const quickHelplines = [
    { name: 'Women Helpline', number: '1091', desc: '24/7 Pan-India dedicated helpline', color: 'text-primary' },
    { name: 'National Emergency', number: '112', desc: 'Unified Police, Fire & Medical', color: 'text-sos' },
    { name: 'Cyber Crime Desk', number: '1930', desc: 'Stalking, harassment & fraud', color: 'text-primary' },
    { name: 'NCW Crisis Line', number: '7827170170', desc: 'Legal aid & rapid intervention', color: 'text-accent' }
  ];

  return (
    <div className="space-y-8 sm:space-y-10 pb-6">
      {/* =========================================================================
          LAYERED CINEMATIC HERO
          - Burgundy-to-rose radial mesh gradient
          - Faint lotus/mandala line motif at low opacity
          - Display serif greeting with refined gradient
          - Glass status chips with live green pulse
          - Floating glass safety status cluster (radar + guardian avatars)
          ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-gradient-to-br from-[#4A0E17] via-[#360911] to-[#20050A] text-lace p-6 sm:p-8 lg:p-10 shadow-float border border-white/10">
        {/* Soft Ambient Light Blobs */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#FE9179]/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-[#FF6B5E]/15 blur-3xl pointer-events-none" />

        {/* Faint Decorative Lotus / Mandala Line Motif */}
        <svg
          className="absolute right-0 bottom-0 w-96 h-96 text-white/[0.04] pointer-events-none stroke-current fill-none stroke-[0.8]"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="90" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="30" />
          <path d="M100 10 C130 50 130 80 100 100 C70 80 70 50 100 10 Z" />
          <path d="M100 190 C130 150 130 120 100 100 C70 120 70 150 100 190 Z" />
          <path d="M10 100 C50 130 80 130 100 100 C80 70 50 70 10 100 Z" />
          <path d="M190 100 C150 130 120 130 100 100 C120 70 150 70 190 100 Z" />
          <path d="M36 36 C75 60 90 85 100 100 C85 90 60 75 36 36 Z" />
          <path d="M164 164 C125 140 110 115 100 100 C115 110 140 125 164 164 Z" />
          <path d="M164 36 C140 75 115 90 100 100 C110 85 125 60 164 36 Z" />
          <path d="M36 164 C60 125 85 110 100 100 C90 115 75 140 36 164 Z" />
        </svg>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8">
          {/* Left: Greeting, status chips, and subtitle */}
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            {/* Live Status Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-tight bg-white/10 backdrop-blur-md text-[#FFEDD1] border border-white/15 shadow-xs">
                <Sparkles size={13} className="text-primary-light" /> Sakhi Circle Active
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-[#FFEDD1]/90 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <MapPin size={12} className="text-primary-light" /> Delhi NCR
              </span>
            </div>

            {/* Display Serif Large Greeting */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FFEDD1] font-serif leading-[1.15]">
                Namaste, {firstName}! 🌸
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#FFEDD1]/85 max-w-xl leading-relaxed font-sans">
                Your safe companion, emergency bridge, and trusted sister circle are active and ready.
              </p>
            </div>
          </div>

          {/* Right: CTAs: Prominent SOS button + Secondary Glass Button */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 shrink-0 pt-2 lg:pt-0">
            <button
              type="button"
              onClick={() => navigate('/support')}
              className="group relative px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#E52E2E] to-[#C11E1E] text-white text-xs sm:text-sm font-bold shadow-sos animate-sos-pulse hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2.5 min-h-touch border border-white/20 cursor-pointer"
            >
              <Radio size={16} className="text-white animate-pulse" />
              <span>Emergency SOS</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/community')}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/18 text-[#FFEDD1] border border-white/20 text-xs sm:text-sm font-semibold transition-all backdrop-blur-md inline-flex items-center gap-2 min-h-touch shadow-sm active:scale-95 cursor-pointer"
            >
              <Users size={16} />
              <span>Community Feed</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CORE SERVICES & GUIDES (3 Pillars Grid)
          - Emergency SOS & Circles
          - Sisterhood Community
          - Wellness & Healing
          - Refined "3 Pillars" pill badge
          ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-5 px-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink dark:text-lace font-serif">
              Core Services & Guides
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary dark:text-lace/70 mt-0.5">
              3 central pillars of support, sisterhood, and personal safety
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-burgundy-900/[0.05] dark:bg-white/[0.06] text-primary-800 dark:text-primary-light border border-burgundy-900/[0.08] dark:border-lace/[0.10] shadow-xs">
            3 Pillars
          </span>
        </div>

        {/* 3-Column Grid: 1 col on mobile, 3 col on tablet & desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {featureCards.map((card) => (
            <FeatureCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              badge={card.badge}
              badgeVariant={card.badgeVariant}
              accentColor={card.accentColor}
              bgColor={card.bgColor}
              actionText={card.actionText}
              isFeatured={card.isFeatured}
              onClick={card.onClick}
            />
          ))}
        </div>
      </div>

      {/* =========================================================================
          QUICK HELPLINES DIRECTORY
          - Refined cards with subtle borders & clean touch targets
          ========================================================================= */}
      <div className="bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-6 sm:p-7 shadow-premium">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-burgundy-900/[0.05] dark:bg-white/[0.06] text-primary flex items-center justify-center shrink-0 border border-burgundy-900/[0.06] dark:border-lace/[0.08]">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-ink dark:text-lace font-serif">
                Quick National Helplines Directory
              </h3>
              <p className="text-xs text-ink-muted dark:text-lace/70">
                Verified 24/7 direct dial emergency assistance
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-950/60 border border-emerald-500/20 px-3 py-1 rounded-full w-fit shadow-xs">
            Toll-Free & 24/7
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {quickHelplines.map((item) => (
            <a
              key={item.number}
              href={`tel:${item.number}`}
              className="group p-4 rounded-2xl bg-surface-alt dark:bg-[#23151D] hover:bg-white dark:hover:bg-[#2A1822] border border-burgundy-900/[0.08] dark:border-lace/[0.08] hover:border-primary-400 dark:hover:border-primary-500 text-ink dark:text-lace flex items-center justify-between transition-all duration-200 hover:shadow-soft active:scale-[0.99] min-h-touch"
            >
              <div>
                <span className="text-xs sm:text-sm font-bold block group-hover:text-primary transition-colors">
                  {item.name}
                </span>
                <span className="text-[11px] text-ink-muted dark:text-lace/70 line-clamp-1 mt-0.5">
                  {item.desc}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-sm bg-white dark:bg-[#1E1217] px-3 py-1.5 rounded-xl border border-burgundy-900/[0.08] dark:border-lace/[0.12] shrink-0 shadow-xs ml-2 group-hover:border-primary-300">
                <PhoneCall size={13} className={item.color} />
                <span className={item.color}>{item.number}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Feature Details Modal */}
      <Modal
        isOpen={!!activeModalFeature}
        onClose={() => setActiveModalFeature(null)}
        title={activeModalFeature?.title || ''}
        icon={activeModalFeature?.icon}
        confirmText="Understood"
        onConfirm={() => setActiveModalFeature(null)}
      >
        <p className="text-sm text-ink-secondary dark:text-lace/80 leading-relaxed font-sans">
          {activeModalFeature?.content}
        </p>
      </Modal>
    </div>
  );
};
