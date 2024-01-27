import React, { useEffect, useRef } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';

const Card = ({ currentQ, questions, setQuestion, answers, setAnswers }) => {
	const toastId = useRef(null);
	const { qId, prompt, linear, menteeOnly, timer, ...options } =
		questions[currentQ];

	useEffect(() => {
		if (currentQ >= 0 && currentQ <= 14) {
			toastId.current = toast.error(`Time running for question ${currentQ}...`);
			const jsTimer = setTimeout(() => {
				updateAnswers('');
				goToNextQuestion();
			}, 10000);
			return () => clearTimeout(jsTimer);
		}
	}, [currentQ]);

	if (currentQ < 0) {
		return null;
	}

	const updateAnswers = (choice) => {
		setAnswers([
			...answers,
			{
				qid: qId,
				choice,
			},
		]);
	};

	const goToNextQuestion = () => {
		toast.dismiss(toastId.current);
		setQuestion(currentQ + 1);
	};

	const pickChoice = (choice) => {
		updateAnswers(choice);
		goToNextQuestion();
	};

	return (
		<div className='game-card'>
			<h1 className='text-success'>{prompt}</h1>
			<Row>
				{['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].map((c) => {
					if (options[c] !== undefined) {
						return (
							<Col lg='4'>
								<Button
									className='ab-button'
									color='success'
									outline
									onClick={() => pickChoice(c)}
								>
									{options[c]}
								</Button>
							</Col>
						);
					}
				})}
			</Row>
		</div>
	);
};

export default Card;
