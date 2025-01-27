import React, { useState } from "react";
import Auth from "../auth/Auth";
import Rule from "../game/Rule";
import { Button } from "reactstrap";

const Landing = ({
	startNextAction,
	setName,
	setMenteeId,
	setPasscode,
	setIsMentor,
}) => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	return (
		<div id='landing-screen'>
			<Rule />
			<Button color='danger' onClick={toggle}>
				Enter now
			</Button>
			<Auth
				modal={modal}
				toggle={toggle}
				startNextAction={startNextAction}
				setName={setName}
				setMenteeId={setMenteeId}
				setPasscode={setPasscode}
				setIsMentor={setIsMentor}
			/>
		</div>
	);
};

export default Landing;
