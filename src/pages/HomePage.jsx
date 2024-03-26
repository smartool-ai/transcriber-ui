import {useUserContext} from "../context/UserContext.jsx";


export default function HomePage() {
	const { state } = useUserContext().firstName;

	return (
		<div className="text-2xl font-semibold text-white">
			{`Hello, ${state}!`}
		</div>
	)
}
