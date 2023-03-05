import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import moment from "moment/moment";

const PollCreator = () => {
	const [userName, setUserName] = useState(null);
	const [userId, setUserId] = useState(null);
	const [docRefId, setDocRefId] = useState(null);
	const formatDate = moment().format("DD-MM-YYYY");
	const navigateTo = useNavigate();

	const initialValues = {
		pollAuthorId: "",
		pollAuthorName: "",
		textProblem: "",
		nrOptions: "",
		optionsText: "",
		// pollType: "",
		voteType: "",
		voters: "",
		active: true,
	};

	const [data, setData] = useState(initialValues);

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

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const updateDb = (e) => {
		e.preventDefault();
		async function addPollToDb(data) {
			e.preventDefault();
			try {
				const docRef = await addDoc(collection(db, "polls"), {
					data,
					voters: "",
					date: moment().format("DD-MM-YYYY hh:mm"),
				});
				setDocRefId(docRef.id);
				console.log(docRef.id);
				console.log("document written iwth ID: ", docRef.id);
				navigateTo(`vote/${docRef.id}`);
			} catch (e) {
				console.log("Error adding document", e);
			}
		}
		addPollToDb(data);
	};

	return (
		<>
			<article className="pollCreator-article-container">
				<h1>
					CREARE POLL: utilizator curent{" "}
					<span style={{ fontWeight: "bolder", textDecoration: "underline" }}>
						{userName}
					</span>{" "}
				</h1>
				{/* <fieldset> */}
				<form>
					<section>
						<h2>TEXT PROBLEMĂ</h2>
						<textarea
							rows="14"
							cols="60"
							maxLength={800}
							value={data.textProblem}
							name="textProblem"
							id="problemText"
							onChange={handleChange}
							required={true}
						></textarea>
					</section>
					<section>
						{/* <h2>TIP POLL</h2> */}
						{/* <label htmlFor="pollTypeMultiple">Alegere Multipla</label>
						<input
							type="radio"
							onChange={handleChange}
							value="multiple"
							name="pollType"
							id="pollTypeMultiple"
							required={true}
						/> */}
						{/* <label htmlFor="votetTypePublic">O Singura Varianta de Raspuns</label>
						<input
							type="radio"
							onChange={handleChange}
							value="single"
							name="pollType"
							id="pollTypeSingle"
							required={true}
						/> */}
					</section>
					{/* //! SCRIERE LIBERA*/}
					<section>
						<h2>TIP VOT</h2>
						<label htmlFor="votetTypePublic">
							Vot Public{" "}
							<span style={{ color: "blue" }}>(numele votanților este public)</span>
						</label>
						<input
							type="radio"
							onChange={handleChange}
							value="public"
							name="voteType"
							id="voteTypePublic"
							required={true}
						/>
						<br />
						<label htmlFor="votetTypePrivate">
							Vot privat
							<span style={{ color: "blue" }}>(numele votanților este ascuns)</span>
						</label>
						<input
							type="radio"
							onChange={handleChange}
							value="private"
							name="voteType"
							id="voteTypePrivate"
							required={true}
						/>
					</section>
					{/* <h2>Optiuni</h2>
						<label htmlFor="nrOptions">Nr. Optiuni</label>
						<input
							type="number"
							onChange={handleChange}
							value={data.nrOptions}
							name="nrOptions"
							id="nrOptions"
							required={true}
						/> */}
					<br />
					<h2>TEXT OPȚIUNI</h2>
					<label htmlFor="optionsText">
						Scrie-ti optiunile si separati-le prin virgula astfel: pentru, impotriva,
						ma abtin (sau orice alta combinatie, atata timp cat sunt separate prin
						virgula){" "}
					</label>
					<br />
					<input
						type="text"
						onChange={handleChange}
						value={data.optionsText}
						name="optionsText"
						id="optionsText"
						required={true}
					/>
					<br />
					<button onClick={updateDb}>CREAZĂ POLL</button>
				</form>
				{/* </fieldset> */}
			</article>
		</>
	);
};

export default PollCreator;
