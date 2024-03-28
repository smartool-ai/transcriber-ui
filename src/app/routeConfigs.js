import {FolderIcon, UserMinusIcon} from "@heroicons/react/24/outline/index.js";

const routeConfigs = [
  {
    name: 'Upload Transcript',
    icon: FolderIcon,
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
    name: 'User Settings',
    settingsNavigation: true,
    sidePanel: false,
    path: '/settings/user-settings',
    permission: true,
  },
  {
    name: 'Link Platforms',
    settingsNavigation: true,
    sidePanel: false,
    path: '/settings/link-platforms',
    permission: 'manage:platforms',
  },
];

export default routeConfigs;
