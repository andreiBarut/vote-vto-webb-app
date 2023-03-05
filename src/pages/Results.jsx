import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Results = () => {
	const pollId = useParams();
	const [userName, setUserName] = useState(null);
	const [userId, setUserId] = useState(null);
	const [resultsData, setResultsData] = useState(null);
	const [currentDocId, setCurrentDocId] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [nrOfVotes, setNrOfVotes] = useState(null);

	const navigateTo = useNavigate();

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

	//^GETTING FIRESTORE POLL BASED ON USE PARAMS()S
	useEffect(() => {
		const getDocument = async () => {
			const docRef = doc(db, "polls", pollId.pollId);
			const docSnap = await getDoc(docRef);
			setCurrentDocId(docSnap.id);

			console.log("current doc ref :", docSnap.id);
			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
				setResultsData(docSnap.data());
				console.log(docSnap.data());
				setIsLoaded(true);
			} else {
				// doc.data() will be undefined in this case
				console.log("No suchs document!");
			}
		};
		console.log(resultsData);
		getDocument();
	}, []);

	const handleStopVote = (e) => {
		e.preventDefault();
		e.target.disabled = true;
		async function updateStopVote() {
			const docRefRes = doc(db, "polls", currentDocId);
			await updateDoc(docRefRes, {
				"data.active": false,
			});
			console.log("document updated with ID: ", "/polls/", currentDocId);
			// navigateTo(`/results/${pollId}`);
			window.location.reload();
		}

		if (resultsData.data.voteType === "private") {
			console.log("not sending name alongside with answers");
			//here we will have an array of as many maps as the options are
			//the maps will have the key (optionName) and the value as a number which is incremented as users vote.
		} else {
			console.log("sending reults alongside with name");
			//here we will send an array which contains as many maps as the options are
			//the maps will have the key (optionName), and the value as an array which is modified (usernames pushed in it) as users post (using updateDoc())
		}
		//after we update the doc, we will navigate to a new page called pollResults, which will show the results.
		//on the results page, if the user is the creator of that specific poll, we verify using pollId, then we show a button which says stop vote. This will update a field (which does not exist yet) "open" = false
		//when open is false then Vote page will not shot options to vote, instead it will show the text problem, and a button which when clicked will take the user to the Results page.
		updateStopVote();
	};

	const handleDeletePoll = async () => {
		if (
			confirm(
				"Sunteți sigur că doriți să ștergeți acest poll? Această operațiune este ireversibilă!"
			) === true
		) {
			alert(
				"Acest poll a fost șters cu succes! Redirecționare către pagina de profil"
			);
			await deleteDoc(doc(db, "polls", currentDocId));
			console.log("poll deleted");
			navigateTo("/profile");
		} else {
			return;
		}
	};

	return (
		<article className="results-article-container">
			{isLoaded && (
				<div>
					<h2>REZULTATE PENTRU</h2>
					<h3>TEXT POLL : {resultsData.data.textProblem}</h3>
					<h4>Creat la data de : {resultsData.date}</h4>
					<p style={{ color: "blue" }}>
						TIP VOT : {resultsData.data.voteType === "private" ? "privat" : "public"}
					</p>
					<div>
						<p>Total Voturi : {resultsData.voters.length}</p>
						{Object.entries(resultsData.results).map(
							(element) =>
								resultsData.data.voteType === "public" && (
									<p className="results-result-p">
										<span style={{ color: "green", fontWeight: "bold" }}>
											{element[0] + " "}
										</span>
										=&gt;
										<span style={{ fontWeight: "bold" }}>
											&nbsp;&nbsp;{element[1] + " "} =&gt;
										</span>
										<span
											style={{ fontWeight: "bolder", color: "blue", fontSize: "1.5rem" }}
											key={`voteNr ${element[1]}`}
										>
											&nbsp;&nbsp;{element[1].length}
										</span>
									</p>
								)
						)}
						{Object.entries(resultsData.results).map(
							(element) =>
								resultsData.data.voteType === "private" && (
									<p className="results-result-p">
										<span style={{ color: "green", fontWeight: "bold" }}>
											{element[0] + " "}
										</span>
										=&gt;
										<span
											style={{ fontWeight: "bolder", color: "blue", fontSize: "1.5rem" }}
										>
											&nbsp;&nbsp;{element[1].length}
										</span>
									</p>
								)
						)}

						{resultsData.data.active && resultsData.data.pollAuthorId === userId && (
							<>
								<button onClick={handleStopVote}>STOP VOT</button>
								<button onClick={handleDeletePoll}>ȘTERGE POLL</button>
							</>
						)}
						{!resultsData.data.active && (
							<>
								<p style={{ color: "red" }}>Votarea a fost închisă de către autor!</p>
								<button onClick={handleDeletePoll}>ȘTERGE POLL</button>
							</>
						)}
					</div>
				</div>
			)}
		</article>
	);
};

export default Results;
