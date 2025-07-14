import { useState, useEffect, useRef } from "react";
import { getPoeticReflection } from "../components/getPoeticReflection";
import "../styles/SakuraSpirit.css";

export default function SakuraSpirit() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("The spirit awaits your voice...");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [pinned, setPinned] = useState(null);
  const [mood, setMood] = useState("gentle");

  const historyRef = useRef(null);

  const moodStyles = {
    romantic: "#ffe1e9",
    nostalgic: "#fef6da",
    gentle: "#eaf7ff",
  };

  const moodPlaceholders = {
    romantic: "Whisper your longing…",
    nostalgic: "Send your memory drifting…",
    gentle: "Ask gently… the petals may answer",
  };

  const handleAskSpirit = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setReply("🌬️ The Sakura Spirit is listening...");

    try {
      const response = await getPoeticReflection(prompt, mood);
      const poeticReply =
        response?.message?.content ||
        "🍃 The spirit whispered… but the wind scattered the words.";

      setReply(poeticReply);
      setHistory((prev) => [
        ...prev,
        {
          prompt,
          reply: poeticReply,
          mood,
          timestamp: new Date().toLocaleString(),
        },
      ]);
      setPrompt("");
    } catch (err) {
      console.error("🌫️ Spirit fetch error:", err);
      setReply("🌫️ The spirit is silent. A veil cloaks the wind.");
    } finally {
      setLoading(false);
    }
  };

  const handlePin = (index) => setPinned(history[index]);
  const handleUnpin = () => setPinned(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="sakura-spirit">
      <h2 className="spirit-title">🌸 Speak to the Sakura Spirit</h2>

      <div className="mood-picker">
        <label>Select Mood:</label>
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="gentle">Gentle</option>
          <option value="romantic">Romantic</option>
          <option value="nostalgic">Nostalgic</option>
        </select>
      </div>

      <textarea
        className="spirit-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={moodPlaceholders[mood]}
        rows={3}
        disabled={loading}
      />

      <button className="spirit-button" onClick={handleAskSpirit} disabled={loading}>
        {loading ? "Listening..." : "Whisper to the Spirit"}
      </button>

      {loading && (
        <div className="spirit-spinner">
          <div className="spinner-petal" />
          <span>🌬️ Listening for the breeze...</span>
        </div>
      )}

      <div
        className={`spirit-response ${!loading ? "animate-ink" : ""}`}
        style={{ background: moodStyles[mood] }}
      >
        {reply}
      </div>

      {pinned && (
        <div className="spirit-pinned">
          <h3>📌 Pinned Whisper</h3>
          <p><strong>You:</strong> {pinned.prompt}</p>
          <p><strong>Spirit:</strong> {pinned.reply}</p>
          <button onClick={handleUnpin}>❌ Unpin</button>
        </div>
      )}

      {history.length > 0 && (
        <div className="spirit-history" ref={historyRef}>
          <h3>📝 Archive of Whispers</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index} className="spirit-history-item">
                <p><strong>You:</strong> {item.prompt}</p>
                <p><strong>Spirit:</strong> {item.reply}</p>
                <small>{item.timestamp}</small>
                <button onClick={() => handlePin(index)}>📌 Pin</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}