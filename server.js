// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let countdownEndTime = null;

app.post('/start', (req, res) => {
    const { seconds } = req.body;
    countdownEndTime = Date.now() + seconds * 1000;
    res.json({ message: 'Countdown started', endTime: countdownEndTime });
});

app.get('/status', (req, res) => {
    if (countdownEndTime) {
        const remainingTime = Math.floor((countdownEndTime - Date.now()) / 1000);
        if (remainingTime > 0) {
            res.json({ remainingTime });
        } else {
            countdownEndTime = null;
            res.json({ remainingTime: 0, message: 'Selesai' });
        }
    } else {
        res.json({ remainingTime: 0 });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
