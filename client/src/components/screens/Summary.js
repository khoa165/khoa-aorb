import React, { useState } from "react";
import {
	Button,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Row,
	Col,
} from "reactstrap";
import axios from "axios";

const Summary = () => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	const [summaryPassword, setSummaryPassword] = useState("");
	const onChangeSummaryPassword = (e) => setSummaryPassword(e.target.value);
	const [matches, setMatches] = useState(null);

	const verify = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const body = JSON.stringify({
			passcode: summaryPassword,
		});
		let res = null;
		const url =
			process.env.REACT_APP_BACKEND_URL ||
			"https://mentorship-game.onrender.com";
		try {
			res = await axios.post(url + "/summary", body, config);
			if (res.data.verified) {
				setMatches(res.data.matches);
				setModal(false);
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
		<>
			{matches === null && (
				<div id='landing-screen'>
					<Button color='danger' onClick={toggle}>
						View summary
					</Button>
				</div>
			)}
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>
					Enter summary password (obtain from Khoa)
				</ModalHeader>
				<ModalBody>
					<Input
						type='text'
						onChange={onChangeSummaryPassword}
						placeholder='Summary password'
					/>
				</ModalBody>
				<ModalFooter>
					<Button color='primary' onClick={verify}>
						View summary
					</Button>{" "}
					<Button color='secondary' onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			{matches !== null && (
				<Row className='mt-5'>
					{matches.map((friendMatch) => (
						<Col lg='4'>
							<h3>{friendMatch.name}</h3>
							<p>
								Most compatible with {friendMatch.matches.join(", ")} with a
								score of {parseFloat((friendMatch.count / 16) * 100).toFixed(2)}
								%
							</p>
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default Summary;
