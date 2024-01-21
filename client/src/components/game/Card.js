import React, { useEffect, useRef } from 'react';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';

const Card = ({ currentQ, questions, setQuestion, answers, setAnswers }) => {
	const toastId = useRef(null);

	useEffect(() => {
		if (currentQ >= 1 && currentQ <= 20) {
			toastId.current = toast.error(`Time running for question ${currentQ}...`);
			const timer = setTimeout(() => {
				updateAnswers('');
				goToNextQuestion();
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [currentQ]);

	if (currentQ < 1) {
		return null;
	}
	const { prompt, linear, menteeOnly, timer, options } =
		questions[currentQ - 1];

	const updateAnswers = (choice) => {
		setAnswers([...answers, choice]);
	};

	const goToNextQuestion = () => {
		toast.dismiss(toastId.current);
		setQuestion(q + 1);
	};

	return (
		<div className='game-card'>
			<h1 className='text-success'>{prompt}</h1>
			<div className='d-flex justify-content-evenly py-5'>
				<Button
					className='ab-button'
					color='success'
					outline
					onClick={() => {}}
				>
					{options.a}
				</Button>
				<Button
					className='ab-button'
					color='success'
					outline
					onClick={() => {}}
				>
					{options.b}
				</Button>
			</div>
		</div>
	);
};

export default Card;
