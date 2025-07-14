import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"; // Make sure this file is set up
import "../styles/LetterWall.css";

export default function LetterWall() {
  const [letters, setLetters] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("gentle");

  // 🧠 Fetch letters on load
  useEffect(() => {
    fetchLetters();
  }, []);

  async function fetchLetters() {
    const { data, error } = await supabase
      .from("letters")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setLetters(data);
  }

  // 📮 Submit new poetic letter
  async function handleSubmit() {
  console.log("Clicked Send:", { author, content, emotion }); // ✅ Debug

    const { error } = await supabase.from("letters").insert([
      { author_name: author, message: content, mood: emotion }
    ]);

    if (!error) {
      setAuthor("");
      setContent("");
      setEmotion("gentle");
      fetchLetters();
    }
  }

  return (
    <div className="letter-wall">
      <h2 className="wall-title">🌸 Letter Wall</h2>

      <div className="letter-form">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your poetic message..."
          rows={4}
        />
        <select value={emotion} onChange={(e) => setEmotion(e.target.value)}>
          <option value="gentle">🌸 Gentle</option>
          <option value="joyful">🌞 Joyful</option>
          <option value="nostalgic">📜 Nostalgic</option>
          <option value="quiet">🌙 Quiet</option>
        </select>
        <button onClick={handleSubmit}>Send Letter</button>
      </div>

      <ul className="letter-list">
        {letters.map((letter) => (
          <li key={letter.id} className={`letter-item ${letter.mood}`}>
            <p className="letter-content">{letter.message}</p>
            <div className="letter-meta">
              <span>— {letter.author_name}</span>
              <span className="emotion-tag">[{letter.mood}]</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}