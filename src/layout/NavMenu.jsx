import {Link, useLocation} from "wouter";
import { classNames } from "../utils/tailwindUtils.js";
import Logo from '../components/Logo';
import * as styles from "./Layout.tailwind.js";
import {useUserContext} from "../context/UserContext.jsx";
import routeConfigs from "../app/routeConfigs.js";

const NavMenu = ({
  logout,
  user,
  setSidebarOpen,
}) => {
  const [location] = useLocation();
  const { permissions } = useUserContext();

  const navItems = routeConfigs.filter((config) => (
    config.sidePanel
    && (config.permission === true || permissions.state.includes(config.permission))
  ));

  return (
    <div className={styles.sidebarContainer_tw}>
      <Link href="/" onClick={() => setSidebarOpen(false)}>
        <div className={styles.logo_tw}>
          <Logo inverted={true} size="sm" />
          <h1 className={styles.logoName_tw}>Transcriber</h1>
        </div>
      </Link>
      <nav className={styles.navContainer_tw}>
        <ul role="list">
          {navItems.map((item) => (
            <li key={item.name} onClick={() => setSidebarOpen(false)} >
              <Link
                href={item.path}
                className={classNames(
                  location == item.path
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                  styles.navItem_tw
                )}
              >
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.profileAndSignOutContainer_tw}>
        <img
          className={styles.avatar_tw}
          src={user.picture}
          alt="User Avatar"
        />
        <div className={styles.logoutContainer_tw}>
          <span className="sr-only">Your profile</span>
          <span aria-hidden="true">{user.name}</span>
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
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
