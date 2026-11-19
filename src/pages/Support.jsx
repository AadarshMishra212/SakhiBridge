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
  XCircle
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
      color: 'bg-primary-soft text-primary-dark border-primary-100'
    },
    {
      name: 'All-in-One Emergency',
      number: '112',
      desc: 'Unified police, fire, and ambulance service',
      color: 'bg-red-50 text-sos-dark border-red-200'
    },
    {
      name: 'Cyber Crime Helpline',
      number: '1930',
      desc: 'Report online harassment, stalking & fraud',
      color: 'bg-purple-50 text-purple-800 border-purple-200'
    },
    {
      name: 'National Commission for Women',
      number: '7827170170',
      desc: 'Legal support and crisis intervention',
      color: 'bg-pink-50 text-accent-dark border-pink-200'
    }
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Top Header info */}
      <div className="text-center">
        <h1 className="text-xl font-bold text-ink dark:text-white">Emergency & Safety Hub</h1>
        <p className="text-xs text-ink-secondary dark:text-purple-200/70 mt-1">
          Instant assistance, panic trigger, and verified emergency helplines.
        </p>
      </div>

      {/* Active Alert Banner if triggered */}
      {isAlertActive ? (
        <div className="p-4 rounded-brand bg-red-600 text-white shadow-float animate-in fade-in zoom-in-95 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Radio size={18} className="animate-pulse" />
              <span>EMERGENCY SOS DISPATCHED</span>
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">
              GPS: 28.6139° N, 77.2090° E
            </span>
          </div>

          <p className="text-xs text-red-100 leading-relaxed">
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
              className="px-3 py-1.5 rounded-lg bg-white text-red-700 text-xs font-bold hover:bg-red-50 transition-colors shadow-sm flex items-center gap-1"
            >
              <XCircle size={14} /> Disarm / I am Safe
            </button>
          </div>
        </div>
      ) : (
        /* Large SOS Button Area */
        <div className="bg-white dark:bg-[#191426] border border-purple-100 dark:border-purple-900/50 rounded-3xl p-6 sm:p-8 shadow-soft text-center flex flex-col items-center transition-colors">
          <p className="text-xs font-semibold text-ink-muted dark:text-purple-300/70 uppercase tracking-wider mb-5">
            Tap button below to call for help
          </p>

          {/* Large round SOS button with pulse animation */}
          <div className="relative my-2">
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-sos-dark via-sos to-red-500 text-white font-black text-3xl tracking-wider shadow-sos animate-sos-pulse active:scale-95 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none border-4 border-white/60 dark:border-white/40 focus:outline-none focus:ring-4 focus:ring-red-400"
              aria-label="Trigger Emergency SOS confirmation"
            >
              <ShieldAlert size={36} className="mb-1" />
              <span>SOS</span>
              <span className="text-[10px] font-medium tracking-normal opacity-90">
                HOLD OR TAP
              </span>
            </button>
          </div>

          <p className="mt-6 text-xs text-ink-secondary dark:text-purple-200/70 max-w-xs leading-relaxed">
            Will notify your primary contacts and provide instant one-touch connection to local authorities.
          </p>
        </div>
      )}

      {/* 24/7 Verified Helplines Directory */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-ink dark:text-white flex items-center gap-1.5">
            <PhoneCall size={16} className="text-primary dark:text-primary-light" /> Verified Helplines (Direct Call)
          </h2>
          <span className="text-[11px] text-ink-muted dark:text-purple-300/60">Toll-free</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {helplines.map((item) => (
            <a
              key={item.number}
              href={`tel:${item.number}`}
              className={`p-3.5 rounded-brand border ${item.color} dark:bg-[#1E1730] dark:border-purple-800/40 flex items-center justify-between transition-all hover:shadow-soft active:scale-[0.99]`}
            >
              <div>
                <h3 className="text-xs font-bold dark:text-white">{item.name}</h3>
                <p className="text-[11px] opacity-80 mt-0.5 line-clamp-1 dark:text-purple-200/70">{item.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-sm bg-white/70 dark:bg-[#2B2342] dark:text-white px-2.5 py-1.5 rounded-xl shrink-0 shadow-xs">
                <PhoneCall size={13} />
                <span>{item.number}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Safety Circle Quick Status */}
      <div className="bg-white dark:bg-[#191426] border border-purple-100 dark:border-purple-900/50 rounded-brand p-4 shadow-soft text-left transition-colors">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-ink dark:text-white flex items-center gap-1.5">
            <Shield size={15} className="text-emerald-600 dark:text-emerald-400" /> Guardian Circle Status
          </h3>
          <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/60">
            3 Ready
          </span>
        </div>

        <ul className="text-xs space-y-2 text-ink-secondary dark:text-purple-200/80">
          <li className="flex items-center justify-between py-1 border-b border-purple-50 dark:border-purple-900/40">
            <span>Primary: Maa (Home)</span>
            <span className="text-ink-muted dark:text-purple-300/60 font-mono">+91 98*** **321</span>
          </li>
          <li className="flex items-center justify-between py-1 border-b border-purple-50 dark:border-purple-900/40">
            <span>Sister: Ananya Sharma</span>
            <span className="text-ink-muted dark:text-purple-300/60 font-mono">+91 97*** **890</span>
          </li>
          <li className="flex items-center justify-between py-1">
            <span>Friend: Neha Verma</span>
            <span className="text-ink-muted dark:text-purple-300/60 font-mono">+91 99*** **441</span>
          </li>
        </ul>
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
        <div className="space-y-3 text-ink text-left">
          <p className="text-sm font-semibold text-red-600">
            Are you in an emergency or feeling unsafe?
          </p>
          <p className="text-xs text-ink-secondary leading-relaxed">
            By confirming, SakhiBridge will immediately:
          </p>
          <ul className="text-xs text-ink-secondary space-y-1.5 list-disc pl-4">
            <li>Dispatch your live location to your 3 guardian contacts.</li>
            <li>Send a silent distress signal to the emergency response team.</li>
            <li>Prepare one-touch direct connection to Women Helpline (1091).</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

