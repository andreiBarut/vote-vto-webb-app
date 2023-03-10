import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PollCreator from "./pages/PollCreator";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Vote from "./pages/Vote";
import MyPolls from "./pages/MyPolls";
import Results from "./pages/Results";
import ChangePass from "./pages/ChangePass";

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Navbar />
				<div className="app-content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/pollCreator" element={<PollCreator />} />
						<Route path="/pollCreator/vote/:pollId" element={<Vote />} />
						<Route path="/myPolls" element={<MyPolls />} />
						<Route path="/results/:pollId" element={<Results />} />
						<Route path="/profile/changePassword" element={<ChangePass />} />
					</Routes>
				</div>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
