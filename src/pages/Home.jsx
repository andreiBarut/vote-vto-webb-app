import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<article>
				<h1>ACASĂ</h1>
				<section>
					<Link to="login">*(work in progress) logare</Link>
				</section>
				<section>
					<Link to="signup" disabled>
						înregistrare
					</Link>
				</section>
				{/* <section>
					<a href="#">urmărește tutorialul în limba română</a>
				</section> */}
			</article>
		</>
	);
};

export default Home;
