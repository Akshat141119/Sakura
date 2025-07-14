import { useEffect, useState, useRef } from "react";
import { getPoeticReflection } from "../components/AIPoet";
import PetalLayer from "../components/PetalLayer";
import "../styles/Home.css";
import SakuraSpirit from "./SakuraSpirit"; // adjust path as needed

export default function Home() {
  const [quote, setQuote] = useState("Let the petals carry your thoughts…");
  const [mood, setMood] = useState("gentle");
  const [audioOn, setAudioOn] = useState(false); // Start muted
  const breezeAudio = useRef(null);

  const moodThemes = {
    joyful: {
      gradient: "linear-gradient(to bottom, #fffaf3, #ffe9ef)",
      prompt: "Give a joyful sakura-themed greeting."
    },
    nostalgic: {
      gradient: "linear-gradient(to bottom, #fef5ff, #ecd4e2)",
      prompt: "Give a nostalgic sakura memory."
    },
    quiet: {
      gradient: "linear-gradient(to bottom, #eaf1f4, #dfecec)",
      prompt: "Give a calming whisper from the sakura spirit."
    },
    gentle: {
      gradient: "linear-gradient(to bottom, #fffafc, #ffeef3)",
      prompt: "Greet a visitor with a sakura-themed poem."
    }
  };

  useEffect(() => {
    const fetchQuote = async () => {
      const prompt = moodThemes[mood]?.prompt;
      const poetic = await getPoeticReflection(prompt);
      if (typeof poetic === "string") setQuote(poetic);
    };
    fetchQuote();

    const interval = setInterval(fetchQuote, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, [mood]);

  useEffect(() => {
    breezeAudio.current = new Audio("/sakura_wind.mp3");
    breezeAudio.current.loop = true;
    breezeAudio.current.volume = 0.5;
    return () => {
      if (breezeAudio.current) breezeAudio.current.pause();
    };
  }, []);

  const toggleAudio = () => {
    if (!breezeAudio.current) return;
    if (audioOn) {
      breezeAudio.current.pause();
      setAudioOn(false);
    } else {
      breezeAudio.current.play().catch((err) =>
        console.warn("Audio playback blocked:", err)
      );
      setAudioOn(true);
    }
  };

  return (
    <div className="home-wrapper" style={{ background: moodThemes[mood].gradient }}>
      <PetalLayer />

      <header className="home-header fade-in">
        <h1 className="home-title">Sakura Friendship 🌸</h1>
        <p className="home-subtitle">Where petals remember you.</p>
      </header>

      <main className="home-main fade-in">
        <section className="quote-box">
          <h2 className="quote-heading">🌬️ Spirit's Whisper</h2>
          <p className="quote-text">{quote}</p>
            </section>

        <section className="mood-selector fade-in">
          <p>Choose your emotional breeze:</p>
          <div className="mood-buttons">
            <button className={mood === "joyful" ? "active" : ""} onClick={() => setMood("joyful")}>
              🌞 Joyful
            </button>
            <button className={mood === "nostalgic" ? "active" : ""} onClick={() => setMood("nostalgic")}>
              📜 Nostalgic
            </button>
            <button className={mood === "quiet" ? "active" : ""} onClick={() => setMood("quiet")}>
              🌙 Quiet
            </button>
            <button className={mood === "gentle" ? "active" : ""} onClick={() => setMood("gentle")}>
              🌸 Gentle
            </button>
          </div>
        </section>

        <section className="audio-toggle fade-in">
          <button onClick={toggleAudio}>
            {audioOn ? "🔈 Mute Breeze" : "🔇 Unmute Breeze"}
          </button>
        </section>

        <section className="explore-section fade-in">
          <a href="/spirit" className="start-button">🌸 Speak to the Spirit</a>
        </section>
      </main>

      <footer className="home-footer fade-in">
        <p>Crafted with petals and passion 💖</p>
      </footer>
    </div>
  );
}
