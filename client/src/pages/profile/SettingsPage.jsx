import React, { useState } from 'react';
import { Bell, User, CreditCard, ChevronRight } from 'lucide-react';

// --- Reusable UI Component for a Toggle Switch ---
const ToggleSwitch = ({ label, description, enabled, setEnabled }) => (
  <div
    onClick={() => setEnabled(!enabled)}
    className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
  >
    <div>
      <p className="font-medium text-gray-900 dark:text-white">{label}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    <div
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
        enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </div>
  </div>
);

// --- Individual Setting Panels ---
const NotificationsPanel = () => {
  const [emailDeals, setEmailDeals] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Notifications</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage how you receive communications from us.</p>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <ToggleSwitch label="New Deals & Offers" description="Receive emails about promotions and new products." enabled={emailDeals} setEnabled={setEmailDeals} />
        <ToggleSwitch label="Order Updates" description="Receive email notifications about your order status." enabled={emailUpdates} setEnabled={setEmailUpdates} />
        <ToggleSwitch label="SMS Updates" description="Receive text messages about your delivery." enabled={smsUpdates} setEnabled={setSmsUpdates} />
      </div>
    </div>
  );
};

const AccountPanel = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Account Management</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage your account data and settings.</p>
      <div className="space-y-4">
        <button className="w-full flex justify-between items-center text-left p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Export My Data</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Download a copy of your personal data.</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </button>
        <button className="w-full flex justify-between items-center text-left p-4 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
          <div>
            <p className="font-medium text-red-700 dark:text-red-300">Deactivate Account</p>
            <p className="text-sm text-red-600 dark:text-red-400">Permanently delete your account and data.</p>
          </div>
          <ChevronRight className="text-red-400" />
        </button>
      </div>
    </div>
  );
};

const PaymentsPanel = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Payment Methods</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage your saved payment options.</p>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-4">
            <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c49b6b75957a07c7293c36.svg" alt="Visa card" className="w-10"/>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Visa ending in 1234</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2028</p>
            </div>
          </div>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">Remove</button>
        </div>
        <button className="w-full text-center py-2.5 px-4 rounded-md bg-gray-100 dark:bg-gray-700/50 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          + Add New Payment Method
        </button>
      </div>
    </div>
  );
};


// --- The Main Settings Page Component ---
const SettingsPage = () => {
  // Local state to manage which nested tab is active.
  const [activeSetting, setActiveSetting] = useState('notifications');
  
  const settingsNav = [
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'account', name: 'Account', icon: User },
    { id: 'payments', name: 'Payments', icon: CreditCard },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">General Settings</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation Menu */}
        <nav className="flex-shrink-0 md:w-1/4">
          <div className="space-y-2">
            {settingsNav.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSetting(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors ${
                  activeSetting === item.id 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </nav>
        
        {/* Conditionally Rendered Content Panel */}
        <div className="flex-grow md:border-l md:pl-8 border-gray-200 dark:border-gray-700">
          {activeSetting === 'notifications' && <NotificationsPanel />}
          {activeSetting === 'account' && <AccountPanel />}
          {activeSetting === 'payments' && <PaymentsPanel />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;