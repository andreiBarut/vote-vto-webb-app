import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const Home = () => {
	const handleDisconnect = () => {
		signOut(auth);
	};

	return (
		<>
			<article>
				<h1>ACASĂ</h1>
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
				{/* <section>
					<a href="#">urmărește tutorialul în limba română</a>
				</section> */}
			</article>
		</>
	);
};

export default Home;
