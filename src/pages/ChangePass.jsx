import { auth } from "../firebase";
import {
	onAuthStateChanged,
	updatePassword,
	signOut,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ChangePass = () => {
	const [newPassword, setNewPassword] = useState(null);
	const [confirmNewPassword, setConfirmNewPassword] = useState(null);
	const [passStatus, setPassStatus] = useState(null);

	const navigateTo = useNavigate();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserName(user.displayName);
				setUserId(user.uid);
				setData({
					...data,
					pollAuthorId: user.uid,
					pollAuthorName: user.displayName,
				});
			} else {
				//if there is no logged in user, redirect to home page
				navigateTo("/");
			}
		});
	}, []);

	const resetPassword = (e) => {
		e.preventDefault();
		if (newPassword === confirmNewPassword) {
			updatePassword(auth.currentUser, newPassword)
				.then(() => {
					// Update successful.
					console.log("updated password");
					setPassStatus(
						"Parola a fost schimbată. Te poți întoarce la pagina precedentă."
					);
					alert("Parola a fost schimbată.");
					navigateTo("/profile");
				})
				.catch((error) => {
					setPassStatus(
						"Te rugăm să te deloghezi și să te loghezi din nou pentru a putea schimba parola. Aceasta este o măsură de siguranță."
					);
					alert(
						"Te rugăm să te deloghezi și să te loghezi din nou pentru a putea schimba parola. Aceasta este o măsură de siguranță."
					);
					console.log(error);
					// An error ocurred
					// ...
				});
		} else {
			console.log(newPassword, " is not the same as ", confirmNewPassword);
			setPassStatus("Parolele nu sunt identice, te rugăm să verifici din nou.");
			alert("Parolele nu sunt identice, te rugăm să verifici din nou.");
		}
	};

	const handleChange1 = (e) => {
		setNewPassword(e.target.value);
		console.log(newPassword);
	};

	const handleChange2 = (e) => {
		setConfirmNewPassword(e.target.value);
	};

	return (
		<article className="changepass-article-container">
			<h2>SCHIMBĂ PAROLA</h2>
			<h4 style={{ color: "blue" }}>{passStatus}</h4>
			{/* <p style={{ textAlign: "center", color: "purple" }}>
				Dacă vei primi o eroare, înseamnă ca va trebui să te deloghezi și să te
				reloghezi în contul tăi. Iar apoi vei putea din nou să încerci să schimbi
				parola. Aceasta este o măsură de siguranță.
			</p> */}
			<form className="changepass-form">
				<input
					type="password"
					name="password"
					placeholder="introdu noua parolă"
					onChange={handleChange1}
				/>
				<input
					type="password"
					name="password"
					placeholder="confirmă noua parolă"
					onChange={handleChange2}
				/>
				<button onClick={resetPassword}>CONFIRMĂ</button>
			</form>
		</article>
	);
};

export default ChangePass;
