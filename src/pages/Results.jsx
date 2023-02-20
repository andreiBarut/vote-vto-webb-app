import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Results = () => {
	const pollId = useParams();
	const [resultsData, setResultsData] = useState(null);
	const [currentDocId, setCurrentDocId] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);

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

	return (
		<article>
			{isLoaded && (
				<div>
					<div>results for: {resultsData.data.textProblem}</div>
					<p style={{ border: "2px solid red" }}>
						{Object.entries(resultsData.results) + " "}
					</p>
				</div>
			)}
		</article>
	);
};

export default Results;
