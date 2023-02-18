import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

const Vote = () => {
	const pollId = useParams();
	const [isLoaded, setIsLoaded] = useState(false);
	const [formData, setFormData] = useState("Jackson");
	const [options, setOptions] = useState(null);
	console.log(pollId.pollId);

	useEffect(() => {
		const getDocument = async () => {
			const docRef = doc(db, "polls", pollId.pollId);
			const docSnap = await getDoc(docRef);

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

	const collectVote = (e) => {
		//for sending the data, will update the current poll, adding new fields which will have the results. The field will be called "results".
		e.preventDefault();
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
									/>
								</div>
							))}
							<button onClick={(e) => e.preventDefault()}>Voteaza</button>
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
									/>
								</div>
							))}
							<button onClick={(e) => e.preventDefault()}>Voteaza</button>
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
