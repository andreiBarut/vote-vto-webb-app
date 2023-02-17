import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
