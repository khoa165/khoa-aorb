import React, { useState } from 'react';
import {
	Button,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';

const Auth = ({ startNextAction, modal, toggle }) => {
	const [enteredPasscode, setEnteredPasscode] = useState('');
	const onChange = (e) => setEnteredPasscode(e.target.value);
	const verify = () => {
		if (enteredPasscode === 'abc') {
			startNextAction();
		} else {
			alert('Wrong passcode! Ask Khoa for it!');
		}
	};
	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>Enter passcode</ModalHeader>
			<ModalBody>
				<Input type='text' onChange={onChange} />
			</ModalBody>
			<ModalFooter>
				<Button color='primary' onClick={verify}>
					Let's play!
				</Button>{' '}
				<Button color='secondary' onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default Auth;
