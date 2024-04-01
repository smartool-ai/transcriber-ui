import React, {useEffect, useState} from 'react';
import {useUserContext} from "../../../context/UserContext.jsx";
import {classNames} from "../../../utils/tailwindUtils.js";
import SettingsLayout from "../SettingsLayout.jsx";
import ButtonSpinner from "../../../components/ButtonSpinner.jsx";
import useRequest from "../../../hooks/useRequest.js";
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
    const [passwordResetState, setPasswordResetState] = useState('none');
    const apiRequest = useRequest();

    useEffect(() => {
        if (name !== user.name) {
            setName(user.name)
        }
    }, [user]);

    const submitButtonDisabled = name === user.name;

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to update user settings
    };

    const handleResetPassword = async () => {
        setPasswordResetState('fetching');
        const res = await apiRequest('/user/password-reset', { method: 'post' });
        const data = res.json();
        console.log('data', data)
        setTimeout(() => {
            setPasswordResetState('reset-complete');
        }, 2000);
    };

    return (
      <SettingsLayout>
          <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-3">
                  <label htmlFor="name" className="label">
                      Name
                  </label>
                  <input
                    className="input"
                    onChange={handleNameChange}
                    type="text"
                    value={name}
                    id="name"
                  />
                  <div>
                      {passwordResetState === 'none' && (
                        <button
                          className="my-4 link"
                          onClick={handleResetPassword}
                        >
                            Reset Password
                        </button>
                      )}
                      {passwordResetState === 'fetching' && (
                        <button
                          className="my-4 link"
                          disabled
                        >
                            <ButtonSpinner/>
                        </button>
                      )}
                      {passwordResetState === 'reset-complete' && (
                        <label htmlFor="name" className="my-4 label">
                            An email has been sent to your email address with instructions to reset your password.
                        </label>
                      )}
                  </div>
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
      </SettingsLayout>
    );
};

export default UserSettings;
