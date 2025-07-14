import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { getPoeticReflection } from "../components/AIPoet";
import "./PetalLetters.css";
export default function PetalLetters() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [poetWhisper, setPoetWhisper] = useState("");

  // 🪷 Fetch messages on mount
useEffect(() => {
  fetchMessages();

  const subscription = supabase
    .channel("letters")
    .on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "letters",
    }, payload => {
      setMessages(prev => [payload.new, ...prev]);
    })
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
}, []);

  // 📬 Fetch messages from Supabase
  async function fetchMessages() {
    const { data, error } = await supabase
      .from("letters")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) {
      setMessages(data || []);
    } else {
      console.error("Fetch error:", error);
    }
  }

  // 📝 Submit a new message
  async function handleSubmit(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const mood = detectMood(newMessage); // simple mood detector
    const author_name = generatePoeticName();

    const { error } = await supabase.from("letters").insert([
      {
        message: newMessage,
        mood,
        author_name,
      },
    ]);

    if (!error) {
      setNewMessage("");
      fetchMessages();
      const whisper = await getPoeticReflection(newMessage);
      setPoetWhisper(whisper);
    } else {
      console.error("Submit error:", error);
    }
  }

  function detectMood(text) {
    const romanticWords = ["love", "hope", "bloom", "heart"];
    const thoughtfulWords = ["time", "memory", "quiet", "reflection"];
    const restlessWords = ["wind", "storm", "lost", "search"];

    const lcText = text.toLowerCase();
    if (romanticWords.some((w) => lcText.includes(w))) return "romantic";
    if (thoughtfulWords.some((w) => lcText.includes(w))) return "thoughtful";
    if (restlessWords.some((w) => lcText.includes(w))) return "restless";
    return "empathetic";
  }

  function generatePoeticName() {
    const names = [
      "Whispering Wind",
      "The Petal Keeper",
      "Bloomed Soul",
      "Spring Reader",
      "The Quiet Dream",
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  return (
    <div className="wall-container">
      {/* 🌸 Floating petals */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="floating-petal"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${4 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          🌸
        </div>
      ))}

      <h2 className="wall-prompt">Letters carried by the wind…</h2>

      {/* 📝 Form */}
      <form className="wall-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Whisper your memory into the petals..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send ✉️</button>
      </form>

      {/* 🧠 GPT Whisper */}
      {poetWhisper && (
        <div className="poet-whisper fade-in">
          <p>{poetWhisper}</p>
        </div>
      )}

      {/* 💬 Messages */}
      <div className="wall-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`wall-card ${msg.mood}`}>
            <p className="wall-message">{msg.message}</p>
            <p className="wall-meta">
              — {msg.author_name}, <span>{msg.mood}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}