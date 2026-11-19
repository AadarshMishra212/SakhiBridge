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
  CheckCircle2
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
      // Navigate to /login with replace: true so protected routes are not kept in history
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
    <div className="space-y-5 pb-6">
      {/* Profile Overview Card */}
      <div className="bg-white dark:bg-[#191426] border border-purple-100 dark:border-purple-900/50 rounded-3xl p-6 shadow-soft text-center relative overflow-hidden transition-colors">
        {/* Soft decorative background ribbon */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-primary-100/70 to-accent-100/70 dark:from-purple-950/70 dark:to-pink-950/70" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar with initials */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent text-white font-bold text-2xl flex items-center justify-center shadow-float border-4 border-white dark:border-[#191426] mb-3">
            {user?.avatar || 'SB'}
          </div>

          <h1 className="text-lg font-bold text-ink dark:text-white">{user?.name || 'Sakhi Member'}</h1>
          <p className="text-xs text-ink-muted dark:text-purple-300/60">{user?.email || 'user@example.com'}</p>

          <div className="mt-3 flex items-center gap-2">
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
            className="mt-4 px-4 py-2 rounded-xl bg-purple-50 dark:bg-[#2B2342] hover:bg-purple-100 dark:hover:bg-[#342A50] text-primary dark:text-primary-light text-xs font-semibold transition-colors flex items-center gap-1.5 min-h-[38px]"
          >
            <Edit3 size={14} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Account Info Details */}
      <div className="bg-white dark:bg-[#191426] border border-purple-100 dark:border-purple-900/50 rounded-brand p-4 shadow-soft space-y-3 text-left transition-colors">
        <h2 className="text-xs font-bold text-ink-muted dark:text-purple-300/70 uppercase tracking-wider">
          Contact Details
        </h2>

        <div className="flex items-center justify-between text-xs py-1.5 border-b border-purple-50 dark:border-purple-900/40">
          <div className="flex items-center gap-2.5 text-ink-secondary dark:text-purple-200/80">
            <Mail size={16} className="text-primary dark:text-primary-light" />
            <span>Email</span>
          </div>
          <span className="font-medium text-ink dark:text-white">{user?.email}</span>
        </div>

        <div className="flex items-center justify-between text-xs py-1.5">
          <div className="flex items-center gap-2.5 text-ink-secondary dark:text-purple-200/80">
            <Phone size={16} className="text-accent" />
            <span>Emergency Phone</span>
          </div>
          <span className="font-medium text-ink dark:text-white">{user?.phone || 'Not provided'}</span>
        </div>
      </div>

      {/* Safety & App Preferences */}
      <div className="bg-white dark:bg-[#191426] border border-purple-100 dark:border-purple-900/50 rounded-brand p-4 shadow-soft space-y-3 text-left transition-colors">
        <h2 className="text-xs font-bold text-ink-muted dark:text-purple-300/70 uppercase tracking-wider">
          Safety Preferences
        </h2>

        <div className="flex items-center justify-between py-2 border-b border-purple-50 dark:border-purple-900/40">
          <div>
            <h3 className="text-xs font-semibold text-ink dark:text-white">Live Guardian Location Sharing</h3>
            <p className="text-[11px] text-ink-muted dark:text-purple-300/70">Share GPS coordinates when SOS or trip starts</p>
          </div>
          <button
            type="button"
            onClick={() => handleToggle('locationSharing')}
            className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary-200 ${
              preferences.locationSharing ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            role="switch"
            aria-checked={preferences.locationSharing}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                preferences.locationSharing ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-purple-50 dark:border-purple-900/40">
          <div>
            <h3 className="text-xs font-semibold text-ink dark:text-white">Shake Phone to Trigger SOS</h3>
            <p className="text-[11px] text-ink-muted dark:text-purple-300/70">Simulate emergency on aggressive phone shake</p>
          </div>
          <button
            type="button"
            onClick={() => handleToggle('shakeToSOS')}
            className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary-200 ${
              preferences.shakeToSOS ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            role="switch"
            aria-checked={preferences.shakeToSOS}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                preferences.shakeToSOS ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <h3 className="text-xs font-semibold text-ink dark:text-white">Anonymous Community Mode</h3>
            <p className="text-[11px] text-ink-muted dark:text-purple-300/70">Mask your name as "Anonymous Sakhi" on posts</p>
          </div>
          <button
            type="button"
            onClick={() => handleToggle('anonymousMode')}
            className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary-200 ${
              preferences.anonymousMode ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            role="switch"
            aria-checked={preferences.anonymousMode}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                preferences.anonymousMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
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
          Log Out
        </PrimaryButton>
        <p className="text-center text-[11px] text-ink-muted dark:text-purple-300/60 mt-2">
          SakhiBridge v1.0.0 • Mobile-first Secure Base
        </p>
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

