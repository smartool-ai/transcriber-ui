import React from 'react';
import SubMenu from "../../components/SubMenu.jsx";
import routeConfigs from "../../app/routeConfigs.js";
import {useUserContext} from "../../context/UserContext.jsx";

const SettingsLayout = ({ children }) => {
  const { user } = useUserContext();

  const subMenuRoutes = routeConfigs.filter((config) =>
    config.settingsNavigation
    && (config.permission === true || user.permissions.includes(config.permission))
  );

  return (
    <div className="flex flex-col space-y-10">
      <SubMenu routes={subMenuRoutes} />
      {children}
    </div>
  );
};

export default SettingsLayout;
