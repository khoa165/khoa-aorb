import React, { useEffect, useRef } from 'react';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';

const Card = ({
	currentQ,
	questions,
	setQuestion,
	score: { skhoa, snguyen, sha },
	setScore,
	answers,
	setAnswers,
}) => {
	const toastId = useRef(null);

	useEffect(() => {
		if (currentQ >= 1 && currentQ <= 12) {
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
	const { q, a, b, khoa, nguyen, ha } = questions[currentQ - 1];

	const calculateScore = (choice) =>
		setScore({
			skhoa: khoa === choice ? skhoa + 1 : skhoa,
			snguyen: nguyen === choice ? snguyen + 1 : snguyen,
			sha: ha === choice ? sha + 1 : sha,
		});

	const updateAnswers = (choice) => {
		setAnswers([...answers, choice]);
	};

	const pickA = () => {
		calculateScore('a');
		updateAnswers('a');
		goToNextQuestion();
	};

	const pickB = () => {
		calculateScore('b');
		updateAnswers('b');
		goToNextQuestion();
	};

	const goToNextQuestion = () => {
		toast.dismiss(toastId.current);
		setQuestion(q + 1);
	};

	return (
		<div className='game-card'>
			<h1 className='text-success'>
				{q}. {a} hay {b}?
			</h1>
			<div className='d-flex justify-content-evenly py-5'>
				<Button className='ab-button' color='success' outline onClick={pickA}>
					{a}
				</Button>
				<Button className='ab-button' color='success' outline onClick={pickB}>
					{b}
				</Button>
			</div>
		</div>
	);
};

export default Card;
