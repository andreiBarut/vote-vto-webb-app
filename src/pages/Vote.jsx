import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	addDoc,
	doc,
	getDoc,
	collection,
	updateDoc,
	FieldValue,
	increment,
	arrayUnion,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { useState } from "react";

const Vote = () => {
	const [userName, setUserName] = useState(null);
	const [userId, setUserId] = useState(null);
	const [data, setData] = useState(null);
	const [didUserVote, setDidUserVote] = useState(null);
	const pollId = useParams();
	const [isLoaded, setIsLoaded] = useState(false);
	const [formData, setFormData] = useState("Jackson");
	const [currentDocId, setCurrentDocId] = useState(null);
	const [currOption, setCurrOption] = useState(null);
	const initialValues = new Map();

	const navigateTo = useNavigate();

	const [resultData, setResultData] = useState(initialValues);

	//^GETTING CURRENT USER AND USER ID
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

	//^GETTING FIRESTORE POLL BASED ON USE PARAMS()S
	useEffect(() => {
		const getDocument = async () => {
			const docRef = doc(db, "polls", pollId.pollId);
			const docSnap = await getDoc(docRef);
			setCurrentDocId(docSnap.id);
			console.log("current doc ref :", docSnap.id);
			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
				setFormData(docSnap.data());
				setIsLoaded(true);
			} else {
				// doc.data() will be undefined in this case
				console.log("No suchs document!");
			}
		};
		getDocument();
	}, []);

	//^UPDATING CURR OPTION STATE
	const handleChange = (e) => {
		if (e.target.type === "checkbox") {
			if (e.target.checked && resultData.get(e.target.value) === 0) {
				console.log(e.target.value);
				setResultData(
					resultData.set(e.target.value, resultData.get(e.target.value) + 1 || 1)
				);

				console.log(resultData);
			} else if (!e.target.checked) {
				console.log("unchecked");
				setResultData(resultData.set(e.target.value, 0));
				console.log(resultData);
			}
			setCurrOption(`results.${resultData}`);
		} else if (e.target.type === "radio") {
			console.log("hello there");
			setResultData({ [e.target.value]: 1 });
			console.log(resultData);
			//*solution for fields nested in another object
			setCurrOption(`results.${e.target.value}`);
		}
		console.log("this is how the path to the doc looks", currOption);
	};

	const handleClick = (e) => {
		e.preventDefault();
		// window.location.reload();
		navigateTo(`/results/${pollId.pollId}`);
	};

	console.log(pollId.pollId);

	const collectVote = (e) => {
		//for sending the data, will update the current poll, adding new fields which will have the results. The field will be called "results".
		// e.target.disabled = true;
		e.preventDefault();
		e.target.disabled = true;
		async function addPollResultsToDb(resData) {
			const docRefRes = doc(db, "polls", currentDocId);
			await updateDoc(docRefRes, {
				[currOption]: arrayUnion(userName),
				voters: arrayUnion(userId),
			});
			console.log("document updated with ID: ", "/polls/", currentDocId);
		}

		if (formData.data.voteType === "private") {
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
		addPollResultsToDb(resultData);
		// navigateTo(`/results/${pollId}`);
		window.location.reload();
	};

	return (
		<article>
			<h1>Voteaza</h1>
			{isLoaded && (
				<>
					<label htmlFor="pollId">
						Copiaza Linkul de mai Jos si Distribuie-l Colegilor
					</label>
					<input
						type="text"
						value={window.location.href}
						disabled={true}
						style={{ width: "50vw", display: "block", textAlign: "center" }}
					/>
					<h2>Textul Problemei</h2>
					<p>{formData.data.textProblem}</p>
					<></>
					{formData.data.pollType === "multiple" && (
						<form>
							<p>Alegere multipla</p>
							{formData.data.optionsText.split(",").map((element) => (
								<div key={`div ${element}`}>
									<label htmlFor={`element ${element}`} key={`label ${element}`}>
										{element}
									</label>
									<input
										type="checkbox"
										name={`element ${element}`}
										id={`element ${element}`}
										value={element}
										key={`checkbox ${element}`}
										onChange={handleChange}
									/>
								</div>
							))}
							<button onClick={collectVote}>Voteaza</button>
						</form>
					)}
					{formData.data.pollType === "single" && (
						<form>
							<p>O singura varianta de votare</p>
							{formData.data.optionsText.split(",").map((element) => (
								<div key={`div ${element}`}>
									<label htmlFor={`element ${element}`} key={`label ${element}`}>
										{element}
									</label>
									<input
										type="radio"
										name={`radio`}
										id={`element ${element}`}
										value={element}
										key={`radio ${element}`}
										onChange={handleChange}
									/>
								</div>
							))}
							{!formData.voters.includes(userId) && (
								<button onClick={collectVote}>Voteaza</button>
							)}
							{formData.voters.includes(userId) && (
								<button onClick={handleClick}>Vezi Rezultatele</button>
							)}
						</form>
					)}
				</>
			)}
			{!isLoaded && <p>...loading resources</p>}
		</article>
	);

	// if (pollId) {
	// 	return (
	// 		<>
	// 			<p>vote {JSON.stringify(pollId.pollId)}</p>
	// 			{formData ? <>{formData.data.textProblem}</> : null}
	// 			<input type="text" value={pollId.pollId} id="pollId" disabled={true} />

	// 		</>
	// 	);
	// } else {
	// 	return (
	// 		<p>
	// 			Eroare: poll-ul nu a fost gasit. Este posibil ca acesta sa fi fost sters sau
	// 			incheiat de catre autor.
	// 		</p>
	// 	);
	// }
};

export default Vote;
