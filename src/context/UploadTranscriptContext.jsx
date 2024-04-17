import { createContext, useState } from "react"

export const UploadTranscriptContext = createContext({
	ticketsResponse: {},
	setTicketsResponse: null,
	uploadResponse: {},
	setUploadResponse: null,
	fileContent: {},
	setFileContent: null,
	workspaceOrProjectIds: [],
	setWorkspaceOrProjectIds: null,
	previousUploads: {},
	setPreviousUploads: null
});

export function UploadTranscriptContextProvider({ children }) {
	const [uploadResponse, setUploadResponse] = useState(null);
	const [generationResponse, setGenerationResponse] = useState(null);
	const [ticketsResponse, setTicketsResponse] = useState(null);
	const [fileContent, setFileContent] = useState(null);
	const [workspaceOrProjectIds, setWorkspaceOrProjectIds] = useState([]);
	const [previousUploads, setPreviousUploads] = useState(null);

	return (
		<UploadTranscriptContext.Provider value={{
			generationResponse,
			setGenerationResponse,
			ticketsResponse,
			setTicketsResponse,
			uploadResponse,
			setUploadResponse,
			fileContent,
			setFileContent,
			workspaceOrProjectIds,
			setWorkspaceOrProjectIds,
			previousUploads,
			setPreviousUploads
		}}>
			{children}
		</UploadTranscriptContext.Provider>
	)
}