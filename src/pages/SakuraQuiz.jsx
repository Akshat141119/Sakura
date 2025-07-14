import { useState } from "react";
import { getPoeticReflection } from "../components/getPoeticReflection";
import "../styles/SakuraQuiz.css";

export default function SakuraQuiz({ mood = "gentle" }) {
  const [question, setQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasQuestion, setHasQuestion] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);

  const fetchQuestion = async () => {
    setLoading(true);
    const response = await getPoeticReflection(
      "Create a thematic and poetic question that invites personal written response. Vary mood and style.",
      mood
    );
    setQuestion(response?.message?.content || "🍃 The spirit stirred, but silence lingered.");
    setResponseText("");
    setUserAnswer("");
    setHasQuestion(true);
    setHasAnswer(false);
    setLoading(false);
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setLoading(true);
    const reflection = await getPoeticReflection(
      `The user responded to the question: '${question}' with: '${userAnswer}'. Write a poetic reflection that feels emotionally resonant, expressive, and complete. Do not ask another question. Reflect like a quiet spirit listening to the wind. Mood: '${mood}'.`
      , mood
    );
    setResponseText(reflection?.message?.content || "🌸 The spirit whispered, but softly.");
    setHasAnswer(true);
    setLoading(false);
  };

  const handlePlayVoice = () => {
  if (!responseText) return;

  const prepareTextForSpeech = (text) => {
    return text
      .replace(/([.?!])\s*/g, "$1 ")
      .replace(/,/g, ", ")
      .replace(/\.{2,}/g, "...");
  };

  const finalText = prepareTextForSpeech(responseText);
  const utterance = new SpeechSynthesisUtterance(finalText);
// 🌈 Mood-based voice dynamics
    let voiceSettings = {
      rate: 1.0,
      pitch: 1.1,
      volume: 0.95
    };

    if (mood === "gentle") {
      voiceSettings.rate = 0.93;
      voiceSettings.pitch = 1.2;
    } else if (mood === "romantic") {
      voiceSettings.rate = 0.95;
      voiceSettings.pitch = 1.3;
    } else if (mood === "dramatic") {
      voiceSettings.rate = 0.85;
      voiceSettings.pitch = 0.9;
      voiceSettings.volume = 1.0;
    }

    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = voiceSettings.volume;
    utterance.lang = "en-US";

    const voices = speechSynthesis.getVoices();
    const softVoice = voices.find(v =>
      ["aria", "emma", "samantha", "google us"].some(hint =>
        v.name.toLowerCase().includes(hint)
      )
    );
    if (softVoice) utterance.voice = softVoice;

    setIsSpeaking(true);
    speechSynthesis.speak(utterance);
    utterance.onend = () => setIsSpeaking(false);
  };


  return (
    <div className="quiz-container">
      {!hasQuestion && (
        <button className="quiz-btn animate-petal" onClick={fetchQuestion}>
          🌸 Awaken the Spirit
        </button>
      )}

      {hasQuestion && (
        <>
          <h3 className="quiz-question">{question}</h3>

          <textarea
            className="quiz-textarea"
            placeholder="Whisper your answer into the wind…"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            rows={4}
            disabled={loading}
          />

          <button className="quiz-btn" onClick={handleSubmitAnswer} disabled={loading}>
            {loading ? "🌸 Reflecting..." : "🌬️ Send Your Answer"}
          </button>
        </>
      )}

      {hasQuestion && (
        <div className="quiz-result fade-in">
          <p>{responseText || "🌸 The spirit awaits your whisper..."}</p>

          {responseText && (
            <button className="quiz-btn" onClick={handlePlayVoice}>
              🔊 Let the Spirit Speak
            </button>
          )}

          <button className="quiz-btn animate-petal" onClick={fetchQuestion}>
            🌸 Ask Another Question
          </button>

          {isSpeaking && (
  <div className={`petal-overlay ${mood}`}>
    <div className="sakura-petal sakura1" />
    <div className="sakura-petal sakura2" />
    <div className="sakura-petal sakura3" />
    <div className="sound-wave" />
  </div>
)}
        </div>
      )}
    </div>
  );
}