import { useState } from 'react';
import SettingsNav from './components/SettingsNav';
import MyDetails from './components/MyDetails';
import ProfilePage from './components/ProfilePage';
import ChangePassword from './components/ChangePassword';
import NotificationPage from './components/NotificationPage';

const SettingsPage = () => {
  // State to manage the active page
  const [activePage, setActivePage] = useState('myDetails');

  return (
    <div className="p-6 min-h-screen">
      <div className='border-b border-gray-400 mb-12 pb-4'>
        <div className='font-bold text-xl'>Settings</div>
      </div>

      {/* Pass the setActivePage function to SettingsNav */}
      <SettingsNav setActivePage={setActivePage} activePage={activePage} />

      <div className="w-full border border-dashed my-6"></div>

      {/* Render the appropriate component based on the active page */}
      {activePage === 'myDetails' && <MyDetails />}
      {activePage === 'profile' && <ProfilePage />}
      {activePage === 'changePassword' && <ChangePassword />}
      {activePage === 'notifications' && <NotificationPage />}
    </div>
  );
};

export default SettingsPage;
