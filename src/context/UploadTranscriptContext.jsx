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
	allUploads: {},
	setAllUploads: null
});

export function UploadTranscriptContextProvider({ children }) {
	const [uploadResponse, setUploadResponse] = useState(null);
	const [generationResponse, setGenerationResponse] = useState(null);
	const [ticketsResponse, setTicketsResponse] = useState(null);
	const [fileContent, setFileContent] = useState(null);
	const [workspaceOrProjectIds, setWorkspaceOrProjectIds] = useState([]);
	const [allUploads, setAllUploads] = useState(null);

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
			allUploads,
			setAllUploads
		}}>
			{children}
		</UploadTranscriptContext.Provider>
	)
}