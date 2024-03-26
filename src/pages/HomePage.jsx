import {useUserContext} from "../context/UserContext.jsx";


export default function HomePage() {
	const { firstName } = useUserContext();

	return (
		<div className="text-2xl font-semibold text-white">
			{`Hello, ${firstName.state}!`}
		</div>
	)
}
