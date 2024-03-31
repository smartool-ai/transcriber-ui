import React, { useState } from 'react';
import useRequest from '../../../hooks/useRequest';
import SettingsLayout from "../SettingsLayout.jsx";
import {classNames} from "../../../utils/tailwindUtils.js";
import LinkPlatformsFields from "./LinkPlatformsFields.jsx";

const LinkPlatforms = () => {
  const [platform, setPlatform] = useState(null);
  const [email, setEmail] = useState(null);
  const [server, setServer] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [personalAccessToken, setPat] = useState(null);
  const [workspaceId, setWorkspaceId] = useState(null);
  const apiRequest = useRequest();

  const requiredFields = {
    'Jira': email && server && apiKey,
    'Asana': personalAccessToken && projectId && workspaceId,
    'Shortcut': apiKey && projectId,
  };

  const saveButtonEnabled = platform && requiredFields[platform];

  const save = async () => {
    const reqBody = {
      "email": email,
      "server": server,
      "api_key": apiKey,
      "personal_access_token": personalAccessToken,
      "project_id": projectId,
      "workspace_id": workspaceId
    }
    console.log('Platform:', platform);
    const saveResponse = await apiRequest(`/user-metadata/link?platform=${platform.toUpperCase()}`, {
      method: "put",
      body: reqBody,
    });

    if (saveResponse.status === 200) {
      console.log('Platform keys saved');
      document.getElementById('saveButton').disabled = true;
      document.getElementById('saveButton').innerHTML = 'Saved';
    } else {
      alert('Error saving platform keys')
      console.log('Error saving platform keys');
    }
  };

  return (
    <SettingsLayout>
      <div className="flex flex-col gap-y-3">
        <label htmlFor="platform" className="label">Select
          Platform:</label>
        <select id="platform" name="platform" className="input" value={platform}
                onChange={(e) => setPlatform(e.target.value)}>
          <option value="">Select</option>
          <option value="Jira">Jira</option>
          <option value="Asana">Asana</option>
          <option value="Shortcut">Shortcut</option>
        </select>
        <LinkPlatformsFields
          apiKey={apiKey}
          email={email}
          personalAccessToken={personalAccessToken}
          platform={platform}
          projectId={projectId}
          server={server}
          setApiKey={setApiKey}
          setEmail={setEmail}
          setPat={setPat}
          setProjectId={setProjectId}
          setServer={setServer}
          setWorkspaceId={setWorkspaceId}
          workspaceId={workspaceId}
        />
        <div className="my-4">
          <button
            disabled={!saveButtonEnabled}
            id="saveButton"
            type="button"
            onClick={save}
            className={classNames(
              saveButtonEnabled ? '' : 'btn-disabled',
              "btn"
            )}
          >
            Save
          </button>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default LinkPlatforms;
