import { auth } from "../firebase";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const PollCreator = () => {
	const [userName, setUserName] = useState(null);
	const [userId, setUserId] = useState(null);

	const [nrOptions, setNrOptions] = useState(null);
	const [optionsArr, setOptionsArr] = useState([]);

	const navigateTo = useNavigate();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUserName(user.displayName);
			setUserId(user.uid);
		} else {
			//if there is no logged in user, redirect to home page
			navigateTo("/");
		}
	});

	const handleRenderOptions = (e) => {
		e.preventDefault();
		const pollOptions = [];
		for (let i = 0; i < nrOptions; i++) {
			pollOptions.push(i);
		}
		setOptionsArr(pollOptions);
		console.log(optionsArr);
	};

	return (
		<>
			<article>
				<h1>CREATOR POLL pentru {userName}</h1>
				<form>
					<p>Text Problemă în Discuție</p>
					<textarea rows="14" cols="60" maxLength={800}></textarea>
					<section>
						<p>Tip Poll</p>
						<label htmlFor="multiple">Alegere Multiplă</label>
						<input
							type="radio"
							name="typePoll"
							id="multiple"
							value={"multiple"}
							required={true}
						/>
						<label htmlFor="single">O Singură Variantă</label>
						<input
							type="radio"
							name="typePoll"
							id="single"
							value={"single"}
							required={true}
						/>
					</section>
					<section>
						<p>Tip Vot</p>
						<label htmlFor="private">Privat</label>
						<input
							type="radio"
							name="typeVote"
							id="private"
							value={"private"}
							required={true}
						/>
						<label htmlFor="public">Public</label>
						<input
							type="radio"
							name="typeVote"
							id="public"
							value={"public"}
							required={true}
						/>
					</section>
					<section>
						<p>Nr. Opțiuni</p>
						<input
							id="optionsNr"
							type="number"
							onChange={(e) => setNrOptions(e.target.value)}
						/>
						<br />
						<button onClick={handleRenderOptions}>Setează Numărul de Opțiuni</button>
					</section>
					<section>
						{optionsArr.map((option) => (
							<div>
								<label htmlFor={"option" + 1}>Opțiunea {option + 1}</label>
								<input
									type="text"
									key={option}
									id={"option" + 1}
									onChange={(e) => setOptionsText(e.target.value)}
								/>
								<button onClick={(e) => e.preventDefault()} key={"buttonOption" + 1}>
									Aplica Opțiunea
								</button>
							</div>
						))}
					</section>
				</form>
			</article>
		</>
	);
};

export default PollCreator;
