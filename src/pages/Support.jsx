import React, { useState } from 'react';
import {
  AlertTriangle,
  PhoneCall,
  ShieldAlert,
  Radio,
  CheckCircle2,
  MapPin,
  Clock,
  Shield,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/Modal';
import { PrimaryButton } from '../components/PrimaryButton';

export const Support = () => {
  const { user } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [isTriggering, setIsTriggering] = useState(false);

  const handleConfirmSOS = async () => {
    setIsTriggering(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsTriggering(false);
    setShowConfirmModal(false);
    setIsAlertActive(true);
  };

  const handleCancelAlert = () => {
    setIsAlertActive(false);
  };

  const helplines = [
    {
      name: 'Women in Distress',
      number: '1091',
      desc: '24/7 dedicated national helpline for women',
      color: 'bg-primary-soft text-[#5A121F] border-burgundy-900/[0.08] dark:bg-[#281820] dark:text-primary-light dark:border-lace/[0.10]'
    },
    {
      name: 'All-in-One Emergency',
      number: '112',
      desc: 'Unified police, fire, and ambulance service',
      color: 'bg-red-500/10 text-sos dark:text-red-400 border-red-500/20 dark:bg-red-950/50 dark:border-red-900/50'
    },
    {
      name: 'Cyber Crime Helpline',
      number: '1930',
      desc: 'Report online harassment, stalking & fraud',
      color: 'bg-primary-soft text-[#5A121F] border-burgundy-900/[0.08] dark:bg-[#281820] dark:text-primary-light dark:border-lace/[0.10]'
    },
    {
      name: 'National Commission for Women',
      number: '7827170170',
      desc: 'Legal support and crisis intervention',
      color: 'bg-accent/10 text-accent-dark dark:text-accent-light border-accent/20 dark:bg-accent/20 dark:border-accent/30'
    }
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-burgundy-900/[0.08] dark:border-lace/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink dark:text-lace font-serif">
            Emergency & Safety Hub
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary dark:text-lace/70 mt-1">
            Instant assistance, panic trigger, and verified emergency helplines.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-500/20 shadow-xs w-fit">
          <Shield size={14} className="text-emerald-600 dark:text-emerald-400" />
          <span>24/7 Response Dispatch Ready</span>
        </div>
      </div>

      {/* Responsive Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (SOS Panic Trigger & Active Status) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Active Alert Banner if triggered */}
          {isAlertActive ? (
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#E52E2E] to-[#B91C1C] text-white shadow-float animate-in fade-in zoom-in-95 space-y-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                  <Radio size={20} className="animate-pulse" />
                  <span>EMERGENCY SOS DISPATCHED</span>
                </div>
                <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full font-mono font-bold tracking-tight">
                  GPS: 28.6139° N, 77.2090° E
                </span>
              </div>

              <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                Simulated emergency broadcast sent to 3 trusted guardians and nearest response dispatch.
                Keep your device awake.
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-semibold flex items-center gap-1.5 text-red-100">
                  <Clock size={14} /> Alert active now
                </span>
                <button
                  type="button"
                  onClick={handleCancelAlert}
                  className="px-4 py-2.5 rounded-2xl bg-white text-red-700 text-xs font-bold hover:bg-lace transition-colors shadow-sm flex items-center gap-1.5 min-h-[40px] cursor-pointer"
                >
                  <XCircle size={15} /> Disarm / I am Safe
                </button>
              </div>
            </div>
          ) : (
            /* Large SOS Button Area */
            <div className="bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-6 sm:p-8 shadow-premium text-center flex flex-col items-center transition-colors">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 dark:bg-red-950/50 text-sos dark:text-red-300 border border-red-500/20 mb-4 shadow-xs">
                <Radio size={13} className="animate-pulse" /> One-Touch Panic Dispatch
              </div>

              <p className="text-xs font-bold text-ink-muted dark:text-lace/70 uppercase tracking-wider mb-6">
                Tap button below to call for help
              </p>

              {/* Large round SOS button with layered pulse animation */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-red-500/15 animate-ping opacity-60 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#991B1B] via-[#DC2626] to-[#EF4444] text-white font-black text-3xl sm:text-4xl tracking-wider shadow-sos animate-sos-pulse active:scale-95 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none border-4 border-white dark:border-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
                  aria-label="Trigger Emergency SOS confirmation"
                >
                  <ShieldAlert size={42} className="mb-1" />
                  <span>SOS</span>
                  <span className="text-[10px] font-bold tracking-normal opacity-90 mt-0.5">
                    HOLD OR TAP
                  </span>
                </button>
              </div>

              <p className="mt-6 text-xs sm:text-sm text-ink-secondary dark:text-lace/80 max-w-sm leading-relaxed">
                Will notify your 3 primary guardian contacts with live GPS coordinates and initiate one-touch connection to local emergency responders.
              </p>
            </div>
          )}

          {/* Quick instructions pill */}
          <div className="p-4 rounded-2xl bg-burgundy-900/[0.03] dark:bg-white/[0.04] border border-burgundy-900/[0.08] dark:border-lace/[0.08] text-xs text-ink-secondary dark:text-lace/80 flex items-start gap-3">
            <HelpCircle size={18} className="text-primary shrink-0 mt-0.5" />
            <span>
              In life-threatening situations, always dial <strong>112</strong> or <strong>1091</strong> directly from your phone.
            </span>
          </div>
        </div>

        {/* Right Column (24/7 Helplines & Guardian Circle Directory) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 24/7 Verified Helplines Directory */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-ink dark:text-lace font-serif flex items-center gap-2">
                  <PhoneCall size={18} className="text-primary" />
                  Verified National Helplines (Direct Call)
                </h2>
                <p className="text-xs text-ink-muted dark:text-lace/70">
                  Government of India certified toll-free emergency response
                </p>
              </div>
              <span className="text-[11px] font-bold px-3 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 shadow-xs">
                Toll-Free
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {helplines.map((item) => (
                <a
                  key={item.number}
                  href={`tel:${item.number}`}
                  className={`p-4 rounded-2xl border ${item.color} flex items-center justify-between transition-all duration-200 hover:shadow-soft active:scale-[0.99] min-h-touch`}
                >
                  <div className="pr-2">
                    <h3 className="text-xs sm:text-sm font-bold dark:text-lace">{item.name}</h3>
                    <p className="text-xs opacity-80 mt-0.5 dark:text-lace/70">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-sm bg-white dark:bg-[#150C10] dark:text-lace px-3 py-2 rounded-xl shrink-0 shadow-xs border border-burgundy-900/[0.08] dark:border-lace/[0.12]">
                    <PhoneCall size={14} className="text-primary" />
                    <span>{item.number}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Safety Circle Quick Status */}
          <div className="bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-5 sm:p-6 shadow-premium text-left transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Shield size={18} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-ink dark:text-lace font-serif">
                    Emergency Guardian Circle Status
                  </h3>
                  <p className="text-xs text-ink-muted dark:text-lace/70">
                    3 trusted contacts will receive SMS alert + GPS coordinates
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/20 shadow-xs">
                3 Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-surface-alt dark:bg-[#23151D] border border-burgundy-900/[0.06] dark:border-lace/[0.08]">
                <span className="text-[11px] font-bold text-primary block">Primary Contact</span>
                <span className="text-xs font-bold text-ink dark:text-lace block mt-0.5">Maa (Home)</span>
                <span className="text-xs font-mono text-ink-muted dark:text-lace/60 mt-1 block">+91 98*** **321</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-alt dark:bg-[#23151D] border border-burgundy-900/[0.06] dark:border-lace/[0.08]">
                <span className="text-[11px] font-bold text-accent block">Secondary Contact</span>
                <span className="text-xs font-bold text-ink dark:text-lace block mt-0.5">Ananya Sharma (Sister)</span>
                <span className="text-xs font-mono text-ink-muted dark:text-lace/60 mt-1 block">+91 97*** **890</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-alt dark:bg-[#23151D] border border-burgundy-900/[0.06] dark:border-lace/[0.08]">
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block">Tertiary Contact</span>
                <span className="text-xs font-bold text-ink dark:text-lace block mt-0.5">Neha Verma (Friend)</span>
                <span className="text-xs font-mono text-ink-muted dark:text-lace/60 mt-1 block">+91 99*** **441</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOS Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Emergency SOS"
        icon={AlertTriangle}
        confirmText="Yes, Send SOS Now"
        confirmVariant="danger"
        cancelText="Cancel / False Alarm"
        onConfirm={handleConfirmSOS}
        isConfirmLoading={isTriggering}
      >
        <div className="space-y-3 text-ink dark:text-lace text-left font-sans">
          <p className="text-sm font-bold text-red-600 dark:text-red-400">
            Are you in an emergency or feeling unsafe?
          </p>
          <p className="text-xs text-ink-secondary dark:text-lace/80 leading-relaxed">
            By confirming, SakhiBridge will immediately:
          </p>
          <ul className="text-xs text-ink-secondary dark:text-lace/80 space-y-1.5 list-disc pl-4">
            <li>Dispatch your live location to your 3 guardian contacts.</li>
            <li>Send a silent distress signal to the emergency response team.</li>
            <li>Prepare one-touch direct connection to Women Helpline (1091).</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};
