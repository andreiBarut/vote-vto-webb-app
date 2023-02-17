import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PollCreator from "./pages/PollCreator";
import Navbar from "./components/Navbar";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Navbar className="bg-slate-900" />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/pollCreator" element={<PollCreator />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
