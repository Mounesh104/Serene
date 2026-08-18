import React, { useState } from "react";
import axios from "axios";

function App() {
  const [journalText, setJournalText] = useState('');
  const [journalResult, setJournalResult] = useState({});
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [musicResult, setMusicResult] = useState('');
  const [relaxation, setRelaxation] = useState([]);

  const handleJournal = async () => {
    const { data } = await axios.post('http://localhost:4000/api/journal', { text: journalText });
    setJournalResult(data);
  };

  const handleChatbot = async () => {
    const { data } = await axios.post('http://localhost:4000/api/chatbot', { text: chatInput });
    setChatResponse(data.response);
  };

  const startQuiz = async () => {
    const { data } = await axios.post('http://localhost:4000/api/quiz');
    setQuizQuestions(data.questions);
  };

  const getMusic = async () => {
    const { data } = await axios.post('http://localhost:4000/api/music', { emotion: journalResult.emotion });
    setMusicResult(data.playlist);
  };

  const getRelaxation = async () => {
    const { data } = await axios.get('http://localhost:4000/api/relaxation');
    setRelaxation(data.exercises);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Serene – Your Path to Tranquility</h1>
      <h2>Journal & Emotion Detection</h2>
      <textarea rows={3} style={{ width: '70%' }} value={journalText} onChange={e => setJournalText(e.target.value)} placeholder="How do you feel?" />
      <button onClick={handleJournal}>Analyze</button>
      {journalResult.emotion && (
        <div>
          <p><b>Detected Emotion:</b> {journalResult.emotion}</p>
          <p><b>Quote:</b> {journalResult.quote}</p>
          <p><b>Music Playlist:</b> {journalResult.playlist}</p>
          <button onClick={getMusic}>Get More Music</button>
          {musicResult && <div><b>Recommended Playlist:</b> {musicResult}</div>}
        </div>
      )}

      <h2>Chatbot</h2>
      <input style={{ width: '70%' }} value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Say something..." />
      <button onClick={handleChatbot}>Send</button>
      {chatResponse && <div><b>Bot:</b> {chatResponse}</div>}

      <h2>Quiz</h2>
      <button onClick={startQuiz}>Start Quiz</button>
      {quizQuestions.length > 0 && (
        <ul>
          {quizQuestions.map((q, i) => <li key={i}>{q}</li>)}
        </ul>
      )}

      <h2>Relaxation Exercises</h2>
      <button onClick={getRelaxation}>Show Exercises</button>
      {relaxation.length > 0 && (
        <ul>
          {relaxation.map((ex, i) => <li key={i}>{ex}</li>)}
        </ul>
      )}
    </div>
  );
}

export default App;
