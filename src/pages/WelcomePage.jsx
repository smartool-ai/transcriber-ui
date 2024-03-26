import Logo from '../components/Logo';

export default function WelcomePage({ loginWithPopup }) {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center gap-y-6">
			<Logo />
			<button
				onClick={() => loginWithPopup()}
				className="btn"
			>
				Sign in
			</button>
		</div>
	);
};
