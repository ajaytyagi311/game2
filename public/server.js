const express = require('express');
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;

const cors = require('cors');
app.use(cors());

app.use(express.json());

const PORT = 8080;

const leaderboardSchema = new Schema({
    name: String,
    score: Number,
});

mongoose.connect('mongodb+srv://ajay:ajay@cluster0.avzoltl.mongodb.net/TEST_DB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
const Leaderboard = mongoose.model('leader_board', leaderboardSchema);

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});

// create a route for the app
app.get('/', (req, res) => {
    res.send('Hello World');
});
  
app.get('/leader-board', (req, res) => {
    console.info(req);
    res.send('post request');
});
  
app.post('/leader-board', (req, res) => {
    console.log(req.body)
    const newScore = new Leaderboard({
        name: req.body.name,
        score: req.body.score,
    });
    newScore.save();
    return res.send("{success}");
});

