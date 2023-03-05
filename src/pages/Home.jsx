import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./Pages.css";
import logo from "../assets/images/amvvd_logo.png";
import {
	AiOutlineUserAdd,
	AiOutlineLogin,
	AiOutlineUser,
	AiOutlineLogout,
	AiFillYoutube,
} from "react-icons/ai";

const Home = () => {
	const [userName, setUserName] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [userId, setUserId] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);

	const handleDisconnect = () => {
		signOut(auth);
		window.location.reload();
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserName(user.displayName);
				setUserEmail(user.email);
				setUserId(user.uid);
			} else {
				return;
			}
		});
	}, []);

	//^CHECK IF USER IS ADMIN
	useEffect(() => {
		const getUserAdmin = async () => {
			const docRef = doc(db, "adminUsers", "dNocQtKgI2FMHqQ0okKG");
			const docSnap = await getDoc(docRef);

			console.log("current doc ref :", docSnap.id);
			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
				console.log(userId in docSnap.data().admins);
				if (userId in docSnap.data().admins) {
					setIsAdmin(true);
				}
			} else {
				// doc.data() will be undefined in this case
				console.log("No suchs document!");
			}
		};
		getUserAdmin();
	}, [userId]);

	return (
		<>
			<article className="home-article-container">
				<h1>ACASĂ</h1>
				{userName && (
					<>
						<section>
							<h4>
								ASOCIAȚIA MILITARILOR VETERANI ȘI VETERANILOR CU DIZABILITĂȚI, SUCURSALA
								SĂLAJ
							</h4>
							<section
								style={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<img src={logo} alt="association logo" />
							</section>
							<ol>
								<p style={{ color: "green", fontWeight: "600" }}>
									Crează proprille polluri personalizate
								</p>
								<li>
									Conturile se creează de către adiminstratori. Contactați-i pe cei din
									consiliul de conducere pentru a vă furniza un cont și o parolă, pe care
									ulterior o puteți schimba.
								</li>
								<li>Crează-ți propriul poll folosind formularul (admin only)</li>
								<li>Distribuie linkul generat votanților</li>
								<li>Votează, apoi vezi rezultatele.</li>
								<li>
									Apasa pe butonul ,,STOP VOT” pentru a opri voturile la pollul tău
									(admin only)
								</li>
								<li>
									Apasă pe butonul ,,ȘTERGE POLL” pentru a șterge poll-ul (admin only)
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
						<section style={{ marginTop: "1rem" }}>
							<a
								href="#"
								style={{
									color: "red",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
								}}
							>
								urmărește un video demonstrativ în limba română (work in progress)
								<AiFillYoutube style={{ fontSize: "4rem" }} />
							</a>
						</section>
						{/* <section>
					<a href="#">urmărește tutorialul în limba română</a>
				</section> */}
					</>
				)}
				<>
					<section>
						{isAdmin && (
							<Link to="signup" disabled>
								<p style={{ color: "purple", display: "inline" }}>
									ÎNREGISTREAZĂ UN NOU UTILIZATOR
								</p>
								<AiOutlineUserAdd style={{ color: "#413733", fontSize: "2rem" }} />
							</Link>
						)}
					</section>
				</>
				{!userName && (
					<>
						<section>
							<h4>
								ASOCIAȚIA MILITARILOR VETERANI ȘI VETERANILOR CU DIZABILITĂȚI, SUCURSALA
								SĂLAJ
							</h4>
							<section
								style={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<img src={logo} alt="association logo" />
							</section>
							<ol>
								<p style={{ color: "green", fontWeight: "600" }}>
									Creaza proprille polluri personalizate
								</p>
								<li>
									Conturile se creează de către adiminstratori. Contactați-i pe cei din
									consiliul de conducere pentru a vă furniza un cont și o parolă, parolă
									pe care ulterior o puteți schimba.
								</li>
								<li>Creaza-ti propriul poll folosind formularul (admin only)</li>
								<li>Distribuie linkul generat votantilor</li>
								<li>Votează, apoi vezi rezultatele.</li>
								<li>
									Apasa pe butonul ,,STOP VOT” pentru a opri voturile la pollul tău
									(admin only)
								</li>
							</ol>
						</section>

						<section>
							<Link to="login">
								<button>LOGARE</button>
								<AiOutlineLogin style={{ color: "#413733", fontSize: "2rem" }} />
							</Link>
						</section>

						<section style={{ marginTop: "1rem" }}>
							<a
								href="#"
								style={{
									color: "red",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									flexDirection: "column",
								}}
							>
								urmărește un video demonstrativ în limba română (work in progress)
								<AiFillYoutube style={{ fontSize: "4rem" }} />
							</a>
						</section>
					</>
				)}
			</article>
		</>
	);
};

export default Home;
