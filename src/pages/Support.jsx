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
    // Simulate brief alert network dispatch
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
      color: 'bg-primary-soft text-primary-dark border-primary-100 dark:bg-[#281823] dark:border-[#4C293C]'
    },
    {
      name: 'All-in-One Emergency',
      number: '112',
      desc: 'Unified police, fire, and ambulance service',
      color: 'bg-red-50 text-sos-dark border-red-200 dark:bg-red-950/50 dark:border-red-900/50'
    },
    {
      name: 'Cyber Crime Helpline',
      number: '1930',
      desc: 'Report online harassment, stalking & fraud',
      color: 'bg-primary-soft text-primary-dark border-primary-200 dark:bg-[#281823] dark:border-[#4C293C]'
    },
    {
      name: 'National Commission for Women',
      number: '7827170170',
      desc: 'Legal support and crisis intervention',
      color: 'bg-pink-50 text-accent-dark border-pink-200 dark:bg-pink-950/40 dark:border-pink-900/40'
    }
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1 border-b border-primary-100/60 dark:border-[#3A1F2D]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ink dark:text-lace">Emergency & Safety Hub</h1>
          <p className="text-xs sm:text-sm text-ink-secondary dark:text-lace/70 mt-0.5">
            Instant assistance, panic trigger, and verified emergency helplines.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/60 w-fit">
          <Shield size={14} /> 24/7 Response Dispatch Ready
        </div>
      </div>

      {/* Responsive Layout Grid (Stacked on Mobile, 2 Columns on Laptop / Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (SOS Panic Trigger & Active Status) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Alert Banner if triggered */}
          {isAlertActive ? (
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-red-600 text-white shadow-float animate-in fade-in zoom-in-95 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                  <Radio size={20} className="animate-pulse" />
                  <span>EMERGENCY SOS DISPATCHED</span>
                </div>
                <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full font-mono">
                  GPS: 28.6139° N, 77.2090° E
                </span>
              </div>

              <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                Simulated emergency broadcast sent to 3 trusted guardians and nearest response dispatch.
                Keep your device awake.
              </p>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-medium flex items-center gap-1.5 text-red-100">
                  <Clock size={14} /> Alert active now
                </span>
                <button
                  type="button"
                  onClick={handleCancelAlert}
                  className="px-4 py-2 rounded-xl bg-white text-red-700 text-xs font-bold hover:bg-red-50 transition-colors shadow-sm flex items-center gap-1.5 min-h-[40px]"
                >
                  <XCircle size={15} /> Disarm / I am Safe
                </button>
              </div>
            </div>
          ) : (
            /* Large SOS Button Area */
            <div className="bg-white dark:bg-[#1E121A] border border-primary-100 dark:border-[#3A1F2D] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-soft text-center flex flex-col items-center transition-colors">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/50 text-sos dark:text-red-300 border border-red-200 dark:border-red-900/50 mb-4">
                <Radio size={13} className="animate-pulse" /> One-Touch Panic Dispatch
              </div>

              <p className="text-xs font-semibold text-ink-muted dark:text-lace/70 uppercase tracking-wider mb-6">
                Tap button below to call for help
              </p>

              {/* Large round SOS button with pulse animation */}
              <div className="relative my-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-sos-dark via-sos to-red-500 text-white font-black text-3xl sm:text-4xl tracking-wider shadow-sos animate-sos-pulse active:scale-95 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none border-4 border-white/70 dark:border-white/30 focus:outline-none focus:ring-4 focus:ring-red-400"
                  aria-label="Trigger Emergency SOS confirmation"
                >
                  <ShieldAlert size={42} className="mb-1" />
                  <span>SOS</span>
                  <span className="text-[10px] font-semibold tracking-normal opacity-90 mt-0.5">
                    HOLD OR TAP
                  </span>
                </button>
              </div>

              <p className="mt-6 text-xs sm:text-sm text-ink-secondary dark:text-lace/70 max-w-sm leading-relaxed">
                Will notify your 3 primary guardian contacts with live GPS coordinates and initiate one-touch connection to local emergency responders.
              </p>
            </div>
          )}

          {/* Quick instructions pill */}
          <div className="p-4 rounded-xl bg-primary-soft/70 dark:bg-[#281823] border border-primary-100 dark:border-[#3A1F2D] text-xs text-ink-secondary dark:text-lace/80 flex items-start gap-2.5">
            <HelpCircle size={17} className="text-primary dark:text-primary-light shrink-0 mt-0.5" />
            <span>
              In life-threatening situations, always dial <strong>112</strong> or <strong>1091</strong> directly from your phone.
            </span>
          </div>
        </div>

        {/* Right Column (24/7 Helplines & Guardian Circle Directory) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 24/7 Verified Helplines Directory */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-ink dark:text-lace flex items-center gap-2">
                  <PhoneCall size={18} className="text-primary dark:text-primary-light" />
                  Verified National Helplines (Direct Call)
                </h2>
                <p className="text-xs text-ink-muted dark:text-lace/70">
                  Government of India certified toll-free emergency response
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                Toll-Free
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {helplines.map((item) => (
                <a
                  key={item.number}
                  href={`tel:${item.number}`}
                  className={`p-4 rounded-xl sm:rounded-2xl border ${item.color} flex items-center justify-between transition-all hover:shadow-soft active:scale-[0.99] min-h-touch`}
                >
                  <div className="pr-2">
                    <h3 className="text-xs sm:text-sm font-bold dark:text-lace">{item.name}</h3>
                    <p className="text-xs opacity-80 mt-0.5 dark:text-lace/70">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-sm bg-white/80 dark:bg-[#281823] dark:text-lace px-3 py-2 rounded-xl shrink-0 shadow-xs border border-primary-100/50 dark:border-[#4C293C]">
                    <PhoneCall size={14} />
                    <span>{item.number}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Safety Circle Quick Status */}
          <div className="bg-white dark:bg-[#1E121A] border border-primary-100 dark:border-[#3A1F2D] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-soft text-left transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Shield size={17} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-ink dark:text-lace">
                    Emergency Guardian Circle Status
                  </h3>
                  <p className="text-xs text-ink-muted dark:text-lace/70">
                    3 trusted contacts will receive SMS alert + GPS coordinates
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                3 Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-surface-alt dark:bg-[#24151F] border border-primary-100 dark:border-[#4C293C]">
                <span className="text-[11px] font-semibold text-primary dark:text-primary-light block">Primary Contact</span>
                <span className="text-xs font-bold text-ink dark:text-lace block mt-0.5">Maa (Home)</span>
                <span className="text-xs font-mono text-ink-muted dark:text-lace/60 mt-1 block">+91 98*** **321</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-alt dark:bg-[#24151F] border border-primary-100 dark:border-[#4C293C]">
                <span className="text-[11px] font-semibold text-accent block">Secondary Contact</span>
                <span className="text-xs font-bold text-ink dark:text-lace block mt-0.5">Ananya Sharma (Sister)</span>
                <span className="text-xs font-mono text-ink-muted dark:text-lace/60 mt-1 block">+91 97*** **890</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-alt dark:bg-[#24151F] border border-primary-100 dark:border-[#4C293C]">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block">Tertiary Contact</span>
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
        <div className="space-y-3 text-ink dark:text-lace text-left">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
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
