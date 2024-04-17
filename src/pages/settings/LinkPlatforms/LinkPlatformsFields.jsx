import React from 'react';

const LinkPlatformsFields = ({
  apiKey,
  email,
  personalAccessToken,
  platform,
  projectId,
  server,
  setApiKey,
  setEmail,
  setPat,
  setProjectId,
  setServer,
  setWorkspaceId,
  workspaceId,
  shortcutWorkspaces,
}) => {
  if (platform === 'Jira') {
    return (
      <div className="flex flex-col gap-y-3">
        <label htmlFor="email" className="label">
          Jira Email
        </label>
        <input
          id="email"
          type="email"
          value={email} onChange={e => setEmail(e.target.value)}
          className="input"
          placeholder="you@example.com"
        />
        <label htmlFor="server" className="label">
          Jira Server Adress
        </label>
        <input
          id="server"
          type="server"
          value={server} onChange={e => setServer(e.target.value)}
          className="input"
          placeholder="https://yourcompany.atlassian.net"
        />
        <label htmlFor="apiKey" className="label">
          Jira API Key
        </label>
        <input
          id="apiKey"
          type="apiKey"
          value={apiKey} onChange={e => setApiKey(e.target.value)}
          className="input"
          placeholder="your-api-key"
        />
      </div>
    );
  }

  if (platform === 'Asana') {
    return (
      <div className="flex flex-col gap-y-3">
        <label htmlFor="personalAccessToken" className="label">
          Asana Personal Access Token
        </label>
        <input
          id="personalAccessToken"
          type="personalAccessToken"
          value={personalAccessToken} onChange={e => setPat(e.target.value)}
          className="input"
          placeholder="your-personal-access-token"
        />
        <label htmlFor="workspaceId" className="label">
          Asana Workspace Id
        </label>
        <input
          id="workspaceId"
          type="workspaceId"
          value={workspaceId} onChange={e => setWorkspaceId(e.target.value)}
          className="input"
          placeholder="your-workspace-id"
        />
        <label htmlFor="projectId" className="label">
          Asana Project ID
        </label>
        <input
          id="projectId"
          type="projectId"
          value={projectId} onChange={e => setProjectId(e.target.value)}
          className="input"
          placeholder="your-project-id"
        />
      </div>
    );
  }

  if (platform === 'Shortcut') {
    return (
      <div className="flex flex-col gap-y-3">
        <label htmlFor="apiKey" className="label">
          Shortcut API Key
        </label>
        <input
          id="apiKey"
          type="apiKey"
          value={apiKey} onChange={e => setApiKey(e.target.value)}
          className="input"
          placeholder="your-api-key"
        />
        {shortcutWorkspaces.length > 0 && (
          <div className="my-4">
            <label htmlFor="workspace" className="label">Select Workspace:</label>
            <select id="workspace" name="workspace" className="input" value={workspaceId} onChange={(e) => setWorkspaceId(e.target.value)}>
              <option value="">Select</option>
              {shortcutWorkspaces.map(workspace => (
                <option key={workspace.id} value={workspace.id}>{workspace.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default LinkPlatformsFields;
