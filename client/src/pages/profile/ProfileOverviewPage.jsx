import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AlertTriangle, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

// --- Reusable Sub-Component for each detail item ---
const DetailItem = ({ icon: Icon, label, value, isMissing }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </dt>
    <dd className={`mt-1 text-sm font-semibold ${isMissing ? 'text-gray-400 dark:text-gray-500 italic' : 'text-gray-900 dark:text-white'}`}>
      {value || 'Not Provided'}
    </dd>
  </div>
);

// --- Main Page Component ---
const ProfileOverviewPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Example logic for the indicator
  const isProfileIncomplete = !userInfo?.address?.city || !userInfo?.phoneNumber;

  // Format the join date for display
  const joinDate = userInfo?.createdAt 
    ? new Date(userInfo.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* --- Page Header --- */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Profile Overview</h2>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Your personal dashboard and account details.</p>
      </div>

      {/* --- "Complete Your Profile" Indicator --- */}
      {isProfileIncomplete && (
        <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500 flex items-start gap-3 rounded-r-lg shadow">
          <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
          <div>
            <p className="font-bold text-yellow-900 dark:text-yellow-200">Complete Your Profile</p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Adding your address and phone number helps us serve you better. 
              <Link to="edit" className="font-semibold underline ml-2 hover:text-yellow-800 dark:hover:text-yellow-100">Update Now</Link>
            </p>
          </div>
        </div>
      )}

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Primary User Card */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
            <img 
              className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-gray-200 dark:border-gray-700 shadow-lg" 
              src={userInfo?.profilePhoto || `https://api.dicebear.com/8.x/initials/svg?seed=${userInfo?.name}`} 
              alt="User avatar"
            />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{userInfo?.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{userInfo?.email}</p>
            <div className="mt-4">
              <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full uppercase">
                {userInfo?.role || 'User'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Information Cards */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Information Card */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">Contact Information</h4>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DetailItem icon={Mail} label="Email Address" value={userInfo?.email} />
              <DetailItem icon={Phone} label="Phone Number" value={userInfo?.phoneNumber} isMissing={!userInfo?.phoneNumber} />
              <DetailItem icon={Calendar} label="Member Since" value={joinDate} />
            </dl>
          </div>

          {/* Shipping Address Card */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">Shipping Address</h4>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DetailItem icon={MapPin} label="Street" value={userInfo?.address?.street} isMissing={!userInfo?.address?.street} />
              <DetailItem icon={MapPin} label="City" value={userInfo?.address?.city} isMissing={!userInfo?.address?.city} />
              <DetailItem icon={MapPin} label="State / Province" value={userInfo?.address?.state} isMissing={!userInfo?.address?.state} />
              <DetailItem icon={MapPin} label="Postal Code" value={userInfo?.address?.postalCode} isMissing={!userInfo?.address?.postalCode} />
            </dl>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileOverviewPage;