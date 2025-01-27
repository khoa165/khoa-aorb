import React, { useState, useEffect } from "react";
import Card from "./Card";

const Game = ({ setGameData, questions, isMentor }) => {
	const [q, setQuestion] = useState(0);
	const [answers, setAnswers] = useState([]);

	useEffect(() => {
		if (q < questions.length) {
			return;
		}
		setGameData(answers.filter((a) => a.qid != null));
	}, [q]);
	return (
		<div>
			{q < questions.length && (
				<Card
					currentQ={q}
					questions={questions}
					setQuestion={setQuestion}
					answers={answers}
					setAnswers={setAnswers}
					isMentor={isMentor}
				/>
			)}
		</div>
	);
};

export default Game;
