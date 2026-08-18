const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

// Motivational quotes and music based on emotion
const MOTIVATIONAL_QUOTES = {
  happy: ["Keep smiling!", "Embrace your joy!"],
  sad: ["Tomorrow is another day.", "Everything will be OK."],
  anxious: ["Breathe deeply, you are safe.", "This moment will pass."],
  default: ["Stay strong. Keep going."]
};
const MOOD_PLAYLISTS = {
  happy: "Happy Hits Playlist",
  sad: "Chill Vibes",
  anxious: "Calm Piano",
  angry: "Peaceful Meditation",
  default: "Mood Booster"
};

app.post('/api/journal', async (req, res) => {
  const { text } = req.body;
  const nlpRes = await axios.post('http://localhost:5000/analyze', { text });
  const emotion = nlpRes.data.emotion || 'default';
  const quote = (MOTIVATIONAL_QUOTES[emotion] || MOTIVATIONAL_QUOTES.default)[0];
  const playlist = MOOD_PLAYLISTS[emotion] || MOOD_PLAYLISTS.default;
  res.json({ emotion, quote, playlist });
});

app.post('/api/chatbot', async (req, res) => {
  const { text } = req.body;
  res.json({ response: `I hear you: ${text}` });
});

app.post('/api/quiz', (req, res) => {
  const questions = [
    "How are you feeling today?",
    "Did you sleep well?",
    "Is something bothering you?"
  ];
  res.json({ questions });
});

app.post('/api/music', (req, res) => {
  const { emotion } = req.body;
  res.json({ playlist: MOOD_PLAYLISTS[emotion] || MOOD_PLAYLISTS.default });
});

app.get('/api/relaxation', (req, res) => {
  const exercises = [
    "4-7-8 Breathing: inhale 4s, hold 7s, exhale 8s.",
    "Progressive muscle relaxation: tense, then release each muscle group."
  ];
  res.json({ exercises });
});

app.listen(4000, () => {
  console.log('Backend running at http://localhost:4000');
});
