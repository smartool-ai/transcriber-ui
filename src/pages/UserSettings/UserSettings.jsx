import React, { useState } from 'react';
import {useUserContext} from "../../context/UserContext.jsx";
// import Payment from "../components/Payment";
// import { Elements } from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe(__REACT_APP_STRIPE_PUBLIC_KEY__);
// const stripeOptions = {
//     clientSecret: __REACT_APP_STRIPE_CLIENT_SECRET__,
// }

const UserSettings = () => {
    const { fullName } = useUserContext();
    const [name, setName] = useState(fullName);
    const [email, setEmail] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic here to update user settings
    };

    return (
        <div>
            <h1 className="h1 mb-6">User Settings</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex space-x-4 items-center">
                    <label className="label">Name:</label>
                    <input
                      className="input"
                      onChange={handleNameChange}
                      type="text"
                      value={name}
                    />
                </div>
                <br/>
                <button className="btn" type="submit">Save</button>
            </form>
        </div>
    );
};

export default UserSettings;
