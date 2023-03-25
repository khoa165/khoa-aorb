import React, { useState, useEffect } from 'react';
import Card from './Card';

const Game = ({ setGameData, questions }) => {
	const [q, setQuestion] = useState(0);
	const [score, setScore] = useState({
		skhoa: 0,
		snguyen: 0,
		sha: 0,
	});
	const [answers, setAnswers] = useState([]);
	useEffect(() => {
		setQuestion(q + 1);
	}, []);

	useEffect(() => {
		if (q <= 12) {
			return;
		}
		setGameData({
			score,
			answers,
		});
	}, [q]);
	return (
		<div>
			{q <= 12 && (
				<Card
					currentQ={q}
					questions={questions}
					setQuestion={setQuestion}
					score={score}
					setScore={setScore}
					answers={answers}
					setAnswers={setAnswers}
				/>
			)}
		</div>
	);
};

export default Game;
