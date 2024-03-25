import { createContext, useState } from "react"

export const UploadTranscriptContext = createContext({
	ticketsResponse: {},
	setTicketsResponse: null,
	uploadResponse: {},
	setUploadResponse: null,
	fileContent: {},
	setFileContent: null,
});

export function UploadTranscriptContextProvider({ children }) {
	const [uploadResponse, setUploadResponse] = useState(null);
	const [generationResponse, setGenerationResponse] = useState(null);
	const [ticketsResponse, setTicketsResponse] = useState(null);
	const [fileContent, setFileContent] = useState(null);

	return (
		<UploadTranscriptContext.Provider value={{
			generationResponse,
			setGenerationResponse,
			ticketsResponse,
			setTicketsResponse,
			uploadResponse,
			setUploadResponse,
			fileContent,
			setFileContent
		}}>
			{children}
		</UploadTranscriptContext.Provider>
	)
}