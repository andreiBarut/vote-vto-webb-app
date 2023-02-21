import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import "./Pages.css";
import logo from "../assets/images/amvvd_logo.png";
import {
	AiOutlineUserAdd,
	AiOutlineLogin,
	AiOutlineUser,
	AiOutlineLogout,
} from "react-icons/ai";

const Home = () => {
	const [userName, setUserName] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [userId, setUserId] = useState(null);

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
			<article className="home-article-container">
				<h1>ACASĂ</h1>
				{userName && (
					<>
						<section>
							<h4>
								ASOCIAȚIA MILITARILOR VETERANI ȘI VETERANILOR CU DIZABILITĂȚI, SUCURSALA
								SĂLAJ, 2023
							</h4>
							<section
								style={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<img src={logo} alt="association logo" />
							</section>
							<p>Creaza proprille polluri personalizate</p>
							<ol>
								<li>Creaza-ti un cont sau loghează-te în contul tău preexistent</li>
								<li>Creaza-ti propriul poll folosind formularul</li>
								<li>Distribuie linkul generat votantilor</li>
								<li>
									Apasa pe butonul ,,STOP VOT” pentru a opri voturile la pollul tau
								</li>
							</ol>
						</section>
						<section>
							<Link to="/profile" className="link">
								<button>PROFILUL MEU</button>
								<AiOutlineUser style={{ color: "#413733", fontSize: "2rem" }} />
							</Link>
						</section>
						<section onClick={handleDisconnect}>
							<Link to="/" className="link" disabled>
								<button>DECONECTARE</button>
								<AiOutlineLogout style={{ color: "#413733", fontSize: "2rem" }} />
							</Link>
						</section>
						{/* <section>
					<a href="#">urmărește tutorialul în limba română</a>
				</section> */}
					</>
				)}
				{!userName && (
					<>
						<section>
							<h4>
								ASOCIAȚIA MILITARILOR VETERANI DIN TEATRELE DE OPERAȚII, SUCURSALA
								SĂLAJ, 2023
							</h4>
							<p>Creaza proprille polluri personalizate</p>
							<section
								style={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<img src={logo} alt="association logo" />
							</section>
							<ol>
								<li>Creaza-ti un cont sau loghează-te în contul tău preexistent</li>
								<li>Creaza-ti propriul poll folosind formularul</li>
								<li>Distribuie linkul generat votantilor</li>
								<li>
									Apasa pe butonul ,,STOP VOT” pentru a opri voturile la pollul tau
								</li>
							</ol>
						</section>

						<section>
							<Link to="login">
								<button>LOGARE</button>
								<AiOutlineLogin style={{ color: "#413733", fontSize: "2rem" }} />
							</Link>
						</section>
						<section>
							<Link to="signup" disabled>
								<button>ÎNREGISTRARE</button>
								<AiOutlineUserAdd style={{ color: "#413733", fontSize: "2rem" }} />
							</Link>
						</section>
						{/* <section>
					<a href="#">urmărește tutorialul în limba română</a>
				</section> */}
					</>
				)}
			</article>
		</>
	);
};

export default Home;
