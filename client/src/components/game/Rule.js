import React from 'react';

const Rule = () => {
	return (
		<div className='rule-wrapper'>
			<h1 className='text-success'>Instructions</h1>
			<div className='rule'>
				<p>
					There are 15 questions in total and you have{' '}
					<span className='fw-bold fst-italic text-warning'>20 seconds</span>{' '}
					for each question (pay attention to the timer, don't let it run out)
				</p>
				<p>Don't over think, just pick what you feel the most</p>
				<p>
					Do not miss a question, always pick something before time runs out!
				</p>
				<p>Have fun!</p>
			</div>
		</div>
	);
};

export default Rule;
