import React, { useEffect, useRef } from "react";
import { Button, Col, Row } from "reactstrap";
import { toast } from "react-toastify";

const Card = ({
	currentQ,
	questions,
	setQuestion,
	answers,
	setAnswers,
	isMentor,
}) => {
	const toastId = useRef(null);
	const { qId, prompt, menteeOnly, timer, ...options } = questions[currentQ];

	useEffect(() => {
		if (menteeOnly && isMentor) {
			setQuestion(currentQ + 1);
			return;
		}
		if (currentQ >= 0 && currentQ < questions.length) {
			toastId.current = toast.error(
				`Time running for question ${currentQ}...`,
				{
					autoClose: timer ? timer * 1000 : 10000,
				}
			);
			const jsTimer = setTimeout(
				() => {
					updateAnswers("");
					goToNextQuestion();
				},
				timer ? timer * 1000 : 10000
			);
			return () => clearTimeout(jsTimer);
		}
	}, [currentQ, isMentor]);

	if (currentQ < 0) {
		return null;
	}

	const updateAnswers = (choice) => {
		setAnswers([
			...answers,
			{
				qid: qId,
				choice,
				menteeOnly,
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
			<h1 className='text-success mb-5'>{prompt}</h1>
			<Row className='g-4 options-row'>
				{["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"].map((c) => {
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
