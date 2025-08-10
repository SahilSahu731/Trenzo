import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, Smartphone, Monitor, LogOut } from 'lucide-react';

// --- Reusable Password Input Component ---
const PasswordInput = ({ id, placeholder, value, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        id={id}
        type={isVisible ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

// --- Reusable Session Item Component ---
const SessionItem = ({ icon: Icon, device, location, time }) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
    <div className="flex items-center gap-4">
      <Icon className="text-gray-500 dark:text-gray-300" size={32} />
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{device}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{location} • {time}</p>
      </div>
    </div>
    <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
      Log out
    </button>
  </div>
);

// --- The Main Security Page Component ---
const SecurityPage = () => {
  // State for the Change Password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State to manage the UI for 2FA
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  // Placeholder handler for the password change form
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    console.log('Changing password with:', { currentPassword, newPassword });
    // Backend API call to change password will be added here later
  };
  
  // Dummy data for Login Activity
  const activeSessions = [
    { device: 'Chrome on Windows', location: 'Lucknow, IN', time: 'Active now', icon: Monitor },
    { device: 'Safari on iPhone 15', location: 'Delhi, IN', time: '2 hours ago', icon: Smartphone },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* --- Section 1: Change Password --- */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Change Password</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update your password for enhanced security. Choose a strong, unique password.</p>
        <form onSubmit={handlePasswordChange} className="mt-6 max-w-lg space-y-4">
          <PasswordInput id="currentPassword" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <PasswordInput id="newPassword" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <PasswordInput id="confirmPassword" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Update Password
            </button>
          </div>
        </form>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      {/* --- Section 2: Two-Factor Authentication --- */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account by requiring a second verification step.</p>
        <div className="mt-6 p-4 flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <ShieldCheck className={`w-8 h-8 ${isTwoFactorEnabled ? 'text-green-500' : 'text-gray-400'}`} />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">2FA Status</p>
              <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${isTwoFactorEnabled ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                {isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
          <button onClick={() => setIsTwoFactorEnabled(!isTwoFactorEnabled)} className={`px-4 py-2 text-sm font-semibold rounded-md shadow-sm ${isTwoFactorEnabled ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            {isTwoFactorEnabled ? 'Disable' : 'Enable 2FA'}
          </button>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700"></div>
      
      {/* --- Section 3: Login Activity --- */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Login Activity</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sessions are logged here. Don't recognize an activity? Log out and change your password.</p>
        <div className="mt-6 space-y-3">
          {activeSessions.map((session, index) => (
            <SessionItem key={index} {...session} />
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
            <LogOut size={16} />
            Log out from all other devices
          </button>
        </div>
      </section>
    </div>
  );
};

export default SecurityPage;