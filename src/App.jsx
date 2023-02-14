import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import PollCreator from "./pages/PollCreator";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/profile/:profileURL" element={<Profile />} />
					<Route path="/pollCreator/:profileURL" element={<PollCreator />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
