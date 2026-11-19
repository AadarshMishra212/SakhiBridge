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
  BookOpen
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
      bgColor: 'bg-red-50',
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
      accentColor: 'text-primary',
      bgColor: 'bg-primary-soft',
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
      bgColor: 'bg-accent-soft',
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
      accentColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
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

  return (
    <div className="space-y-5 pb-4">
      {/* Personalized Welcome Banner */}
      <div className="relative overflow-hidden rounded-brand bg-gradient-to-br from-primary via-primary-dark to-[#552B9E] text-white p-5 sm:p-6 shadow-soft">
        {/* Soft background glow circles */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-accent/20 blur-2xl pointer-events-none" />
        <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/25">
              <Sparkles size={12} className="text-pink-200" /> Sakhi Circle Active
            </span>
            <span className="text-[11px] text-purple-200 flex items-center gap-1">
              <MapPin size={12} /> Delhi NCR
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Namaste, {firstName}! 💜
          </h1>
          <p className="mt-1 text-sm text-purple-100 max-w-xs leading-relaxed">
            You are connected with your trusted circle and 24/7 emergency response.
          </p>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-200 font-medium">
              <CheckCircle2 size={15} /> All 3 Guardians Active
            </div>
            <button
              type="button"
              onClick={() => navigate('/support')}
              className="px-3 py-1.5 rounded-lg bg-white text-primary text-xs font-bold hover:bg-purple-50 transition-colors shadow-sm inline-flex items-center gap-1"
            >
              Emergency SOS <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid (4 placeholder feature cards) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-base font-bold text-ink dark:text-white">Core Services & Guides</h2>
          <span className="text-xs text-ink-muted dark:text-purple-300/60">4 pillars</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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

      {/* Quick Helplines Strip */}
      <div className="bg-white dark:bg-[#191426] border border-purple-100 dark:border-purple-900/50 rounded-brand p-4 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-ink dark:text-white flex items-center gap-2">
            <BookOpen size={16} className="text-primary dark:text-primary-light" /> Quick National Helplines
          </h3>
          <span className="text-[11px] text-ink-muted dark:text-purple-300/60">24/7 Free</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href="tel:1091"
            className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-[#221C33] hover:bg-purple-100/70 dark:hover:bg-[#2B2342] text-ink dark:text-white flex items-center justify-between transition-colors font-medium border border-purple-100 dark:border-purple-800/40"
          >
            <span>Women Helpline</span>
            <span className="font-bold text-primary dark:text-primary-light">1091</span>
          </a>
          <a
            href="tel:112"
            className="p-2.5 rounded-xl bg-red-50/70 dark:bg-red-950/40 hover:bg-red-100/70 dark:hover:bg-red-900/50 text-ink dark:text-white flex items-center justify-between transition-colors font-medium border border-red-100 dark:border-red-900/40"
          >
            <span>National Emergency</span>
            <span className="font-bold text-sos dark:text-red-400">112</span>
          </a>
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

