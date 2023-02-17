import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
	const [userName, setUserName] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [userId, setUserId] = useState(null);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUserName(user.displayName);
			setUserEmail(user.email);
			setUserId(user.uid);
		} else {
			console.log("user is signed out");
		}
	});
	// const user = auth.currentUser;

	return (
		<>
			<article>
				{console.log("inside return")}
				<section>
					<h1>Profilul Meu</h1>
					{console.log("below profile", userEmail)}
					<p>Email : {userEmail}</p>
					<p>Name: {userName}</p>
					<p>ID : {userId}</p>
				</section>
				<section style={{ display: "flex", flexDirection: "column" }}>
					<Link to={`/pollCreator`}>
						<button>crează poll</button>
					</Link>
					<button disabled>pollurile mele</button>
					<button disabled>schimbă parola/</button>
				</section>
			</article>
		</>
	);
};

export default Profile;
