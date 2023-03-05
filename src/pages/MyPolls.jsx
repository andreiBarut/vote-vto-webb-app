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
	const [toDelPoll, setToDellPol] = useState(null);

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

	useEffect(() => {
		const getDocuments = async () => {
			const q = query(
				collection(db, "polls"),
				where("data.pollAuthorId", "==", `${userId}`)
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
				setData((oldArray) => [
					...oldArray,
					[
						doc.id,
						doc.data().data.textProblem,
						doc.data().data.voteType,
						doc.data().date,
						doc.data().data.active,
					],
				]);
				console.log(data);
			});
			setIsLoaded(true);
		};
		getDocuments();
	}, [userName]);

	const deletePoll = (e) => {
		setToDellPol(e.target.name);
		console.log(toDelPoll);
	};

	return (
		<article>
			<div>
				<h2>POLL-URILE MELE</h2>
				<hr></hr>
				<h4>{userName}</h4>
				<hr></hr>
				<table>
					<tr style={{ fontWeight: "bolder", color: "green" }}>
						<td>TEXT POLL</td>
						<td>TIP VOT</td>
						<td>CREAT ÎN DATA DE</td>
						<td>STATUS POLL</td>
					</tr>
					{data.map((element) => (
						<>
							<tr key={`element ${element}`}>
								<td>
									<Link
										to={`/pollCreator/vote/${element[0]}`}
										key={element[0]}
										title={element[1]}
										className="myPolls-link-container"
										style={{ color: "purple" }}
									>
										{element[1].length > 10
											? element[1].substring(0, 10) + "..."
											: element[1]}
									</Link>
								</td>
								<td>
									{element[2] === "private" ? (
										<span style={{ color: "purple" }}> {element[2]}</span>
									) : (
										<span style={{ color: "orange" }}> {element[2]}</span>
									)}
								</td>
								<td>
									<span style={{ color: "blue" }}>{element[3]}</span>
								</td>
								<td>
									{element[4] ? (
										<span style={{ color: "green" }}>activ</span>
									) : (
										<span style={{ color: "red" }}>inactiv</span>
									)}
								</td>
							</tr>
							<hr></hr>
						</>
					))}
				</table>
			</div>
		</article>
	);
};

export default MyPolls;
