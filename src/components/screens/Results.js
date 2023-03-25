import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

const Results = ({ gameData: { score, answers }, questions }) => {
	const [showResult, setShowResult] = useState(false);
	const [match, setMatch] = useState(null);

	useEffect(() => {
		if (score.skhoa >= Math.max(score.snguyen, score.sha, score.sta)) {
			setMatch('khoa');
		} else if (score.snguyen >= Math.max(score.skhoa, score.sha, score.sta)) {
			setMatch('nguyen');
		} else if (score.sha >= Math.max(score.snguyen, score.skhoa, score.sta)) {
			setMatch('ha');
		} else if (score.sta >= Math.max(score.snguyen, score.sha, score.skhoa)) {
			setMatch('ta');
		}
	}, []);

	const getMatch = () => {
		if (match === null) {
			return '';
		}
		if (match === 'khoa') {
			return 'Khoa Le';
		}
		if (match === 'nguyen') {
			return 'Nguyen Vu';
		}
		if (match === 'ha') {
			return 'Huy Anh';
		}
		if (match === 'ta') {
			return 'Thu Anh';
		}
	};

	const getPercentScore = () => {
		return parseFloat((score['s' + match] / 20) * 100).toFixed(2);
	};

	return (
		match !== null && (
			<div id='results-screen'>
				{!showResult && (
					<div>
						<h1 className='text-success'>Congrats on completing the quiz</h1>
						<h5>
							<Button onClick={() => setShowResult(true)}>FIND OUT</Button> your
							compatible match, shall we?
						</h5>
					</div>
				)}
				{showResult && (
					<div className='results-wrapper px-3'>
						<h4 className='text-success mb-5'>
							Your best mentor match is with {getMatch()} for a score of{' '}
							{getPercentScore()}%
						</h4>
						<div className='results'>
							<div className='result-box'>
								{answers.map((answer, index) => {
									const question = questions[index];
									return (
										<p key={index}>
											{index + 1}. {answer !== '' && questions[index][answer]}
											{answer === question[match] && <span> &#9989;</span>}
										</p>
									);
								})}
							</div>
							<div className='result-box'>
								{questions.map((question) => (
									<p key={question.q}>
										{question.q}. {question[question[match]]}
									</p>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		)
	);
};

export default Results;
