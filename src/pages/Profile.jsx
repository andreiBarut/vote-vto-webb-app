import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiUserPin } from "react-icons/bi";
import logo from "../assets/images/amvvd_logo.png";
const Profile = () => {
	const [userName, setUserName] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [userId, setUserId] = useState(null);

	const navigateTo = useNavigate();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUserName(user.displayName);
			setUserEmail(user.email);
			setUserId(user.uid);
		} else {
			//if there is no logged in user, redirect to home page
			navigateTo("/");
		}
	});

	return (
		<>
			<article className="profile-article-container">
				{console.log("inside return")}
				<section style={{ textAlign: "center" }}>
					<h1>PROFILUL MEU</h1>
					<img style={{ height: "100px" }} src={logo} alt="association logo" />
					{/* <BiUserPin style={{ fontSize: "5rem" }} /> */}
					{console.log("below profile", userEmail)}
					<section className="profile-article-credentials-container">
						<p>EMAIL: {userEmail}</p>
						<p>NUME UTILIZATOR: {userName}</p>
					</section>
				</section>
				<section style={{ display: "flex", flexDirection: "column" }}>
					<Link to={`/pollCreator`}>
						<button>CREAZĂ POLL</button>
					</Link>
					<Link to={`/myPolls`}>
						<button>POLLURILE MELE</button>
					</Link>

					<button disabled>SCHIMBĂ PAROLA</button>
					<button disabled>ȘTERGE CONTUL</button>
				</section>
			</article>
		</>
	);
};

export default Profile;
