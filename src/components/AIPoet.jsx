import { useState } from "react";
import "./AIPoet.css";

// 🍃 GPT response extractor with robust fallback
export async function getPoeticReflection(prompt) {
  try {
    await new Promise((r) => setTimeout(r, 600));

    const result = await window.puter.ai.chat(prompt, {
      model: "gpt-4o"
    });

    console.log("GPT result:", result); // Debug log

    const replyText =
      typeof result === "string"
        ? result
        : result?.content ||
          result?.message ||
          result?.choices?.[0]?.message?.content ||
          result?.choices?.[0]?.content ||
          "🌸 The spirit is silent… no poetic message returned.";

    return replyText;
  } catch (error) {
    console.error("Spirit error:", error);
    return "🌸 The spirit is silent… something went wrong.";
  }
}

// 🌸 Sakura Whisper Component
export default function AIPoetWhisper() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleWhisper() {
    if (!userInput.trim()) return;
    setLoading(true);

    try {
      const poeticReply = await getPoeticReflection(userInput);
      console.log("Reply type:", typeof poeticReply, poeticReply); // Debug log

      // ✅ Force into safe string before rendering
      setResponse(
        typeof poeticReply === "string"
          ? poeticReply
          : typeof poeticReply === "object"
          ? poeticReply.content || JSON.stringify(poeticReply)
          : "🌸 The spirit is silent… invalid format."
      );
    } catch (error) {
      console.error("Whisper error:", error);
      setResponse("🌸 The spirit is silent… something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="sakura-whisper">
      <textarea
        className="whisper-input"
        placeholder="🌸 Whisper your message to the spirit..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        rows={4}
      />
      <button className="whisper-button" onClick={handleWhisper}>
        🍃 Ask the Spirit
      </button>

      {loading && (
        <p className="whisper-response loading">Listening to the wind...</p>
      )}
      {!loading && response && (
        <p className="whisper-response">{response}</p>
      )}
    </div>
  );
}