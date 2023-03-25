import React from 'react';

const Rule = () => {
	return (
		<div className='rule-wrapper'>
			<h1 className='text-success'>Instructions</h1>
			<div className='rule'>
				<p>
					There are 20 questions in total and you only have{' '}
					<span className='fw-bold fst-italic text-warning'>5 seconds</span> for
					each question
				</p>
				<p>Don't over think, just pick whatever is more associated with you</p>
				<p>
					Do not miss a question, always pick something before time runs out!
				</p>
				<p>Have fun!</p>
			</div>
		</div>
	);
};

export default Rule;
