import React, { useState } from "react";
import axios from "axios";
import {
	Button,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";

const Auth = ({
	startNextAction,
	modal,
	toggle,
	setName,
	setMenteeId,
	setPasscode,
	setIsMentor,
}) => {
	const [enteredPasscode, setEnteredPasscode] = useState("");
	const [enteredName, setEnteredName] = useState("");
	const [enteredId, setEnteredId] = useState("");
	const onChangeName = (e) => setEnteredName(e.target.value);
	const onChangeMenteeId = (e) => setEnteredId(e.target.value);
	const onChangePasscode = (e) => setEnteredPasscode(e.target.value);
	const verify = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify({
			name: enteredName,
			passcode: enteredPasscode,
		});
		let res = null;
		const url =
			process.env.REACT_APP_BACKEND_URL ||
			"https://mentorship-game.onrender.com";
		try {
			res = await axios.post(url + "/verify", body, config);
			if (res.data.verified) {
				setName(enteredName);
				setMenteeId(enteredId);
				setPasscode(enteredPasscode);
				setIsMentor(res.data.mentor);
				startNextAction();
			} else {
				alert("Can't verify you");
			}
		} catch (error) {
			console.log(error?.response?.data?.verified);
			if (
				error?.response?.data?.verified !== null &&
				error?.response?.data?.verified !== undefined
			) {
				alert(`Verified: ${error?.response?.data?.verified}`);
			}
		}
	};
	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>
				Enter name & passcode (obtain this info from interviewers)
			</ModalHeader>
			<ModalBody>
				<Input type='text' onChange={onChangeName} placeholder='First Last' />
				<Input
					type='text'
					onChange={onChangeMenteeId}
					placeholder='ID (mentee only)'
				/>
				<Input type='text' onChange={onChangePasscode} placeholder='Passcode' />
			</ModalBody>
			<ModalFooter>
				<Button color='primary' onClick={verify}>
					Let's play!
				</Button>{" "}
				<Button color='secondary' onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default Auth;
