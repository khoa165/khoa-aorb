import React, { useState, useEffect } from 'react';
import Card from './Card';

const Game = ({ setGameData, questions }) => {
	const [q, setQuestion] = useState(0);
	const [answers, setAnswers] = useState([]);
	useEffect(() => {
		setQuestion(q + 1);
	}, []);

	useEffect(() => {
		if (q <= 20) {
			return;
		}
		setGameData({
			answers,
		});
	}, [q]);
	return (
		<div>
			{q <= 20 && (
				<Card
					currentQ={q}
					questions={questions}
					setQuestion={setQuestion}
					answers={answers}
					setAnswers={setAnswers}
				/>
			)}
		</div>
	);
};

export default Game;
