import React, {useEffect, useState} from 'react';
import {useUserContext} from "../../../context/UserContext.jsx";
import {classNames} from "../../../utils/tailwindUtils.js";
import SettingsLayout from "../SettingsLayout.jsx";
// import Payment from "../components/Payment";
// import { Elements } from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe(__REACT_APP_STRIPE_PUBLIC_KEY__);
// const stripeOptions = {
//     clientSecret: __REACT_APP_STRIPE_CLIENT_SECRET__,
// }

const UserSettings = () => {
    const { user } = useUserContext();
    const [name, setName] = useState('');

    useEffect(() => {
        if (name !== user.state.name) {
            setName(user.state.name)
        }
    }, [user.state]);

    const submitButtonDisabled = name === user.state.name;

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to update user settings
    };

    return (
      <SettingsLayout>
          <div className="flex flex-col gap-y-3">
              <label htmlFor="email" className="label">
                  Jira Email
              </label>
              <input
                id="email"
                type="email"
                // value={email} onChange={e => handleEmailChange(e.target.value)}
                className="input"
                placeholder="you@example.com"
              />
              <label htmlFor="server" className="label">
                  Jira Server Adress
              </label>
              <input
                id="server"
                type="server"
                // value={server} onChange={e => handleServerChange(e.target.value)}
                className="input"
                placeholder="https://yourcompany.atlassian.net"
              />
              <label htmlFor="apiKey" className="label">
                  Jira API Key
              </label>
              <input
                id="apiKey"
                type="apiKey"
                // value={apiKey} onChange={e => handleApiKeyChange(e.target.value)}
                className="input"
                placeholder="your-api-key"
              />
          </div>
          <div className="flex flex-col space-y-8">
              <form className="flex flex-col space-y-10" onSubmit={handleSubmit}>
                  <div className="flex space-x-4 items-center">
                      <label className="label">Name:</label>
                      <input
                        className="input"
                        onChange={handleNameChange}
                        type="text"
                        value={name}
                      />
                  </div>
                  <div>
                      <button
                        className={classNames(
                          submitButtonDisabled ? 'btn-disabled' : '',
                          "btn"
                        )}
                        disabled={submitButtonDisabled}
                        type="submit"
                      >
                          Save
                      </button>
                  </div>
              </form>
              <div className="flex flex-col space-y-4">
                  <a className="link">Reset Password</a>
              </div>
          </div>
      </SettingsLayout>
    );
};

export default UserSettings;
