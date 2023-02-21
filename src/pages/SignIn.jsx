import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
	const [userEmail, setUserEmail] = useState(null);
	const [userPassword, setUserPassword] = useState(null);
	const [TESTmessage, setTESTMessage] = useState(null);
	const [userName, setUserName] = useState(null);

	const navigateTo = useNavigate();

	const handleChangeEmail = (e) => {
		setUserEmail(e.target.value);
		console.log(userEmail);
	};

	const handleChangePassword = (e) => {
		setUserPassword(e.target.value);
		console.log(userPassword);
	};

	const handleChangeName = (e) => {
		setUserName(e.target.value);
		console.log(userName);
	};

	// useEffect(() => {
	// 	window.localStorage.setItem("currentUser", JSON.stringify(currentUser));
	// });

	const loginAccount = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, userEmail, userPassword)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setTESTMessage("signed in as " + user.uid);
				// setCurrentUser(user);
				navigateTo("/profile");
			})
			// ...

			.catch((error) => {
				const errorCode = error.code;
				setTESTMessage("sign up failed " + errorCode);
				const errorMessage = error.message;
				// ..
			});
	};

	return (
		<>
			<article>
				<h1>LOGHEAZĂ-TE ÎN CONTUL TĂU</h1>
				<form style={{ display: "flex", flexDirection: "column" }}>
					<label htmlFor="email">EMAIL</label>
					<input type="email" onChange={handleChangeEmail} id="email" />
					<label htmlFor="password">PAROLĂ</label>
					<input type="password" onChange={handleChangePassword} id="password" />
					<button onClick={loginAccount}>LOGARE</button>
				</form>

				<p>{TESTmessage}</p>
			</article>
		</>
	);
};

export default SignIn;
