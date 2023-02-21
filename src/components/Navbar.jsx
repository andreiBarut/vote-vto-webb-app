import { auth } from "../firebase";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [userName, setUserName] = useState(null);
	const [userId, setUserId] = useState(null);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUserName(user.displayName);
			setUserId(user.uid);
		} else {
			console.log("user is signed out");
		}
	});

	return (
		<nav>
			{userName && (
				<ul
				// style={{
				// 	listStyle: "none",
				// 	display: "flex",
				// 	flexDirection: "row",
				// 	justifyContent: "space-between",
				// 	border: "2px solid blue",
				// 	width: "60vw",
				// }}
				>
					<li>
						<Link to="/">
							<div className="navbar-circle">
								<p>V</p>
								<p>T</p>
							</div>
						</Link>
					</li>
					<li style={{ color: "rgb(147, 237, 147)" }}>
						status: logat ca {userName}
						<CgProfile style={{ fontSize: "2rem" }} />
					</li>
				</ul>
			)}
			{!userName && (
				<ul>
					<li>
						<div className="navbar-circle">
							<p>V</p>
							<p>T</p>
						</div>
					</li>
					<li style={{ color: "pink" }}>
						status: delogat
						<CgProfile style={{ fontSize: "2rem" }} />
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
