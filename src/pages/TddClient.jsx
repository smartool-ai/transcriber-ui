import React, { useState } from 'react';
import { classNames } from "../../../utils/tailwindUtils.js";
import SettingsLayout from "../SettingsLayout.jsx";
// import ButtonSpinner from "../../../components/ButtonSpinner.jsx";
import useRequest from "../../../hooks/useRequest.js";

const OpenAIChat = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const apiRequest = useRequest();

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await apiRequest('/openai-completions', {
                body: { prompt: input },
                method: 'post'
            });
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            setResponse('Failed to get response from the API.');
        }
    };

    return (
        <SettingsLayout>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-3">
                    <label htmlFor="prompt" className="label">
                        Prompt
                    </label>
                    <textarea
                        className="input"
                        onChange={handleInputChange}
                        value={input}
                        id="prompt"
                    />
                </div>
                <div className="my-4">
                    <button
                        className={classNames("btn")}
                        type="submit"
                    >
                        Generate Response
                    </button>
                </div>
                <div className="my-4">
                    <label htmlFor="response" className="label">
                        Response
                    </label>
                    <textarea
                        className="input"
                        value={response}
                        id="response"
                        readOnly
                    />
                </div>
            </form>
        </SettingsLayout>
    );
};

export default OpenAIChat;
