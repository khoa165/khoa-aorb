const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS middleware setup
const corsOptions = {
    origin: '*' // Allows access from any origin
}
app.use(express.json());
app.use(cors(corsOptions));

const responseSchema = new mongoose.Schema({
    qid: Number,
    choice: String
});

const userSchema = new mongoose.Schema({
    name: String,
    passcode: String,
    role: {
        type: String,
        enum: ['mentor', 'participant']
    },
    responses: [responseSchema]
});


const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`App is Listening on PORT ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

// Root route
app.get("/", (req, res) => {
    res.status(201).json({ message: "Connected to Backend!" });
});

// Submit data route
app.post("/submit", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "Data saved successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function findBestMatchingMentor(participantResponses) {
    const mentors = await User.find({ role: 'mentor' });
    let bestMatch = { mentor: null, matchingResponses: 0 };

    for (const mentor of mentors) {
        let matchCount = 0;
        for (const response of participantResponses) {
            if (mentor.responses.some(r => r.qid === response.qid && r.choice === response.choice)) {
                matchCount++;
            }
        }

        if (matchCount > bestMatch.matchingResponses) {
            bestMatch = { mentor: mentor.name, matchingResponses: matchCount };
        }
    }

    return bestMatch;
}

app.post("/match", async (req, res) => {
    try {
        const { responses, role } = req.body;

        if (role !== 'participant') {
            return res.status(400).json({ message: "Only participants can find mentors." });
        }
        const bestMatch = await findBestMatchingMentor(responses);
        if (bestMatch.mentor) {
            res.status(200).json(bestMatch);
        } else {
            res.status(404).json({ message: "No matching mentor found." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
