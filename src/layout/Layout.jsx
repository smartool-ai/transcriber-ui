import { useAuth0 } from '@auth0/auth0-react';
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  UserMinusIcon,
  XMarkIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';
import { Link } from "wouter";
import { classNames } from "../utils/tailwindUtils.js";
import Logo from '../components/Logo';
import * as styles from "./Layout.tailwind.js";
import {useUserContext} from "../context/UserContext.jsx";
import routeConfigs from "../app/routeConfigs.js";
import NavMenu from "./NavMenu.jsx";

const navigation = [
  { name: 'Upload Transcript', href: '/upload-transcript', icon: FolderIcon, permission: 'manage:upload_transcripts' },
  { name: 'Delete User', href: '/delete-user', icon: UserMinusIcon, permission: 'manage:users' },
];

export default function Layout({ current, children }) {
  const { permissions, token } = useUserContext();
  const {
    user,
    logout,
  } = useAuth0();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentNavigation = routeConfigs.find((config) => current.startsWith(config.href));

  const navItems = routeConfigs.filter((config) => (
    config.sidePanel
    && (config.permission === true || permissions.state.includes(config.permission))
  ));

  const permittedNavigation = navigation.filter((item) => {
    if (item.permission && token && token.permissions) {
      return token.permissions.includes(item.permission);
    } else {
      return true;
    };
  });

  console.log(navItems)
  console.log(permittedNavigation)

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <NavMenu
                  current={current}
                  currentNavigation={currentNavigation}
                  logout={logout}
                  token={token}
                  permittedNavigation={permittedNavigation}
                  user={user}
                  setSidebarOpen={setSidebarOpen}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className={styles.sideNav_tw}>
        <NavMenu
          current={current}
          currentNavigation={currentNavigation}
          logout={logout}
          token={token}
          permittedNavigation={permittedNavigation}
          user={user}
          setSidebarOpen={setSidebarOpen}
        />
      </div>
      <div className={styles.topNav_tw}>
        <button type="button" className={styles.hamburgerIcon_tw} onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className={styles.topNavCurrentItem_tw}>
          {currentNavigation?.icon && <currentNavigation.icon className="h-6 w-6 shrink-0" aria-hidden="true" />}
          {currentNavigation && currentNavigation.name}
        </div>
        <Menu as="div">
          <Menu.Button className="block">
            <img
              className={styles.avatar_tw}
              src={user.picture}
              alt="User Avatar"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className={styles.avatarDropdownContainer_tw}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className={classNames(
                      active ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                      styles.dropdownLogoutButton_tw
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <main className={styles.mainContainer_tw}>
        <div className={styles.mainChildren_tw}>{children}</div>
      </main>
    </>
  );
};
