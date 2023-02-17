import { auth } from "../firebase";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
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

	return <>{userName}</>;
};

export default Navbar;
