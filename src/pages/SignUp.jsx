import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const [userEmail, setUserEmail] = useState(null);
	const [userPassword, setUserPassword] = useState(null);
	const [TESTmessage, setTESTMessage] = useState(null);

	const navigateTo = useNavigate();

	const handleChangeEmail = (e) => {
		setUserEmail(e.target.value);
		console.log(userEmail);
	};

	const handleChangePassword = (e) => {
		setUserPassword(e.target.value);
		console.log(userPassword);
	};

	const createAccount = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, userEmail, userPassword)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setTESTMessage("signed in as " + user.uid);
				navigateTo(`/profile/${user.uid}`);
				// ...
			})
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
				<h1>Crează-ți Propriul Cont</h1>
				<form style={{ display: "flex", flexDirection: "column" }}>
					<label>E-mail</label>
					<input type="email" onChange={handleChangeEmail} />
					<label>Nume</label>
					<input type="text" />
					<label>Prenume</label>
					<input type="text" />
					<label>Parolă</label>
					<input type="password" onChange={handleChangePassword} />
					<button onClick={createAccount}>Creare Cont</button>
				</form>

				<p>{TESTmessage}</p>
			</article>
		</>
	);
};

export default SignUp;
