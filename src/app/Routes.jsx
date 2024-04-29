import {Route} from "wouter";
import UploadTranscript from '../pages/UploadTranscript';
import DeleteUser from '../pages/DeleteUser';
import HomePage from '../pages/HomePage';
import LinkPlatforms from "../pages/settings/LinkPlatforms/LinkPlatforms.jsx";
import UserSettings from '../pages/settings/UserSettings/UserSettings.jsx';
import OpenAIChat from '../pages/TddClient.jsx';

const Routes = () => (
  <>
    <Route path="/" component={HomePage} />
    <Route path="/upload-transcript" component={UploadTranscript} />
    <Route path="/delete-user" component={DeleteUser} />
    <Route path="/tdd" component={OpenAIChat} />
    <Route path="/settings/link-platforms" component={LinkPlatforms} />
    <Route path="/settings/user-settings" component={UserSettings} />
  </>
);

export default Routes;
