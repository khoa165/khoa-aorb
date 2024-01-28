const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const mapping = {
	125: 'Anh Tran',
	208: 'Thao Duong',
	82: 'Thieu Nguyen',
	83: 'Thien Nguyen',
	168: 'Quy Nguyen',
	194: 'An Ngo',
	206: 'Tri Hoang',
	30: 'Khang Nguyen',
	49: 'Thinh Tran',
	54: 'Minh Dinh',
	62: 'Long Do',
	69: 'Nguyen Tran',
	70: 'Quan Phan',
	74: 'Quan Nguyen',
	76: 'Ha Nguyen',
	80: 'Chau Ta',
	81: 'Bach Nguyen',
	85: 'Hoang Tran',
	88: 'Anh Hoang',
	100: 'Linh Hoang',
	102: 'Linh Nguyen',
	112: 'Tu Pham',
	114: 'Anh Nguyen',
	121: 'Linh Tran',
	129: 'Ha Nguyen',
	137: 'Nhat Nguyen',
	138: 'Duy Tran',
	142: 'Ha Nguyen',
	149: 'Trinh Nguyen',
	154: 'Hung Ngo',
	155: 'Van Nguyen',
	169: 'Khang Nguyen',
	183: 'Chi',
	186: 'Ngoc Nguyen',
	190: 'Vy Tran',
	196: 'Rachel Tran',
};

const app = express();

// CORS middleware setup
const corsOptions = {
	origin: '*', // Allows access from any origin
};
app.use(express.json());
app.use(cors(corsOptions));

const responseSchema = new mongoose.Schema({
	qid: Number,
	choice: String,
});

const userSchema = new mongoose.Schema({
	name: String,
	role: {
		type: String,
		enum: ['mentor', 'applicant'],
	},
	responses: [responseSchema],
});
userSchema.set('timestamps', true);
const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		const PORT = process.env.PORT || 8000;
		app.listen(PORT, () => {
			console.log(`App is Listening on PORT ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});

// Root route
app.get('/', (req, res) => {
	res.status(200).json({ message: 'Connected to Backend!' });
});

const isMentor = (passcode) => {
	const parts = passcode.split('-');
	if (parts.length !== 2) {
		return false;
	}
	return parts[0] === 'season2mentors';
};

const verifyAccess = (name, passcode) => {
	const parts = passcode.split('-');
	if (parts.length !== 2) {
		return false;
	}
	const eligible =
		parts[0] === 'vtmp2024applicant' || parts[0] === 'season2mentors';
	if (!eligible) {
		return false;
	}
	if (parts[0] === 'season2mentors') {
		return true;
	}
	try {
		const aid = parseInt(parts[1], 10);
		return mapping[aid] === name;
	} catch (error) {
		return false;
	}
};

// Verify access
app.post('/verify', async (req, res) => {
	console.log(req.body);
	const name = req.body.name;
	const passcode = req.body.passcode;
	if (verifyAccess(name, passcode)) {
		return res.status(200).json({ verified: true, mentor: isMentor(passcode) });
	}
	return res.status(400).json({ verified: false });
});

// Submit data route
app.post('/submit', async (req, res) => {
	const { name, passcode, responses } = req.body;
	if (!verifyAccess(name, passcode)) {
		return res.status(400).json({ saved: false });
	}

	try {
		const newUser = new User({
			name,
			role: isMentor(passcode) ? 'mentor' : 'applicant',
			responses,
		});
		await newUser.save();
		if (!isMentor(passcode)) {
			const { mentor, matchingResponses } = await findBestMatchingMentor(
				responses,
				null
			);
			return res.status(200).json({
				saved: true,
				mentor: false,
				match: mentor,
				count: matchingResponses,
			});
		} else {
			return res.status(200).json({ saved: true, mentor: true });
		}
	} catch (err) {
		res.status(500).json({ saved: false });
	}
});

async function findBestMatchingMentor(participantResponses, exclude) {
	const mentors = await User.find({ role: 'mentor' });
	let bestMatch = { mentor: null, matchingResponses: 0, mentors: [] };

	for (const mentor of mentors) {
		if (exclude === mentor.name) {
			continue;
		}
		let matchCount = 0;
		for (const response of participantResponses) {
			if (
				mentor.responses.some(
					(r) => r.qid === response.qid && r.choice === response.choice
				)
			) {
				matchCount++;
			}
		}

		if (matchCount > bestMatch.matchingResponses) {
			bestMatch = {
				mentor: mentor.name,
				matchingResponses: matchCount,
				mentors: [mentor.name],
			};
		} else if (matchCount === bestMatch.matchingResponses) {
			bestMatch = {
				...bestMatch,
				mentors: [...bestMatch.mentors, mentor.name],
			};
		}
	}

	return bestMatch;
}

app.post('/summary', async (req, res) => {
	try {
		if (req.body.passcode !== 'secret matching') {
			return res.status(400).json({ verified: false });
		}
		const mentors = await User.find({ role: 'mentor' });
		const matches = [];

		for (const currentMentor of mentors) {
			const { mentor, matchingResponses, mentors } =
				await findBestMatchingMentor(
					currentMentor.responses,
					currentMentor.name
				);
			matches.push({
				name: currentMentor.name,
				match: mentor,
				count: matchingResponses,
				matches: mentors,
			});
		}
		return res.status(200).json({ verified: true, matches });
	} catch (err) {
		return res.status(500).json({ verified: false });
	}
});
