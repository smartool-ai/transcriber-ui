import React, { useState } from 'react';
import useRequest from '../../../hooks/useRequest';
import SettingsLayout from "../SettingsLayout.jsx";

const LinkPlatforms = () => {
  const [platform, setPlatform] = useState('');
  const [email, setEmail] = useState(null);
  const [server, setServer] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [personalAccessToken, setPat] = useState(null);
  const [workspaceId, setWorkspaceId] = useState(null);
  const apiRequest = useRequest();

  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleServerChange = (value) => {
    setServer(value);
  };

  const handleApiKeyChange = (value) => {
    setApiKey(value);
  };

  const handleProjectIdChange = (value) => {
    setProjectId(value);
  };

  const handlePatChange = (value) => {
    setPat(value);
  };

  const handleWorkspaceIdChange = (value) => {
    setWorkspaceId(value);
  };

  const save = async (email, server, apiKey, personalAccessToken, projectId, workspaceId) => {
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

  const renderFormFields = (email, server, apiKey, personalAccessToken, projectId, workspaceId) => {
    if (platform === 'Jira') {
      return (
        <div className="flex flex-col gap-y-3">
          <label htmlFor="email" className="label">
            Jira Email
          </label>
          <input
            id="email"
            type="email"
            value={email} onChange={e => handleEmailChange(e.target.value)}
            className="input"
            placeholder="you@example.com"
          />
          <label htmlFor="server" className="label">
            Jira Server Adress
          </label>
          <input
            id="server"
            type="server"
            value={server} onChange={e => handleServerChange(e.target.value)}
            className="input"
            placeholder="https://yourcompany.atlassian.net"
          />
          <label htmlFor="apiKey" className="label">
            Jira API Key
          </label>
          <input
            id="apiKey"
            type="apiKey"
            value={apiKey} onChange={e => handleApiKeyChange(e.target.value)}
            className="input"
            placeholder="your-api-key"
          />
        </div>
      );
    } else if (platform === 'Asana') {
      return (
        <div className="flex flex-col gap-y-3">
          <label htmlFor="personalAccessToken" className="label">
            Asana Personal Access Token
          </label>
          <input
            id="personalAccessToken"
            type="personalAccessToken"
            value={personalAccessToken} onChange={e => handlePatChange(e.target.value)}
            className="input"
            placeholder="your-personal-access-token"
          />
          <label htmlFor="workspaceId" className="label">
            Asana Workspace Id
          </label>
          <input
            id="workspaceId"
            type="workspaceId"
            value={workspaceId} onChange={e => handleWorkspaceIdChange(e.target.value)}
            className="input"
            placeholder="your-workspace-id"
          />
          <label htmlFor="projectId" className="input">
            Asana Project ID
          </label>
          <input
            id="projectId"
            type="projectId"
            value={projectId} onChange={e => handleProjectIdChange(e.target.value)}
            className="input"
            placeholder="your-project-id"
          />
        </div>
      );
    } else if (platform === 'Shortcut') {
      return (
        <div className="flex flex-col gap-y-3">
          <label htmlFor="apiKey" className="label">
            Shortcut API Key
          </label>
          <input
            id="apiKey"
            type="apiKey"
            value={apiKey} onChange={e => handleApiKeyChange(e.target.value)}
            className="input"
            placeholder="your-api-key"
          />
          <label htmlFor="projectId" className="label">
            Shortcut Project ID
          </label>
          <input
            id="projectId"
            type="projectId"
            value={projectId} onChange={e => handleProjectIdChange(e.target.value)}
            className="input"
            placeholder="your-project-id"
          />
        </div>
      );
    } else {
      return null;
    }
  };

  const saveButton = (email, server, apiKey, personalAccessToken, projectId, workspaceId) => {
    return (
      <div>
        <button
          id="saveButton"
          type="button"
          onClick={() => save(email, server, apiKey, personalAccessToken, projectId, workspaceId)}
          className="btn"
        >
          Save
        </button>
      </div>
    )
  };

  return (
    <SettingsLayout>
      <div>
        <h1>
          <label htmlFor="apiKey" className="block text-sm font-medium leading-6 text-white">
            Add Platform Keys
          </label>
        </h1>

        <label htmlFor="platform" className="block text-sm font-medium leading-6 text-white">Select
          Platform:</label>
        <select id="platform" name="platform" value={platform} onChange={handlePlatformChange}>
          <option value="">Select</option>
          <option value="Jira">Jira</option>
          <option value="Asana">Asana</option>
          <option value="Shortcut">Shortcut</option>
        </select>

        {renderFormFields(email, server, apiKey, personalAccessToken, projectId, workspaceId)}

        {saveButton(email, server, apiKey, personalAccessToken, projectId, workspaceId)}
      </div>
    </SettingsLayout>
  );
};

export default LinkPlatforms;
