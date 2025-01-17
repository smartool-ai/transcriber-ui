import { useState, useContext, useEffect } from 'react';
import useRequest from '../hooks/useRequest';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';
import TicketTable from '../components/tables/TicketsTable';
import UploadedFilesTable from '../components/tables/UploadedFilesTable';
import { UploadTranscriptContext } from '../context/UploadTranscriptContext';
import FileUpload from '../components/FileUpload';
import { getTimestampFromFilename } from '../utils/getTimestamp';


export default function UploadTranscript() {
	const [isUploading, setIsUploading] = useState(false);
	const [isExpanding, setIsExpanding] = useState(false);
	const [isPolling, setIsPolling] = useState(false);
	const [toast, setToast] = useState({
		showToast: true,
		label: "Please note that currently only .txt files are supported.", // Ren TODO: Update this '.txt' with files we accept on upload
		type: "info"
	});
	const {
		generationResponse,
		setGenerationResponse,
		ticketsResponse,
		setTicketsResponse,
		uploadResponse,
		setUploadResponse,
		fileContent,
		setFileContent,
		allUploads,
		setAllUploads
	} = useContext(UploadTranscriptContext);
	const apiRequest = useRequest();

	useEffect(() => { getPreviousUploads() }, [])

	if (isUploading) {
		return <Spinner />;
	}

	const getFileContent = async (fileName) => {
		const res = await apiRequest(`/file/${fileName}/content`, {
			method: "get",
		}
		);

		if (res.status === 200) {
			const fileContent = await res.json();
			setFileContent({ fileName: fileName, fileContent: fileContent.content});
		} else {
			setToast({
				type: "error",
				label: "An error occurred while fetching the file content.",
				showToast: true,
			});
		}
	};

	const uploadTranscriptFile = async (files) => {
		const fileName = files[0].name;
		const fileSize = files[0].size;
		const formData = new FormData();
		formData.append("file", files[0]); // we're only allowing one file upload for now

		if (fileSize > 1024 * 1024) {
			setToast({
				type: "error",
				label: "File size exceeds the limit of 1MB.",
				showToast: true,
			});
		} else if (fileSize < 2 * 1024) {
			setToast({
				type: "error",
				label: "File size is below the minimum limit of 2KB.",
				showToast: true,
			});
		}

		const uploadHandler = async () => {
			try {
				const apiUploadResponse = await apiRequest('/upload', {
					method: "post",
					body: formData,
				});

				if (!apiUploadResponse.ok) {
					throw new Error('Upload failed');
				}

				setIsUploading(false);
				const uploadResponseLocal = await apiUploadResponse.json();
				setUploadResponse(uploadResponseLocal);

				const previousFiles = await getPreviousUploads()
				setAllUploads({ ...previousFiles })
				setToast({
					type: "success",
					label: "Your transcript has been uploaded!",
					showToast: true,
				});
				getFileContent(uploadResponseLocal.files[0].name);
			} catch (error) {
				setIsUploading(false);
				setToast({
					type: "error",
					label: "An error occurred while uploading your file.",
					showToast: true,
				});
			}
		};

		setIsUploading(true);

		const res = await apiRequest(`/file/${fileName}`, {
			method: "get",
		});

		if (res.status === 200) {
			if (
				confirm(
					`An image with the name "${fileName}" already exists. Are you sure you want to overwrite it?`,
				)
			) {
				uploadHandler();
			} else {
				setIsUploading(false);
				setUploadResponse(null);
			}
		} else if (res.status === 404) {
			uploadHandler();
		} else {
			setIsUploading(false);
			setToast({
				type: "error",
				label: "An error occurred while uploading your file.",
				showToast: true,
			});
		}
	};

	const getPreviousUploads = async () => {
		const res = await apiRequest(`/files`, {
			method: "get",
		});

		if (res.status === 200) {
			const allUploadsLocal = await res.json();
			const files = allUploadsLocal.documents;

			// sort by datetime, recent at the bottom
			files.sort((a, b) => getTimestampFromFilename(a.name) - getTimestampFromFilename(b.name))

			setAllUploads({ ...files })
			return files
		} else {
			console.log("User has no previous uploads.")
		}
	};

	const generateTickets = async (fileName) => {
		try {
			setIsPolling(true);

			const submitResponse = await apiRequest(`/file/${fileName}/tickets?number_of_tickets=20`, {
				method: "post"
			});

			if (submitResponse && !submitResponse.ok) {
				throw new Error('Ticket generation failed');
			}

			const submitedResponseJson = await submitResponse.json();
			console.log(submitedResponseJson);

			const pollTickets = async (fileName) => {
				let response = null;
				let count = 0;

				while (!response && count < 24) {
					const res = await apiRequest(`/file/${fileName}/tickets?generation_datetime=${submitedResponseJson.ticket_generation_datetime}`, {
						method: "get",
					});

					if (res.status === 200) {
						let resJson = await res.json();
						console.log(resJson);
						if (resJson.tickets && resJson.tickets.length > 0) {
							setIsPolling(false);
							setTicketsResponse(resJson);
							setGenerationResponse(prev => ({ ...prev, ...submitedResponseJson }))
							setToast({
								type: "success",
								label: `Tickets generated successfully!`,
								showToast: true,
							});

							response = true;
						} else {
							await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before making the next request
							count++;
						}
					} else {
						await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before making the next request
						count++;
					}
				}

				if (!response) {
					setIsPolling(false);
					setToast({
						type: "error",
						label: "Ticket generation timed out.",
						showToast: true,
					});
				}
			};

			pollTickets(fileName);
		} catch (error) {
			setIsPolling(false);
			setToast({
				type: "error",
				label: error.message || "An error occurred while generating your tickets.",
				showToast: true,
			});
		}
	};

	const expandTickets = async (id, subject, body, estimationPoints) => {
		try {
			setIsExpanding(true);

			const expandBody = { "name": subject, "description": body, "estimate": estimationPoints };
			const fileName = uploadResponse.files[0].name; // HARDCODED assuming we can only upload one file at a time
			const expandResponse = await apiRequest(`/file/${fileName}/tickets/expand?generation_datetime=${generationResponse?.ticket_generation_datetime}`, {
				method: "POST",
				body: expandBody,
			});

			if (expandResponse && !expandResponse.ok) {
				throw new Error('Ticket expansion failed.');
			}

			const expandResponseJson = await expandResponse.json();

			const pollTickets = async () => {
				let response = null;
				let count = 0;

				while (!response && count < 24) {
					const getSubTicketResponse = await apiRequest(`/ticket/sub/${expandResponseJson.sub_ticket_id}`, {
						method: "GET"
					});

					if (getSubTicketResponse.status === 200) {
						const subTicketResponseJson = await getSubTicketResponse.json();

						if (subTicketResponseJson?.tickets && subTicketResponseJson?.tickets.length > 0) {
							const subTickets = await subTicketResponseJson.tickets.map((ticket) => ({ ...ticket, subTicketOf: id }))
							const consolidatedTickets = consolidateAllTickets(id, subTickets);
							setTicketsResponse({ tickets: consolidatedTickets });
							setToast({
								type: "success",
								label: `Ticket: ${subject} has been expanded.`,
								showToast: true,
							});

							setIsExpanding(false);
							response = true;
						} else {
							await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before making the next request
							count++;
						}

					} else {
						await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before making the next request
						count++;
					}
				}

				if (!response) {
					setIsExpanding(false);
					setToast({
						type: "error",
						label: "Expanding ticket timed out.",
						showToast: true,
					});
				}
			};

			pollTickets();
		} catch (error) {
			setIsExpanding(false);
			setToast({
				type: "error",
				label: await error.message || "An error occurred while expanding your ticket.",
				showToast: true,
			});
		}
	};

	const consolidateAllTickets = (id, subTickets) => {
		const mainTicketIndex = ticketsResponse.tickets.findIndex(ticket => ticket.id === id);
		const sliceFirstHalf = ticketsResponse.tickets.slice(0, mainTicketIndex);

		// Add 'expanded' field to limit ticket expansion once
		const expandedTicket = { ...ticketsResponse.tickets[mainTicketIndex], expanded: true };

		const sliceSecondHalf = ticketsResponse.tickets.slice(mainTicketIndex + 1);
		return [...sliceFirstHalf, expandedTicket, ...subTickets, ...sliceSecondHalf];
	};

	const saveTickets = async (id, subject, body, estimationPoints) => {
		const ticketParams = { "name": subject, "description": body, "estimate": estimationPoints };
		const submitResponse = await apiRequest(`/ticket?platform=${document.getElementById(id).value}`, {
			method: "post",
			body: ticketParams
		});

		if (submitResponse.status == 200) {
			document.getElementById(`button${id}`).innerHTML = "Ticket Created";
			setToast({
				type: "success",
				label: `Ticket: ${subject} is created!`,
				showToast: true,
			});
		} else {
			setToast({
				type: "error",
				label: await submitResponse.text() || "An error occurred while saving your tickets.",
				showToast: true,
			});
		}
	};

	const handleClearAll = () => {
		setTicketsResponse(null);
		setUploadResponse(null);
	};

	const clearButton = (handleOnClick, buttonLabel) => (
		<button className="w-full mt-3 cursor-pointer btn text-sm" onClick={handleOnClick}>
			{buttonLabel}
		</button>
	);

	return (
		<>
			{toast.showToast && <Toast type={toast.type} label={toast.label} onClose={() => setToast(previous => ({ ...previous, showToast: false }))} />}
			<FileUpload uploadTranscriptFile={uploadTranscriptFile} />
			{allUploads && (<UploadedFilesTable
				generateTickets={generateTickets}
				files={allUploads}
				ticketsResponse={ticketsResponse}
				isPolling={isPolling}
			/>)}
			{uploadResponse && (
				<div>
					<div className="flex gap-3">
						{!ticketsResponse && uploadResponse && clearButton(() => setUploadResponse(null), "Clear Uploaded Files")}
						{ticketsResponse && clearButton(() => setTicketsResponse(null), "Clear Generated Tickets")}
						{ticketsResponse && clearButton(handleClearAll, "Clear All")}
					</div>

					{fileContent && (
						<div>
							<h3 className="text-left text-white font-semibold py-3">File Content for {fileContent.fileName}</h3>
							<pre className=" overflow-auto rounded-md h-52 bg-gray-300 p-3">{fileContent.fileContent}</pre>
						</div>
					)}
				</div>
			)}
			<hr />
			{ticketsResponse && (
				<TicketTable
					expandTickets={expandTickets}
					saveTickets={saveTickets}
					isPolling={isPolling}
					setToast={setToast}
					isExpanding={isExpanding}
				/>
			)}
		</>
	);
}
