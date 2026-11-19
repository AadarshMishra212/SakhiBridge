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
      alert(err.message || 'Failed to update profile');
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
    <div className="space-y-6 pb-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-1 border-b border-purple-100/60 dark:border-purple-900/40">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-ink dark:text-white">Account & Safety Settings</h1>
          <p className="text-xs sm:text-sm text-ink-secondary dark:text-purple-200/70 mt-0.5">
            Manage your verified identity, emergency circle contacts, and personal preferences.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft dark:bg-[#201833] text-primary dark:text-primary-light text-xs font-semibold w-fit">
          <ShieldCheck size={14} /> Security Tier: Verified Citizen
        </div>
      </div>

      {/* Main Responsive Grid Layout (Stacked on Mobile, 2 Columns on Laptop / Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column (Profile Identity Card & Contact Details) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Profile Overview Card */}
          <div className="bg-white dark:bg-[#161126] border border-purple-100 dark:border-purple-900/50 rounded-2xl sm:rounded-3xl p-6 shadow-soft text-center relative overflow-hidden transition-colors">
            {/* Soft decorative background ribbon */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-primary-100/70 to-accent-100/70 dark:from-purple-950/70 dark:to-pink-950/70" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Avatar with initials */}
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent text-white font-bold text-2xl flex items-center justify-center shadow-float border-4 border-white dark:border-[#161126] mb-3">
                {user?.avatar || 'SB'}
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-ink dark:text-white">{user?.name || 'Sakhi Member'}</h2>
              <p className="text-xs sm:text-sm text-ink-muted dark:text-purple-300/70 mt-0.5">{user?.email || 'user@example.com'}</p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary dark:text-primary-light bg-primary-soft dark:bg-[#2B2342] px-3 py-1 rounded-full border border-primary-200 dark:border-purple-700/60">
                  <ShieldCheck size={13} /> Verified Citizen
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted dark:text-purple-300/70 bg-surface-alt dark:bg-[#201A30] px-3 py-1 rounded-full">
                  <Calendar size={12} /> Member since {formattedDate}
                </span>
              </div>

              <button
                type="button"
                onClick={handleOpenEdit}
                className="mt-4 px-4 py-2.5 rounded-xl bg-purple-50 dark:bg-[#2B2342] hover:bg-purple-100 dark:hover:bg-[#342A50] text-primary dark:text-primary-light text-xs font-semibold transition-colors flex items-center gap-2 min-h-[40px]"
              >
                <Edit3 size={15} /> Edit Contact Info
              </button>
            </div>
          </div>

          {/* Account Info Details */}
          <div className="bg-white dark:bg-[#161126] border border-purple-100 dark:border-purple-900/50 rounded-2xl p-5 shadow-soft space-y-3.5 text-left transition-colors">
            <h3 className="text-xs font-bold text-ink-muted dark:text-purple-300/70 uppercase tracking-wider">
              Emergency Contact Record
            </h3>

            <div className="flex items-center justify-between text-xs sm:text-sm py-2 border-b border-purple-50 dark:border-purple-900/40">
              <div className="flex items-center gap-2.5 text-ink-secondary dark:text-purple-200/80">
                <Mail size={16} className="text-primary dark:text-primary-light shrink-0" />
                <span>Primary Email</span>
              </div>
              <span className="font-semibold text-ink dark:text-white truncate max-w-[180px]">{user?.email}</span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm py-2">
              <div className="flex items-center gap-2.5 text-ink-secondary dark:text-purple-200/80">
                <Phone size={16} className="text-accent shrink-0" />
                <span>Alert Phone</span>
              </div>
              <span className="font-semibold text-ink dark:text-white font-mono">{user?.phone || 'Not provided'}</span>
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
              className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/60 hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-300"
              fullWidth
            >
              Log Out of SakhiBridge
            </PrimaryButton>
            <p className="text-center text-[11px] text-ink-muted dark:text-purple-300/60 mt-2">
              SakhiBridge v1.0.0 • Mobile & Laptop Calibrated
            </p>
          </div>
        </div>

        {/* Right Column (Safety Preferences & Privacy Settings) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Safety & App Preferences */}
          <div className="bg-white dark:bg-[#161126] border border-purple-100 dark:border-purple-900/50 rounded-2xl p-5 sm:p-6 shadow-soft space-y-4 text-left transition-colors">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-ink dark:text-white">
                Safety & Emergency Automation
              </h3>
              <p className="text-xs text-ink-muted dark:text-purple-300/70 mt-0.5">
                Customize how emergency distress signals are triggered and shared
              </p>
            </div>

            <div className="divide-y divide-purple-50 dark:divide-purple-900/40">
              <div className="flex items-center justify-between py-3.5">
                <div className="pr-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-ink dark:text-white">Live Guardian GPS Location Sharing</h4>
                  <p className="text-xs text-ink-muted dark:text-purple-300/70 mt-0.5">
                    Automatically transmit real-time GPS coordinates when SOS is triggered or during emergency transit.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('locationSharing')}
                  className={`w-12 h-6.5 rounded-full transition-colors relative shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                    preferences.locationSharing ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={preferences.locationSharing}
                  aria-label="Toggle live guardian GPS location sharing"
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                      preferences.locationSharing ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3.5">
                <div className="pr-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-ink dark:text-white">Shake Phone to Trigger SOS</h4>
                  <p className="text-xs text-ink-muted dark:text-purple-300/70 mt-0.5">
                    Trigger distress alarm silently when phone accelerometer detects rapid agitation.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('shakeToSOS')}
                  className={`w-12 h-6.5 rounded-full transition-colors relative shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                    preferences.shakeToSOS ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={preferences.shakeToSOS}
                  aria-label="Toggle shake phone to trigger SOS"
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                      preferences.shakeToSOS ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3.5">
                <div className="pr-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-ink dark:text-white">Anonymous Community Mode</h4>
                  <p className="text-xs text-ink-muted dark:text-purple-300/70 mt-0.5">
                    Mask your name automatically as "Anonymous Sakhi" on stories, queries, and comments.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('anonymousMode')}
                  className={`w-12 h-6.5 rounded-full transition-colors relative shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-200 ${
                    preferences.anonymousMode ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={preferences.anonymousMode}
                  aria-label="Toggle anonymous community mode"
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                      preferences.anonymousMode ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Device Security Card */}
          <div className="bg-white dark:bg-[#161126] border border-purple-100 dark:border-purple-900/50 rounded-2xl p-5 sm:p-6 shadow-soft space-y-3 text-left transition-colors">
            <h3 className="text-sm font-bold text-ink dark:text-white flex items-center gap-2">
              <Lock size={16} className="text-primary dark:text-primary-light" />
              Privacy & Encryption Shield
            </h3>
            <p className="text-xs text-ink-secondary dark:text-purple-200/80 leading-relaxed">
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
        <form onSubmit={handleSaveProfile} className="space-y-3.5 text-left">
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
        description="You will be returned to the login screen. You will need your credentials to access your safety dashboard again."
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
