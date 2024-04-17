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
});

export function UploadTranscriptContextProvider({ children }) {
	const [uploadResponse, setUploadResponse] = useState(null);
	const [generationResponse, setGenerationResponse] = useState(null);
	const [ticketsResponse, setTicketsResponse] = useState(null);
	const [fileContent, setFileContent] = useState(null);
	const [workspaceOrProjectIds, setWorkspaceOrProjectIds] = useState([]);

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
		}}>
			{children}
		</UploadTranscriptContext.Provider>
	)
}