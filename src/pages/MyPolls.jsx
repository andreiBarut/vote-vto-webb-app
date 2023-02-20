import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";

const MyPolls = () => {
	const [userName, setUserName] = useState(null);
	const [userId, setUserId] = useState(null);
	const [data, setData] = useState([]);

	//^GETTING CURRENT USER AND USER ID
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserName(user.displayName);
				setUserId(user.uid);
			} else {
				//if there is no logged in user, redirect to home page
				navigateTo("/");
			}
		});
	}, []);

	const handleClick = (e) => {
		console.log(data);
	};

	useEffect(() => {
		const getDocuments = async () => {
			const q = query(
				collection(db, "polls"),
				where("data.pollAuthorName", "==", "Hulk Hogan")
			);

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
				setData((oldArray) => [...oldArray, [doc.id, doc.data().data.textProblem]]);
				console.log(data);
			});
		};
		getDocuments();
		console.log(data);
	}, []);

	return (
		<article>
			<h2>My Polls</h2>
			<h4>{userName}</h4>
			{data.map((element) => (
				<div>
					<Link to={`/pollCreator/vote/${element[0]}`}>{element[1]}</Link>
				</div>
			))}
			<button onClick={handleClick}>click</button>
		</article>
	);
};

export default MyPolls;
