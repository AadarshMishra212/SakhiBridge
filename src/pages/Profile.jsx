import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Calendar,
  LogOut,
  Edit3,
  ShieldCheck,
  Bell,
  EyeOff,
  ChevronRight,
  CheckCircle2,
  Lock,
  Smartphone,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { Modal } from '../components/Modal';
import { InputField } from '../components/InputField';

export const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Preference toggles state
  const [preferences, setPreferences] = useState({
    locationSharing: true,
    shakeToSOS: false,
    anonymousMode: false
  });

  const handleToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenEdit = () => {
    setEditForm({
      name: user?.name || '',
      phone: user?.phone || ''
    });
    setSaveSuccess(false);
    setShowEditModal(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) return;

    setIsUpdating(true);
    try {
      await updateProfile({
        name: editForm.name.trim(),
        phone: editForm.phone.trim()
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setShowEditModal(false);
        setSaveSuccess(false);
      }, 600);
    } catch (err) {
      console.error('Update profile error:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    : '2026';

  return (
    <div className="space-y-8 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-burgundy-900/[0.08] dark:border-lace/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink dark:text-lace font-serif">
            Account & Safety Settings
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary dark:text-lace/70 mt-1 font-sans">
            Manage your verified identity, emergency circle contacts, and personal preferences.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-500/20 shadow-xs w-fit">
          <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
          <span>Security Tier: Verified Citizen</span>
        </div>
      </div>

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (Profile Identity Card & Contact Details) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Profile Overview Card */}
          <div className="bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-6 sm:p-7 shadow-premium text-center relative overflow-hidden transition-colors">
            {/* Decorative background ribbon */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-primary/15 via-accent/15 to-[#8E2131]/15" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Avatar with initials */}
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#8E2131] via-[#5A121F] to-[#360911] text-[#FFEDD1] font-black text-2xl flex items-center justify-center shadow-float border-4 border-white dark:border-[#1E1217] mb-3 group-hover:scale-105 transition-transform">
                {user?.avatar || 'SB'}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-ink dark:text-lace font-serif">{user?.name || 'Sakhi Member'}</h2>
              <p className="text-xs sm:text-sm text-ink-muted dark:text-lace/70 mt-0.5">{user?.email || 'user@example.com'}</p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary bg-primary-soft dark:bg-[#281820] px-3 py-1 rounded-full border border-burgundy-900/[0.06] dark:border-lace/[0.08]">
                  <ShieldCheck size={13} /> Verified Citizen
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted dark:text-lace/70 bg-surface-alt dark:bg-[#23151D] px-3 py-1 rounded-full">
                  <Calendar size={12} /> Member since {formattedDate}
                </span>
              </div>

              <button
                type="button"
                onClick={handleOpenEdit}
                className="mt-5 px-4 py-2.5 rounded-2xl bg-burgundy-900/[0.04] dark:bg-white/[0.06] hover:bg-burgundy-900/[0.08] dark:hover:bg-white/[0.10] text-primary text-xs font-bold transition-all duration-200 flex items-center gap-2 min-h-[42px] border border-burgundy-900/[0.08] dark:border-lace/[0.10] shadow-xs cursor-pointer active:scale-95"
              >
                <Edit3 size={15} /> Edit Contact Info
              </button>
            </div>
          </div>

          {/* Account Info Details */}
          <div className="bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-5 sm:p-6 shadow-premium space-y-3.5 text-left transition-colors">
            <h3 className="text-xs font-bold text-ink-muted dark:text-lace/70 uppercase tracking-wider">
              Emergency Contact Record
            </h3>

            <div className="flex items-center justify-between text-xs sm:text-sm py-2.5 border-b border-burgundy-900/[0.06] dark:border-lace/[0.08]">
              <div className="flex items-center gap-2.5 text-ink-secondary dark:text-lace/80">
                <Mail size={16} className="text-primary shrink-0" />
                <span>Primary Email</span>
              </div>
              <span className="font-semibold text-ink dark:text-lace truncate max-w-[180px]">{user?.email}</span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm py-2.5">
              <div className="flex items-center gap-2.5 text-ink-secondary dark:text-lace/80">
                <Phone size={16} className="text-accent shrink-0" />
                <span>Alert Phone</span>
              </div>
              <span className="font-semibold text-ink dark:text-lace font-mono">{user?.phone || 'Not provided'}</span>
            </div>
          </div>

          {/* Logout Action Area */}
          <div className="pt-2">
            <PrimaryButton
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setShowLogoutModal(true)}
              icon={LogOut}
              className="text-red-600 dark:text-red-400 border-red-500/20 dark:border-red-500/30 hover:bg-red-500/5 dark:hover:bg-red-950/40"
              fullWidth
            >
              Log Out of SakhiBridge
            </PrimaryButton>
            <p className="text-center text-[11px] text-ink-muted dark:text-lace/60 mt-3 font-medium">
              SakhiBridge v1.0.0 • Mobile & Laptop Calibrated
            </p>
          </div>
        </div>

        {/* Right Column (Safety Preferences & Privacy Settings) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Safety & App Preferences */}
          <div className="bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-5 sm:p-6 shadow-premium space-y-4 text-left transition-colors">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-ink dark:text-lace font-serif">
                Safety & Emergency Automation
              </h3>
              <p className="text-xs text-ink-muted dark:text-lace/70 mt-0.5">
                Customize how emergency distress signals are triggered and shared
              </p>
            </div>

            <div className="divide-y divide-burgundy-900/[0.06] dark:divide-lace/[0.08]">
              <div className="flex items-center justify-between py-4">
                <div className="pr-4">
                  <h4 className="text-xs sm:text-sm font-bold text-ink dark:text-lace">Live Guardian GPS Location Sharing</h4>
                  <p className="text-xs text-ink-muted dark:text-lace/70 mt-0.5 leading-relaxed font-sans">
                    Automatically transmit real-time GPS coordinates when SOS is triggered or during emergency transit.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('locationSharing')}
                  className={`w-12 h-6.5 rounded-full transition-colors relative shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer p-0.5 ${
                    preferences.locationSharing ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={preferences.locationSharing}
                  aria-label="Toggle live guardian GPS location sharing"
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      preferences.locationSharing ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="pr-4">
                  <h4 className="text-xs sm:text-sm font-bold text-ink dark:text-lace">Shake Phone to Trigger SOS</h4>
                  <p className="text-xs text-ink-muted dark:text-lace/70 mt-0.5 leading-relaxed font-sans">
                    Trigger distress alarm silently when phone accelerometer detects rapid agitation.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('shakeToSOS')}
                  className={`w-12 h-6.5 rounded-full transition-colors relative shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer p-0.5 ${
                    preferences.shakeToSOS ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={preferences.shakeToSOS}
                  aria-label="Toggle shake phone to trigger SOS"
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      preferences.shakeToSOS ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="pr-4">
                  <h4 className="text-xs sm:text-sm font-bold text-ink dark:text-lace">Anonymous Community Mode</h4>
                  <p className="text-xs text-ink-muted dark:text-lace/70 mt-0.5 leading-relaxed font-sans">
                    Mask your name automatically as "Anonymous Sakhi" on stories, queries, and comments.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('anonymousMode')}
                  className={`w-12 h-6.5 rounded-full transition-colors relative shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer p-0.5 ${
                    preferences.anonymousMode ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={preferences.anonymousMode}
                  aria-label="Toggle anonymous community mode"
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      preferences.anonymousMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Device Security Card */}
          <div className="bg-white dark:bg-[#1E1217] border border-burgundy-900/[0.08] dark:border-lace/[0.08] rounded-3xl p-5 sm:p-6 shadow-premium space-y-3 text-left transition-colors">
            <h3 className="text-sm sm:text-base font-bold text-ink dark:text-lace font-serif flex items-center gap-2">
              <Lock size={17} className="text-primary" />
              Privacy & Encryption Shield
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary dark:text-lace/80 leading-relaxed font-sans">
              All personal details, guardian contact numbers, and panic logs are encrypted using client-side protection before storage. SakhiBridge never sells user data or location telemetry to third parties.
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
        description="Update your contact details for your emergency guardians."
        confirmText={saveSuccess ? 'Saved!' : 'Save Changes'}
        confirmVariant="primary"
        cancelText="Cancel"
        onConfirm={handleSaveProfile}
        isConfirmLoading={isUpdating}
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
          <InputField
            id="edit-name"
            name="name"
            label="Full Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            required
            icon={User}
          />
          <InputField
            id="edit-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            label="Phone Number"
            value={editForm.phone}
            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            icon={Phone}
          />
        </form>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Log Out of SakhiBridge?"
        description="Are you sure you want to log out of SakhiBridge? You will need your credentials to access your safety dashboard again."
        confirmText="Log Out Now"
        confirmVariant="danger"
        cancelText="Stay Logged In"
        onConfirm={handleLogout}
        isConfirmLoading={isLoggingOut}
        icon={LogOut}
      />
    </div>
  );
};
