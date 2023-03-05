import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import { onAuthStateChanged, updatePassword, deleteUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiUserPin } from "react-icons/bi";
import logo from "../assets/images/amvvd_logo.png";
const Profile = () => {
	const [userName, setUserName] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [userId, setUserId] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);

	const navigateTo = useNavigate();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			console.log("HERE IS USER", user);
			setUserName(user.displayName);
			setUserEmail(user.email);
			setUserId(user.uid);
		} else {
			//if there is no logged in user, redirect to home page
			navigateTo("/");
		}
	});

	useEffect(() => {
		const getUserAdmin = async () => {
			const docRef = doc(db, "adminUsers", "dNocQtKgI2FMHqQ0okKG");
			const docSnap = await getDoc(docRef);

			console.log("current doc ref :", docSnap.id);
			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
				console.log(userId in docSnap.data().admins);
				if (userId in docSnap.data().admins) {
					setIsAdmin(true);
				}
			} else {
				// doc.data() will be undefined in this case
				console.log("No suchs document!");
			}
		};
		getUserAdmin();
	}, [userId]);

	const deleteAccount = (e) => {
		if (
			confirm(
				"Sunteți sigur că doriți să ștergeți contul? Această operațiune este ireversibilă!"
			) === true
		) {
			deleteUser(auth.currentUser)
				.then(() => {
					console.log("User deleted");
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			return;
		}
	};

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
					{isAdmin && (
						<>
							<Link to={`/pollCreator`}>
								<button>CREAZĂ POLL</button>
							</Link>
							<Link to={`/myPolls`}>
								<button>POLLURILE MELE</button>
							</Link>
						</>
					)}
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							// alignItems: "center",
							marginTop: "1rem",
							gap: "0.7rem",
						}}
					>
						<Link to={`/profile/changePassword`}>
							<p style={{ color: "purple", display: "inline" }}>SCHIMBĂ PAROLA</p>
						</Link>
						<p
							style={{
								color: "purple",
								display: "inline",
								fontWeight: "600",
								cursor: "pointer",
							}}
							onClick={deleteAccount}
						>
							ȘTERGE CONTUL
						</p>
					</div>
				</section>
			</article>
		</>
	);
};

export default Profile;
