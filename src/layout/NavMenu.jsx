import {CogIcon} from "@heroicons/react/24/outline/index.js";
import {Link, useLocation} from "wouter";
import { classNames } from "../utils/tailwindUtils.js";
import Logo from '../components/Logo';
import * as styles from "./Layout.tailwind.js";
import {useUserContext} from "../context/UserContext.jsx";
import routeConfigs from "../app/routeConfigs.js";
import {useAuth0} from "@auth0/auth0-react";

const NavMenu = ({ setSidebarOpen }) => {
  const { logout } = useAuth0();
  const [location] = useLocation();
  const { permissions, user } = useUserContext();

  const navItems = routeConfigs.filter((config) => (
    config.sidePanel
    && (config.permission === true || permissions.state.includes(config.permission))
  ));

  const settingsPath = permissions.state.includes('manage:platforms')
    ? '/settings/link-platforms'
    : '/settings/user-settings';

  return (
    <div className={styles.sidebarContainer_tw}>
      <Link href="/" onClick={() => setSidebarOpen(false)}>
        <div className={styles.logo_tw}>
          <Logo size="sm" />
          <h1 className={styles.logoName_tw}>Transcriber</h1>
        </div>
      </Link>
      <nav className={styles.navContainer_tw}>
        <ul role="list">
          {navItems.map((item) => (
            <li key={item.name} onClick={() => setSidebarOpen(false)}>
              <Link
                href={item.path}
                className={classNames(
                  location === item.path
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                  styles.navItem_tw
                )}
              >
                {item.path === "/upload-transcript" ? <Logo type="transcriber" size="xs" /> : <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>}
                {item.name}
              </Link>
            </li>
          ))}
          <li onClick={() => setSidebarOpen(false)}>
            <Link
              href={settingsPath}
              className={classNames(
                location.includes('/settings')
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800',
                styles.navItem_tw
              )}
            >
              <CogIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.profileAndSignOutContainer_tw}>
        <img
          className={styles.avatar_tw}
          src={user.state.picture}
          alt="User Avatar"
        />
        <div className={styles.logoutContainer_tw}>
          <span className="sr-only">Your profile</span>
          <span aria-hidden="true">{user.state.name}</span>
          <button
            onClick={() => logout({returnTo: window.location.origin})}
            className={styles.logoutButton_tw}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
