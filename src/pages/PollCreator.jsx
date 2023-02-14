import { auth } from "../firebase";

const PollCreator = () => {
	const user = auth.currentUser;

	return (
		<>
			<article>
				<h1>CREATOR POLL pentru {user.displayName}</h1>
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
					<input id="optionsNr" type="number" />
					<br />
					<button>Setează Numărul de Opțiuni</button>
				</section>
				<section></section>
			</article>
		</>
	);
};

export default PollCreator;
