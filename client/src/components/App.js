import React, { useState } from 'react';
import { Container } from 'reactstrap';
import Game from './game/Game';
import '../styles/App.scss';
import { questions } from '../constants/questions';
import Landing from './screens/Landing';
import Results from './screens/Results';
import Summary from './screens/Summary';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
	const [gameData, setGameData] = useState(null);
	const [gameStarted, setGameStarted] = useState(false);
	const [name, setName] = useState(false);
	const [passcode, setPasscode] = useState(false);
	const [isMentor, setIsMentor] = useState(false);
	const startNextAction = () => setGameStarted(true);

	if (gameData !== null) {
		return (
			<Results
				gameData={gameData}
				name={name}
				passcode={passcode}
				questions={questions}
			/>
		);
	}

	if (gameStarted) {
		return (
			<Game
				setGameData={setGameData}
				questions={questions}
				isMentor={isMentor}
			/>
		);
	}

	return (
		<Landing
			startNextAction={startNextAction}
			setName={setName}
			setPasscode={setPasscode}
			setIsMentor={setIsMentor}
		/>
	);
};

const AppWrapper = () => {
	return (
		<Container>
			<ToastContainer
				position='top-right'
				autoClose='19900'
				draggable={false}
				pauseOnHover={false}
				pauseOnFocusLoss={false}
				hideProgressBar={false}
				theme='dark'
			/>
			<Router>
				<Routes>
					<Route path='/' element={<App />} />
					<Route path='/summary' element={<Summary />} />
				</Routes>
			</Router>
		</Container>
	);
};

export default AppWrapper;
