import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const PollCreator = () => {
	const [userName, setUserName] = useState(null);
	const [userId, setUserId] = useState(null);
	const [docRefId, setDocRefId] = useState(null);
	const initialValues = {
		pollAuthorId: "",
		pollAuthorName: "",
		textProblem: "",
		nrOptions: "",
		optionsText: "",
		pollType: "",
		voteType: "",
	};
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

	const [data, setData] = useState(initialValues);

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
			<article>
				<h1>Creare Poll : {userName}</h1>
				<fieldset>
					<form>
						<h2>Text problema in Discutie</h2>
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
						<h2>Tip Poll</h2>
						<label htmlFor="pollTypeMultiple">Alegere Multipla</label>
						<input
							type="radio"
							onChange={handleChange}
							value="multiple"
							name="pollType"
							id="pollTypeMultiple"
							required={true}
						/>
						<label htmlFor="votetTypePublic">O Singura Varianta de Raspuns</label>
						<input
							type="radio"
							onChange={handleChange}
							value="single"
							name="pollType"
							id="pollTypeSingle"
							required={true}
						/>
						<h2>Tip Vot</h2>
						<label htmlFor="votetTypePublic">Vot Public</label>
						<input
							type="radio"
							onChange={handleChange}
							value="public"
							name="voteType"
							id="voteTypePublic"
							required={true}
						/>
						<label htmlFor="votetTypePrivate">Vot Privat</label>
						<input
							type="radio"
							onChange={handleChange}
							value="private"
							name="voteType"
							id="voteTypePrivate"
							required={true}
						/>
						<h2>Optiuni</h2>
						<label htmlFor="nrOptions">Nr. Optiuni</label>
						<input
							type="number"
							onChange={handleChange}
							value={data.nrOptions}
							name="nrOptions"
							id="nrOptions"
							required={true}
						/>
						<label htmlFor="optionsText">Text Optiuni</label>
						<input
							type="text"
							onChange={handleChange}
							value={data.optionsText}
							name="optionsText"
							id="optionsText"
							required={true}
						/>
						<button onClick={updateDb}>Creaza Poll</button>
					</form>
				</fieldset>
			</article>
		</>
	);
};

export default PollCreator;
