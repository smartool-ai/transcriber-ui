import {UserMinusIcon} from "@heroicons/react/24/outline/index.js";

const routeConfigs = [
  {
    name: 'Transcriber',
    icon: true, // <Logo /> is rendered instead
    settingsNavigation: false,
    sidePanel: true,
    path: '/upload-transcript',
    permission: 'manage:upload_transcripts',
  },
  {
    name: 'Delete User',
    icon: UserMinusIcon,
    settingsNavigation: false,
    sidePanel: true,
    path: '/delete-user',
    permission: 'manage:users',
  },
  {
    name: 'Link Platforms',
    settingsNavigation: true,
    sidePanel: false,
    path: '/settings/link-platforms',
    permission: 'manage:platforms',
  },
  {
    name: 'User Settings',
    settingsNavigation: true,
    sidePanel: false,
    path: '/settings/user-settings',
    permission: true,
  },
];

export default routeConfigs;
