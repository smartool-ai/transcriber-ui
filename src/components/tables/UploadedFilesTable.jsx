import { useState } from 'react';
import ButtonSpinner from '../ButtonSpinner';
import { getTimestampFromFilename } from '../../utils/getTimestamp';
import { strCombine, twConditional } from '../../utils/tailwindUtils';

export default function UploadedFilesTable({ generateTickets, files, ticketsResponse, isPolling }) {
	const [targetFile, setTargetFile] = useState(null);
	const [fileID, setFileID] = useState(null);

	const handleGenerateTickets = (fileName, id) => {
		generateTickets(fileName);
		setTargetFile(fileName);
		setFileID(id)
	}

	const generateTicketsButton = (fileName, index, fileID) => (
		<td className="py-3">
			<button
				className={strCombine("cursor-pointer flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4654A3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600", twConditional(targetFile === fileName && ticketsResponse, "bg-green-600"))}
				onClick={() => handleGenerateTickets(fileName, index)}
			>
				{isPolling && index === fileID ? (
					<div className="flex items-center gap-2">
						<ButtonSpinner />
						<p>Generating...</p>
					</div>
				) : (targetFile === fileName && ticketsResponse ? "Regenerate Tickets" : "Generate Tickets")
				}
			</button>
		</td>
	);

	const getDate = (fileName) => {
		const timestamp = getTimestampFromFilename(fileName)
		const isoString = `${timestamp.slice(0, 4)}-${timestamp.slice(4, 6)}-${timestamp.slice(6, 8)}T${timestamp.slice(8, 10)}:${timestamp.slice(10, 12)}:${timestamp.slice(12, 14)}Z`;
		const date = new Date(isoString);
		const options = {
			year: 'numeric', 
			month: 'long', 
			day: 'numeric', 
			hour: '2-digit', 
			minute: '2-digit', 
			hour12: true
		};

		return date.toLocaleString('en-US', options);
	}

	return (
		<table className="w-full divide-y divide-gray-300">
			<caption className="text-left text-white font-semibold pb-3">Uploaded Files</caption>
			<thead>
				<tr>
					<th scope="col" className="py-3 text-left text-sm font-semibold text-white">Size</th>
					<th scope="col" className="py-3 text-left text-sm font-semibold text-white">Date Uploaded</th>
					<th scope="col" className="py-3 text-left text-sm font-semibold text-white">File Name</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200">
				{Object.entries(files).map(([index, { name, size }]) => (
					<tr key={name}>
						<td className="py-3 text-sm text-white pr-3">{size + " KB"}</td>
						<td className="py-3 text-sm text-white pr-3">{getDate(name)}</td>
						<td className="py-3 text-sm text-white">
							<p className="font-medium">{name}</p>
						</td>
						{generateTicketsButton(name, index, fileID)}
					</tr>
				))}
			</tbody>
		</table>
	);
}
