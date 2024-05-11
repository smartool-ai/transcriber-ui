import { useState } from 'react';
import ButtonSpinner from '../ButtonSpinner';

export default function UploadedFilesTable({ generateTickets, files, ticketsResponse, isPolling }) {
	const [targetFile, setTargetFile] = useState(null);

	// ONLY ALLOW UPLOAD FOR THE SELECTED FILE's GENERATE BUTTON

	const handleGenerateTickets = (fileName) => {
		generateTickets(fileName);
		setTargetFile(fileName);
		console.log(targetFile, fileName)
	}

	const generateTicketsButton = (fileName) => (
		<td className="py-3">
			<button
				className="cursor-pointer flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4654A3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				onClick={() => handleGenerateTickets(fileName)}
			>
				{isPolling ? (
					<div className="flex items-center gap-2">
						<ButtonSpinner />
						<p>Generating Tickets</p>
					</div>
				) : (targetFile === fileName && ticketsResponse ? "Regenerate Tickets" : "Generate Tickets")
				}
			</button>
		</td>
	);

	return (
		<table className="w-full divide-y divide-gray-300">
			<caption className="text-left text-white font-semibold pb-3">Uploaded Files</caption>
			<thead>
				<tr>
					<th scope="col" className="py-3 text-left text-sm font-semibold text-white">Size</th>
					<th scope="col" className="py-3 text-left text-sm font-semibold text-white">Name</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200">
				{Object.entries(files).map(([index, { name, size }]) => (
					<tr key={name}>
						<td className="py-3 text-sm text-white pr-3">{size + " KB"}</td>
						<td className="py-3 text-sm text-white">
							<p className="font-medium">{name}</p>
						</td>
						{generateTicketsButton(name, index)}
					</tr>
				))}
			</tbody>
		</table>
	);
}
