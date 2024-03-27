import Logo from '../components/Logo';
import {useAuth0} from "@auth0/auth0-react";

export default function WelcomePage() {
	const { loginWithRedirect } = useAuth0();
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-y-6">
			<Logo />
			<button
				onClick={() => loginWithRedirect()}
				className="btn"
			>
				Sign in
			</button>
		</div>
	);
};
