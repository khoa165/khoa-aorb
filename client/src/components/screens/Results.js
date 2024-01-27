import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

const Results = ({ name, passcode, gameData }) => {
	const [match, setMatch] = useState(null);
	const [score, setScore] = useState(null);
	const [done, setDone] = useState(false);

	const submit = async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify({
			name,
			passcode,
			responses: gameData,
		});
		let res = null;
		const url =
			process.env.REACT_APP_BACKEND_URL ||
			'https://mentorship-game.onrender.com';
		try {
			res = await axios.post(url + '/submit', body, config);
			if (res.data.saved) {
				if (res.data.mentor) {
					alert('You are a mentor, no match for you!');
				} else {
					setMatch(res.data.match);
					setScore(res.data.count);
				}
			} else {
				alert('Something went wrong');
			}
		} catch (error) {
			console.log(error?.response?.data?.saved);
			if (
				error?.response?.data?.saved !== null &&
				error?.response?.data?.saved !== undefined
			) {
				alert(`Saved: ${error?.response?.data?.saved}`);
			}
		}
		setDone(true);
	};

	const getPercentScore = () => {
		return parseFloat((score / 13) * 100).toFixed(2);
	};

	return (
		<div id='results-screen'>
			{match === null && (
				<div>
					<h1 className='text-success'>Congrats on completing the quiz</h1>
					{!done && (
						<h5>
							<Button onClick={() => submit()}>FIND OUT</Button> your compatible
							match, shall we?
						</h5>
					)}
				</div>
			)}
			{match !== null && (
				<div className='results-wrapper'>
					<h4 className='text-success mb-5'>
						Your best mentor match is with {match} for a compatibility of{' '}
						{getPercentScore()}%
					</h4>
				</div>
			)}
		</div>
	);
};

export default Results;
