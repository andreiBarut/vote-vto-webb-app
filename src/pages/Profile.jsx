import { useParams } from "react-router-dom";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Profile = () => {
	console.log("hererere");
	console.log(typeof profileURL);
	const user = auth.currentUser;
	console.log(typeof user.uid);

	if (user !== null) {
		return (
			<>
				<article>
					<section>
						<h1>Profilul Meu</h1>
						<p>Email : {user.email}</p>
						<p>ID : {user.uid}</p>
					</section>
					<section style={{ display: "flex", flexDirection: "column" }}>
						<Link to={`/pollCreator/${user.uid}`}>
							<button>crează poll</button>
						</Link>
						<button disabled>pollurile mele</button>
						<button disabled>schimbă parola/</button>
					</section>
				</article>
			</>
		);
	}
};

export default Profile;
