import React from 'react';
import SubMenu from "../../components/SubMenu.jsx";

const SettingsLayout = ({ children }) => {
  const subMenuRoutes = [
    { path: '/settings/link-platforms', label: 'Link Platforms' },
    { path: '/settings/user-settings', label: 'User Settings' },
  ];

  return (
    <div className="flex flex-col space-y-20">
      <SubMenu routes={subMenuRoutes} />
      {children}
    </div>
  );
};

export default SettingsLayout;
