import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import "./Pages.css";
import logo from "../assets/images/amvvd_logo.png";
import { CgProfile } from "react-icons/cg";

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
							<img src={logo} alt="association logo" />
						</section>
						<CgProfile style={{ fontSize: "2rem" }} />
						<section>
							<Link to="/profile" className="link">
								<button>PROFILUL MEU</button>
							</Link>
						</section>
						<section onClick={handleDisconnect}>
							<Link to="/" className="link" disabled>
								<button>DECONECTARE</button>
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
							<img src={logo} alt="association logo" />
						</section>
						<CgProfile style={{ fontSize: "2rem" }} />
						<section>
							<Link to="login">&gt;logare</Link>
						</section>
						<section>
							<Link to="signup" disabled>
								&gt;înregistrare
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
