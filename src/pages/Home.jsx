import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [userName, setUserName] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [userId, setUserId] = useState(null);

	const navigateTo = useNavigate();

	const handleDisconnect = () => {
		signOut(auth);
		window.location.reload();
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUserName(user.displayName);
			setUserEmail(user.email);
			setUserId(user.uid);
		} else {
			return;
		}
	});

	return (
		<>
			<article>
				<h1>ACASĂ</h1>
				{userName && (
					<>
						<section>
							<Link to="login">logare</Link>
						</section>
						<section>
							<Link to="signup" disabled>
								înregistrare
							</Link>
						</section>
						<section onClick={handleDisconnect}>
							<Link to="/" disabled>
								deconectare
							</Link>
						</section>
						<section>
							<Link to="/profile">profilul meu</Link>
						</section>
						{/* <section>
					<a href="#">urmărește tutorialul în limba română</a>
				</section> */}
					</>
				)}
				{!userName && (
					<>
						<section>
							<Link to="login">logare</Link>
						</section>
						<section>
							<Link to="signup" disabled>
								înregistrare
							</Link>
						</section>
					</>
				)}
			</article>
		</>
	);
};

export default Home;
