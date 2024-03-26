import React, {useEffect, useState} from 'react';
import {useUserContext} from "../../context/UserContext.jsx";
import {classNames} from "../../utils/tailwindUtils.js";
// import Payment from "../components/Payment";
// import { Elements } from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe(__REACT_APP_STRIPE_PUBLIC_KEY__);
// const stripeOptions = {
//     clientSecret: __REACT_APP_STRIPE_CLIENT_SECRET__,
// }

const UserSettings = () => {
    const { fullName } = useUserContext();
    const [name, setName] = useState('');

    useEffect(() => {
        if (name !== fullName.state) {
            setName(fullName.state)
        }
    }, [fullName.state]);

    const submitButtonDisabled = name === fullName.state;

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to update user settings
    };

    return (
        <div className="flex flex-col space-y-20">
            <h1 className="h1">User Settings</h1>
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
                <a className="link">Reset Email</a>
                <a className="link">Reset Password</a>
            </div>
        </div>
    );
};

export default UserSettings;
