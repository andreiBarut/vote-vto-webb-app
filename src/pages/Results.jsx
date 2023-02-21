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
		<article className="results-article-container">
			{isLoaded && (
				<div>
					<h2>REZULTATE PENTRU</h2>
					<h3>TEXT POLL : {resultsData.data.textProblem}</h3>
					<div>
						{Object.entries(resultsData.results).map((element) => (
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
								>
									&nbsp;&nbsp;{element[1].length}
								</span>
							</p>
						))}
					</div>
				</div>
			)}
		</article>
	);
};

export default Results;
