import {useUserContext} from "../context/UserContext.jsx";


export default function HomePage() {
	const { user } = useUserContext();

	return (
		<div className="text-2xl font-semibold text-white">
			{`Hello, ${user.name}!`}
		</div>
	)
}
