import { auth } from "../firebase";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import "./Navbar.css";

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
				<ul>
					<li>logo</li>
					<li>status: logat ca {userName}</li>
				</ul>
			)}
			{!userName && (
				<ul>
					<li>logo</li>
					<li>status: delogat</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;
