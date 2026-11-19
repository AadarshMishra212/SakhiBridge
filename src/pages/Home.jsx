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
  Clock
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
      bgColor: 'bg-red-50 dark:bg-red-950/50',
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
      accentColor: 'text-primary dark:text-primary-light',
      bgColor: 'bg-primary-soft dark:bg-[#281823]',
      actionText: 'View Community',
      onClick: () => navigate('/community')
    },
    {
      id: 'legal',
      title: 'Rights & Legal Aid',
      description: 'Free, simplified guidance on women’s rights, workplace protection, and legal clinics.',
      icon: Scale,
      badge: 'Guide',
      badgeVariant: 'accent',
      accentColor: 'text-accent',
      bgColor: 'bg-accent-soft dark:bg-pink-950/40',
      actionText: 'Explore Rights',
      onClick: () =>
        setActiveModalFeature({
          title: 'Rights & Legal Aid Guide',
          icon: Scale,
          content:
            'SakhiBridge provides verified legal primers on workplace safety (PoSH Act), domestic protection, inheritance rights, and digital privacy laws. Connect with pro-bono advocates and verified paralegal volunteers.'
        })
    },
    {
      id: 'wellness',
      title: 'Wellness & Healing',
      description: 'Confidential mental health check-ins, licensed trauma counselors, and self-care audios.',
      icon: HeartPulse,
      badge: 'Wellbeing',
      badgeVariant: 'success',
      accentColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/50',
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
    { name: 'Women Helpline', number: '1091', desc: '24/7 Pan-India dedicated helpline', color: 'text-primary dark:text-primary-light' },
    { name: 'National Emergency', number: '112', desc: 'Unified Police, Fire & Medical', color: 'text-sos' },
    { name: 'Cyber Crime Desk', number: '1930', desc: 'Stalking, harassment & fraud', color: 'text-primary dark:text-primary-light' },
    { name: 'NCW Crisis Line', number: '7827170170', desc: 'Legal aid & rapid intervention', color: 'text-accent' }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-4">
      {/* Personalized Welcome Hero Banner (Calibrated for both Mobile & Laptop viewports) */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FE9179] via-[#C55A44] to-[#842D1B] text-lace p-6 sm:p-8 shadow-float">
        {/* Soft background glow circles */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-accent/25 blur-3xl pointer-events-none" />
        <div className="absolute -left-8 -top-8 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-lace border border-lace/30">
                <Sparkles size={13} className="text-lace" /> Sakhi Circle Active
              </span>
              <span className="text-xs text-lace/90 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                <MapPin size={12} /> Delhi NCR
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-200 font-medium px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                <CheckCircle2 size={13} /> 3 Guardians Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-lace pt-1">
              Namaste, {firstName}! 🌸
            </h1>
            <p className="text-sm sm:text-base text-lace/90 max-w-2xl leading-relaxed">
              Your safe companion, emergency bridge, and trusted sister circle are active and ready.
            </p>
          </div>

          {/* Quick Action Buttons on Desktop */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-2 lg:pt-0 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/support')}
              className="px-5 py-3 rounded-xl bg-white text-primary text-xs sm:text-sm font-bold hover:bg-primary-50 transition-all shadow-md active:scale-95 inline-flex items-center gap-2 min-h-touch"
            >
              <Radio size={16} className="text-sos animate-pulse" />
              <span>Emergency SOS</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/community')}
              className="px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-lace border border-lace/30 text-xs sm:text-sm font-semibold transition-all backdrop-blur-sm inline-flex items-center gap-2 min-h-touch"
            >
              <Users size={16} />
              <span>Community Feed</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid (Responsive: 1 col on mobile, 2 col on tablet, 4 col on laptop) */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-ink dark:text-lace">Core Services & Guides</h2>
            <p className="text-xs sm:text-sm text-ink-secondary dark:text-lace/70 mt-0.5">
              4 central pillars of support, sisterhood, and personal safety
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-soft dark:bg-[#281823] text-primary dark:text-primary-light">
            4 Pillars
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
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
              onClick={card.onClick}
            />
          ))}
        </div>
      </div>

      {/* Quick Helplines Strip (Responsive: 2 col on mobile, 4 col on laptop) */}
      <div className="bg-white dark:bg-[#1E121A] border border-primary-100 dark:border-[#3A1F2D] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary-soft dark:bg-[#281823] text-primary dark:text-primary-light flex items-center justify-center shrink-0">
              <BookOpen size={18} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-ink dark:text-lace">
                Quick National Helplines Directory
              </h3>
              <p className="text-xs text-ink-muted dark:text-lace/70">
                Verified 24/7 direct dial emergency assistance
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full w-fit">
            Toll-Free & 24/7
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickHelplines.map((item) => (
            <a
              key={item.number}
              href={`tel:${item.number}`}
              className="p-3.5 rounded-xl bg-surface-alt dark:bg-[#24151F] hover:bg-primary-50 dark:hover:bg-[#331F2D] border border-primary-100 dark:border-[#4C293C] text-ink dark:text-lace flex items-center justify-between transition-all hover:shadow-soft active:scale-[0.99] min-h-touch"
            >
              <div>
                <span className="text-xs font-bold block">{item.name}</span>
                <span className="text-[11px] text-ink-muted dark:text-lace/70 line-clamp-1">{item.desc}</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-sm bg-white dark:bg-[#281823] px-2.5 py-1.5 rounded-lg border border-primary-100/60 dark:border-[#4C293C] shrink-0 shadow-xs ml-2">
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
        <p className="text-sm text-ink-secondary leading-relaxed">
          {activeModalFeature?.content}
        </p>
      </Modal>
    </div>
  );
};
